import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ActivityService } from 'src/activity/activity.service';
import { ProductDto } from 'src/DTO/product.dto';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private ProductRepo:Repository<Product>,private activityService:ActivityService){}

    async addProductData(data:ProductDto,req:Request){
        try {
            await this.ProductRepo.insert(data)
            await this.activityService.addActivity(req,`add product ${data.product_name}`)
            return {
                status:true,
                message:"Product added successfully"
            }
        } catch (error) {
            return {
                status:false,
                message:"Something went wrong"
            }
        }
    }

    async getProductsData(unit:string,search:string,list:string){
        try {
            const rows = await this.ProductRepo.find()

            let temp = rows

            if(unit){
                temp=temp.filter(item=>item.unit.toLowerCase()==unit.toLowerCase())
            }

            if(list){
                let temp2=[]
                temp2=rows.map(item=>item.product_name)
                if(search){
                    temp2=temp2.filter(item=>item.toLowerCase().includes(search.toLowerCase()))
                }
                return temp2.reverse()
            }
            if(search){
                temp=temp.filter(item=>item.product_name.toLowerCase().includes(search.toLowerCase()))
            }
            return temp
        } catch (error) {
            return {
                status:false,
                message:"Something went wrong"
            }
        }
    }
    
    async getProductData(name:string){
        try {
            const row = await this.ProductRepo.findOne({where:{product_name:name}})
            return row
        } catch (error) {
            return {
                status:false,
                message:"Something went wrong"
            }
        }
    }
}
