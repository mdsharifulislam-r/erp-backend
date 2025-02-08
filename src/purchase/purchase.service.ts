import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AccountDto } from 'src/DTO/add.account.dto';
import { ProductDto } from 'src/DTO/product.dto';
import { PurchaseDto } from 'src/DTO/purchase.dto';
import { Purchase } from 'src/entity/purchase.entity';
import { StatementService } from 'src/statement/statement.service';
import { Repository } from 'typeorm';

@Injectable()
export class PurchaseService {
    constructor(@InjectRepository(Purchase) private purchaseRepo:Repository<Purchase>,private statementService:StatementService){}

    async purchaseItem(data:PurchaseDto,req:Request){
        try {
            const [account]:[AccountDto] = await this.purchaseRepo.query('SELECT * FROM account WHERE account_type=?',[data.paid_account])
            const [product]:[ProductDto]= await this.purchaseRepo.query('SELECT * FROM product WHERE product_name=?',[data.product_name])
            if(account.balance<data.paid){
                return{
                    status:false,
                    message:"Insufficient Fund"
                }
            }
            const stock = product.stock+data.total_amount
            const balance = account.balance-data.paid
            console.log(balance);
            
            await this.purchaseRepo.query('UPDATE product SET stock=? WHERE product_id=?',[stock,product.product_id])
            await this.purchaseRepo.query('UPDATE account SET balance=? WHERE account_type=?',[balance,data.paid_account])
            await this.purchaseRepo.insert(data)
            await this.statementService.sendStatement({balance:data.paid,credit:data.paid,payment_type:data.paid_account,transaction_type:"purchess",transaction_id:data.transaction_id},req,`Purchass ${data.product_name}`)
            return {
                status:true,
                message:`${data.product_name} is Purchess Successfully`
            }
            
        } catch (error) {
            console.log(error);
            
            return {
                status:false,
                message:'Something went wrong'
            }
        }
    }

    async getPurchaseData(supplier?:string,account?:string,limit:string='1-10'){
        try {
            const data = await this.purchaseRepo.find()
            let temp = data
            if(supplier){
                temp=temp.filter(item=>item.supplier.toLowerCase()==supplier.toLowerCase())
            }
            if(account){
                temp=temp.filter(item=>item.paid_account.toLowerCase()==account.toLowerCase())

            }
            
            if(limit){
            const [start,end]=limit.split("-").map(Number)
            temp=temp.reverse().slice(start,end)
            }
            

            return temp
        } catch (error) {
            console.log(error);
            
            return {
                status:false,
                message:'Something went wrong'
            }
        }
    }
    async getPegintation(){
    try {
      const count = await this.purchaseRepo.count()
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
