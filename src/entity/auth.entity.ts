import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:false})
    name:string

    @Column({nullable:false,unique:true})
    username:string

    @Column({nullable:false})
    password:string

}