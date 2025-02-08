import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StaffDTO{
    
    staff_id:number

    @IsNotEmpty()
    name:string

    @IsEmail()
    email:string

   
    phone:string

   
    image:string

    @IsNotEmpty()
    sellery:number

    @IsNotEmpty()
    department:string


}