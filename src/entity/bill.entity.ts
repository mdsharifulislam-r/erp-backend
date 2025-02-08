import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bill{
    @PrimaryGeneratedColumn()
    bill_id:number

    @Column()
    name:string

    @Column()
    amount:number

    @Column({nullable:false,default:new Date().toLocaleDateString()})
    date:string

    @Column()
    method:string

}