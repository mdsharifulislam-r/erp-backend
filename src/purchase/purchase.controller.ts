import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { PurchaseDto } from 'src/DTO/purchase.dto';
import { PurchaseService } from './purchase.service';

@Controller('api/purchase')
export class PurchaseController {
    constructor(private purchassService:PurchaseService){}
    @Post()
    purchassItem(@Body() data:PurchaseDto,@Req() req:Request){
        return this.purchassService.purchaseItem(data,req)
    }
    @Get()
    getPurchaseData(@Query('supplier') supplier:string,@Query('account') account:string,@Query("limit") limit:string){
        return this.purchassService.getPurchaseData(supplier,account,limit)
    }
    
    @Get('page')
    getPagination(){
    return this.purchassService.getPegintation()
    }
}
