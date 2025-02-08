import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Staff{
    @PrimaryGeneratedColumn()
    staff_id:number

    @Column()
    name:string

    @Column({nullable:true})
    email:string

    @Column()
    phone:string

    @Column({nullable:true})
    image:string

    @Column()
    sellery:number

    @Column()
    department:string


}