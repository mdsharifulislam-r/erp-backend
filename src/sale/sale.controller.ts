import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleDto } from 'src/DTO/sale.dto';
import { Request } from 'express';

@Controller('api/sale')
export class SaleController {
    constructor(private saleService:SaleService){}

    @Post()
    saleItem(@Body() data:SaleDto,@Req() req:Request){
        return this.saleService.SaleItem(data,req)
    }

    @Get()
    getPurchaseData(@Query('client') client:string,@Query('account') account:string,@Query('limit') limit:string){
        return this.saleService.getPurchaseData(client,account)
    }
    
    @Get("page")
    getPagination(){
    return this.saleService.getPegintation()
    }
}
