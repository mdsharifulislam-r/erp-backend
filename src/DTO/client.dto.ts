import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Column, } from "typeorm";


export class ClientDTO {
 
    client_id:number

    @IsNotEmpty()
    @IsString()
    name:string

    @Column()
  
    contact_number:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    address:string

  
    image:string

  
    company:string

   
    reference:string

   
    details:string

    @IsNotEmpty()
    @IsString()
    status:"client" | "supplier"


}