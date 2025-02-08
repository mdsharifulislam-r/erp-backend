import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class AccountDto{
    
    account_id:number

    @IsNotEmpty()
    account_number:string

    @IsNotEmpty()
    @IsNumber()
    balance:number

    @IsNotEmpty()
    @IsString()
    account_type:string


    creation_date:string

    note:string

    status:"active"|"inactive"
}

export class AddBalanceDto{
    @IsNotEmpty()
    payment_type:string

    @IsNotEmpty()
    @IsNumber()
    balance:number

    note:string

    transection_id:string

    date:string

    
}
