import { Controller, Get, Query } from '@nestjs/common';
import { DetailsService } from './details.service';

@Controller('api/details')
export class DetailsController {

    constructor(private detailsService:DetailsService){}

    @Get()
    getDetails(@Query('name') name:string){
        return this.detailsService.getDetails(name)
    }

    @Get('revenue')
    getRavinue(){
        return this.detailsService.getRavinue()
    }
}
