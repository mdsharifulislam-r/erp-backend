import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDTO } from 'src/DTO/staff.dto';


@Controller('api/staff')
export class StaffController {
    constructor(private staffService:StaffService){}

    @Post()
    addStaffData(@Body() data:StaffDTO){
        return this.staffService.addStaff(data)
    }

    @Get()
    getStaffData(@Query('search') search:string){
        return this.staffService.getStaffData(search)
    }
}
