import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    product_id:number

    @Column({nullable:false})
    product_name:string

    @Column({nullable:false})
    unit:string

    @Column({nullable:false})
    stock:number

    @Column({nullable:false})
    buy_price:number

    @Column({nullable:false})
    sell_price:number

    @Column({nullable:true,default:""})
    image:string
}