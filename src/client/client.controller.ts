import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDTO } from 'src/DTO/client.dto';
import { Request } from 'express';

@Controller('api/client')
export class ClientController {
    constructor(private clientService:ClientService){}
    @Post()
    addClientAndSupplier(@Body() data:ClientDTO,@Req() req:Request){
        return this.clientService.addClientAndSupplier(data,req)
    }
    @Get()
    getClientsByStatus(@Query('status') status:string,@Query('list') list:string,@Query("search") search:string){
        return this.clientService.getClientsByStatus(status,list,search)
    }
    
    @Get(':name')
    getSingleData(@Query('status') status:string,@Param('name') name:string){
        return this.clientService.getSingleData(status,name)
    }

    @Delete(':client_id')
    deleteClientDatta(@Param('client_id') client_id:string){
        return this.clientService.deleteClientDatta(parseInt(client_id))
    }
}
