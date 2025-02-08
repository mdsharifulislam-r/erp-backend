import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Activity } from 'src/entity/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
    constructor(@InjectRepository(Activity) private activityRepo:Repository<Activity>, private jwtService:JwtService){}
    async addActivity(req:Request,activity:string){
        try {
            const token = req.headers.authorization
            const id = this.jwtService.decode(token)
            
            const time = new Date().toLocaleTimeString()
            const rows = await this.activityRepo.query('SELECT username FROM user WHERE id=?',[id])
            const str = `${rows[0].username} is ${activity} at ${time}`

            await this.activityRepo.insert({time:new Date().toLocaleDateString(),activity:str})
            
        } catch (error) {
            return {
                status:false,
                message:"Something went wrong"
            }
        }
    }

    async getActivity(limit:string){
        try {
            if(limit){
                const rows = await this.activityRepo.query('SELECT * FROM `activity` ORDER BY id DESC LIMIT ?',[parseInt(limit)])
                return rows
            }
            const rows = await this.activityRepo.query('SELECT * FROM `activity` ORDER BY id DESC')
            return rows
        } catch (error) {
            console.log(error);
            
            return {
                status:false,
                message:"Something went wrong"
            }
        }
    }
}
