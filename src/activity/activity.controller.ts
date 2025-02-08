import { Controller, Get, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('api/activity')
export class ActivityController {
    constructor(private activityService:ActivityService){}
    @Get()
    getActivity(@Query('limit') limit:string){
        console.log(limit);
        
        return this.activityService.getActivity(limit)
    }
}
