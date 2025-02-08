import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto, AddBalanceDto } from 'src/DTO/add.account.dto';
import { Request } from 'express';

@Controller('api/account')
export class AccountController {
    constructor(private accountService:AccountService){}
    @Post()
    async addPaymentMethod(@Body() data:AccountDto,@Req() req:Request){
        return this.accountService.addPaymentMethod(data,req)
    }

    @Get()
    getAllPaymentMethod(@Query('list') list:string,@Query("search") search:string){
        return this.accountService.getPaymentsMethodData(list,search)
    }

    @Post('diposit')
    addMoney(@Body() data:AddBalanceDto,@Req() req:Request){
        return this.accountService.diposit(data,req)
    }
   
}
