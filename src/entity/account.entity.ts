import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account{
    @PrimaryGeneratedColumn()
    account_id:number

    @Column({nullable:false})
    account_number:string

    @Column({nullable:false})
    balance:number

    @Column({nullable:false})
    account_type:string

    @Column({nullable:false})
    creation_date:string

    @Column({nullable:true})
    note:string

    @Column({nullable:true, default:"active"})
    status:string
}