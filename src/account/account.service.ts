import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ActivityService } from 'src/activity/activity.service';
import { AccountDto, AddBalanceDto } from 'src/DTO/add.account.dto';
import { Account } from 'src/entity/account.entity';
import { StatementService } from 'src/statement/statement.service';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
    constructor(@InjectRepository(Account) private accountRepo:Repository<Account>,private activityService:ActivityService,private statementService:StatementService){}

    async addPaymentMethod(data:AccountDto,req:Request){
        try {
            const date = new Date().toDateString()
            const obj = {account_type:data.account_type.toLowerCase().split(" ").join("-"),...data,creation_date:date}
            await this.accountRepo.insert(obj)
            await this.activityService.addActivity(req,`Add Payment Method ${data.account_type}`)
            return {
                status:true,
                message:"Payment Method Added Successfully"
            }
            
        } catch (error) {
            return{
                status:false,
                message:"Something Went Wrong"
            }
        }
    }

    async getPaymentsMethodData(method?:string,search?:string){
        try {
            if(method){
                const rows = await this.accountRepo.find()
                const data= rows.map(item=>item.account_type)
                let temp= data
                if(search){
                temp=temp.filter(item=>item.toLowerCase().includes(search.toLowerCase()))
                }
                return temp
            }
            const rows = await this.accountRepo.find()
            return rows
        } catch (error) {
            return{
                status:false,
                message:"Something Went Wrong"
            }
        }
    }

    async diposit(data:AddBalanceDto,req:Request){
        return this.statementService.depositmoney(data,req)
    }
}
