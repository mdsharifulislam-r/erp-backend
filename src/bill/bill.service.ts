import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ActivityService } from 'src/activity/activity.service';
import { AccountDto } from 'src/DTO/add.account.dto';
import { BillDto } from 'src/DTO/bill.dto';
import { Bill } from 'src/entity/bill.entity';
import { StatementService } from 'src/statement/statement.service';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
    constructor(@InjectRepository(Bill) private billRepo:Repository<Bill>,private statementService:StatementService){}

    async paybill(data:BillDto,req:Request){
        try {
            const [account]:[AccountDto]= await this.billRepo.query('SELECT * FROM account WHERE account_type=?',[data.method])
            if(account.balance<data.amount){
                return {
                    status:false,
                    message:"Insuffient Fund"
                }
            }
            const balance = account.balance-data.amount
          
            await this.billRepo.query('UPDATE account SET balance=? WHERE account_id=?',[balance,account.account_id])
            await this.billRepo.insert(data)

            await this.statementService.sendStatement({balance:data.amount,credit:data.amount,payment_type:data.method,transaction_type:"bill"},req,`Pay bill of ${data.name}`)
            return {
                status:true,
                message:"Payment Successfull"
            }
        } catch (error) {
            return {
                status:false,
                message:"Something went wrong"
            }
        }
    }

    async getBillReport(search?:string,date?:string){
        try {
            const rows = await this.billRepo.find()
            let temp = rows
            if(search){
                temp=temp.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
            }
            if(date){
                temp = temp.filter(item=>item.date==date)
            }
            return temp.reverse()
        } catch (error) {
            return {
                status:false,
                message:'Something went wrong'
            }
        }
    }
}
