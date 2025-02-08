import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ActivityService } from 'src/activity/activity.service';
import { AddBalanceDto } from 'src/DTO/add.account.dto';
import { PurchaseDto } from 'src/DTO/purchase.dto';
import { StatementDto } from 'src/DTO/statement.dto';
import { Account } from 'src/entity/account.entity';
import { Statement } from 'src/entity/statement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatementService {
  constructor(
    @InjectRepository(Statement) private statementRepo: Repository<Statement>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
    private activityService: ActivityService,
  ) {}

  async depositmoney(data: AddBalanceDto, req: Request) {
    try {
      const resorce: StatementDto = {
        balance: data.balance,
        credit: 0,
        debit: data.balance,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        payment_type: data.payment_type,
        transaction_id: data.transection_id,
        transaction_type: 'diposit',
        note: data.note,
      };

      const rows = await this.accountRepo.find({
        where: { account_type: data.payment_type },
      });
      const balance = rows[0]?.balance + data.balance;
      await this.activityService.addActivity(
        req,
        `Deposited ${data.balance} into ${rows[0]?.account_type}`,
      );
      this.accountRepo.query(
        'UPDATE account set balance=? WHERE account_type=?',
        [balance, data.payment_type],
      );
      await this.statementRepo.insert(resorce);

      return {
        status: true,
        message: 'Diposit Successfull',
      };
    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  }

  async getStateMents(account_type?:string,transiction_type?:string,limit?:string){
    try {
        const rows = await this.statementRepo.find()
        let temp = rows
        
        
        if(account_type){
            temp=rows.filter(item=>item.payment_type==account_type)
        }

        if(transiction_type){
            temp=temp.filter(item=>item.transaction_type==transiction_type)
        }
        
        if(limit){
        const [start,end]=limit.split("-").map(Number)
        temp=temp.reverse().slice(start,end)
        
        }
        return temp
    } catch (error) {
        return{
            status:false,
            message:"Something went wrong"
        }
    }

    
  }

  async sendStatement(data: {balance:number,credit?:number,debit?:number,payment_type:string,transaction_id?:string,transaction_type?:"diposit"|"sale"|"purchess"|"transfer"|"bill",note?:string}, req: Request,activity_message:string) {
    try {
      const resorce: StatementDto = {
        balance: data.balance,
        credit: data.credit||0,
        debit: data.debit||0,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        payment_type: data.payment_type,
        transaction_id: data.transaction_id||"",
        transaction_type: data.transaction_type,
        note: data.note,
      };

      
      await this.activityService.addActivity(
        req,
        activity_message
      );
      
      await this.statementRepo.insert(resorce);

      return {
        status: false,
        message: 'Diposit Successfull',
      };
    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  }

  async getPegintation(){
    try {
      const count = await this.statementRepo.count()
      let pageArr=[]
      let num = Math.ceil((count/10))
      for(let i=1;i<=num;i++){
        pageArr.push(i)
      }

      return pageArr

    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  }

}

