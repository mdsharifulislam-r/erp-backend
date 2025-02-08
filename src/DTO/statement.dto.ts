export class StatementDto{
    statement_id?:number
    payment_type:string
    balance:number
    transaction_type:"diposit"|"sale"|"purchess"|"transfer"|"bill"
    date:string
    note?:string
    transaction_id?:string
    credit?:number
    debit?:number
    time:string

}