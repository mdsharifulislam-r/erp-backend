import { Controller, Get, Post, Query } from '@nestjs/common';
import { StatementService } from './statement.service';

@Controller('api/statement')
export class StatementController {
    constructor(private statementService:StatementService){}
    @Get()
    getStateMents(@Query('account_type') account_type:string, @Query('transiction_type') transiction_type:string,@Query('limit') limit:string){
        return this.statementService.getStateMents(account_type,transiction_type,limit)
    }

    @Get('page')
    getPagination(){
        return this.statementService.getPegintation()
    }
}
