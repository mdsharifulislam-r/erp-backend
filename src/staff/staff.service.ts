import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffDTO } from 'src/DTO/staff.dto';

import { Staff } from 'src/entity/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
    constructor(@InjectRepository(Staff) private staffRepo:Repository<Staff>){}

    async addStaff(data:StaffDTO){
        try {
            await this.staffRepo.insert(data)
            return {
                status:true,
                message:"Staff add successfully"
            }
        } catch (error) {
            console.log(error);
            
            return {
                status:false,
                message:"Something went wrong"
            }
        }
    }

    async getStaffData(search?:string){
       try {
        const rows = await this.staffRepo.find()

        let temp = rows

        if(search){
            temp=temp.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
        }

        return temp.reverse()
       } catch (error) {
        return {
            status:false,
            message:"Something went wrong"
        }
       }
    }
}
