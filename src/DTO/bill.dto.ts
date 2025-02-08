import { IsNotEmpty } from "class-validator";



export class BillDto{
 
    bill_id:number

    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    amount:number

    @IsNotEmpty()
    method:string
    
    date:string

}