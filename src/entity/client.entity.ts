import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    client_id:number

    @Column({nullable:false})
    name:string

    @Column()
    contact_number:string

    @Column()
    email:string

    @Column()
    address:string

    @Column({nullable:true})
    image:string

    @Column({nullable:true})
    company:string

    @Column({nullable:true})
    reference:string

    @Column({nullable:true})
    details:string

    @Column()
    status:string


}