import { IsNotEmpty } from "class-validator";


export class PurchaseDto{

    id:number

    @IsNotEmpty()
    supplier:string

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