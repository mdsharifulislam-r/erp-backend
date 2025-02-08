import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleDto } from 'src/DTO/sale.dto';
import { Account } from 'src/entity/account.entity';
import { generateDate } from 'src/lib/helpers/generateDate';
import { Repository } from 'typeorm';

@Injectable()
export class DetailsService {
    constructor(
    
        @InjectRepository(Account) private accountRepo: Repository<Account>,

    ) {}

    async getDetails(name:string) {
        try {
            
            if(name === 'sale'){
                const rows = await this.accountRepo.query('SELECT SUM(paid) AS total_sum FROM sale')
                return rows[0];
            }
            if(name === 'purchase'){
                const rows1 = await this.accountRepo.query('SELECT SUM(paid) AS total_sum FROM purchase')
                return rows1[0];
            }
            if(name === 'balance'){
                const rows2 = await this.accountRepo.query('SELECT SUM(balance) AS total_sum FROM account')
                return rows2[0];
            }
            if(name === 'bill'){
                const biillRow = await this.accountRepo.query('SELECT SUM(amount) AS total_sum FROM bill')
                return biillRow[0];
            }

            return {

                status: false,
                message: 'Something went wrong',
            }
            
        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Something went wrong',
            };
        }
    }

    async getRavinue() {
        try {
            const rows:SaleDto[] = await this.accountRepo.query('SELECT * FROM sale');
            const ravinue = {}
            rows.forEach((row: SaleDto) => {
                const date = generateDate()
               const month = parseInt(row.date.split('/')[0])

               if(date.includes(month)){
                   if(ravinue[month]){
                       ravinue[month] += row.paid
                   }else{
                       ravinue[month] = row.paid
                   }
               }


            });
            const months = {
                1:'January',
                2:'February',
                3:'March',
                4:'April',
                5:'May',
                6:'June',
                7:'July',
                8:'August',
                9:'September',
                10:'October',
                11:'November',
                12:'December',
            }
       
            let arr = generateDate()
            let ravinueArr = []
            arr.forEach((item)=>{
                if(ravinue[item]){
                    ravinueArr.push({
                        name:months[item],
                        ravinue:ravinue[item]
                    })
                }else{
                    ravinueArr.push({
                        name:months[item],
                        ravinue:0
                    })
                }
            })

            return ravinueArr;


        } catch (error) {
            console.log(error);

            return {
                status: false,
                message: 'Something went wrong',
            };
        }
    }
}
