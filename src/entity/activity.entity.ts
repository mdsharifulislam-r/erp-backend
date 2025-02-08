import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    activity:string

    @Column({nullable:false})
    time:string
}