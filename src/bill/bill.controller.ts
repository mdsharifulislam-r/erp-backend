import { Body, Controller, Get, Post, Query, Req, Search } from '@nestjs/common';
import { BillService } from './bill.service';
import { Request } from 'express';
import { BillDto } from 'src/DTO/bill.dto';

@Controller('api/bill')
export class BillController {
    constructor(private billService:BillService){}

    @Post()
    payBill(@Body() data:BillDto,@Req() req:Request){
        return this.billService.paybill(data,req)
    }

    @Get()
    getBillList(@Query('search') search:string,@Query('date') date:string){
        return this.billService.getBillReport(search,date)
    }
}
