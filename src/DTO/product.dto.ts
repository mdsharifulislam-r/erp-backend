import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductDto{
    
    product_id:number

    @IsNotEmpty()
    @IsString()
    product_name:string

    @IsNotEmpty()
    unit:"kg"|"pcs"

    @IsNotEmpty()
    stock:number

    @IsNotEmpty()
    buy_price:number

    @IsNotEmpty()
    sell_price:number

    
    image:string
}