import { Body, Controller, Get, Post, Query, Req,Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from 'src/DTO/product.dto';
import { Request } from 'express';

@Controller('api/product')
export class ProductController {
    constructor(private productService:ProductService){}

    @Post()
    addProduct(@Body() data:ProductDto,@Req() req:Request){
        return this.productService.addProductData(data,req)
    }

    
    @Get()
    getProductData(@Query('search') search:string,@Query('unit') unit:string,@Query('list') list:string){
        return this.productService.getProductsData(unit,search,list)
    }

    @Get(':name')
    getProductDataByName(@Param('name') name:string){
        return this.productService.getProductData(name)
    }

}
