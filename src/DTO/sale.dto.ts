import { IsNotEmpty } from "class-validator";


export class SaleDto{

    id:number

    @IsNotEmpty()
    client:string

    @IsNotEmpty()
    total_amount:number

    @IsNotEmpty()
    product_name:string

    @IsNotEmpty()
    paid:number

    @IsNotEmpty()
    paid_account:string

    
    transaction_id:string

    
    date:string
}