import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Statement{
    @PrimaryGeneratedColumn()
    statement_id:number

    @Column({nullable:false})
    payment_type:string

    @Column({nullable:false})
    balance:number

    @Column({nullable:false})
    transaction_type:string

    @Column({nullable:true})
    transaction_id:string

    @Column({nullable:true,default:0})
    credit:number

    @Column({nullable:true,default:0})
    debit:number

    @Column({nullable:false})
    date:string
    
    @Column({nullable:false})
    time:string

}