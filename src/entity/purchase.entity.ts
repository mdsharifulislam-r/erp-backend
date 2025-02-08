import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Purchase{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    supplier:string

    @Column({nullable:false})
    total_amount:number

    @Column({nullable:false})
    product_name:string

    @Column()
    paid:number

    @Column()
    paid_account:string

    @Column({nullable:true})
    transaction_id:string

    @Column({nullable:true,default:new Date().toLocaleDateString()})
    date:string
}