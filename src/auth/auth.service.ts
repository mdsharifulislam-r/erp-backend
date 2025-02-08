import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { RegisterDto } from 'src/DTO/register.dto';
import { Users } from 'src/entity/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import {LoginDto } from 'src/DTO/login.dto';
import { AddUserDto } from 'src/DTO/adduser.dto';
import { generateUserCredintials } from 'src/lib/helpers/genarateUserCredintials';
import { ActivityService } from 'src/activity/activity.service';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(Users) private userRepo:Repository<Users>,private jwtService:JwtService,private activityService:ActivityService){}
    async register(data:RegisterDto) {
        try {
            if(data.confirmPassword!==data.password){
                return new BadRequestException(['Password not Match'])
            }
            const rows = await this.userRepo.query('SELECT * FROM users WHERE username=?',[data.username])
            if(rows.length){
                return new BadRequestException(["Username not available"])
            }

            const hashpass = await bcrypt.hash(data.password,10)
            await this.userRepo.insert({name:data.name,username:data.username,password:hashpass})
            return {
                status:true,
                message:["Account Created Successfully"]
            }
            
        } catch (error) {
        
            console.log(error);
            
            throw new HttpException(["Something went wrong"],
        500,
        {
            cause:error
        }
        )
        }
    }

    async loginUser(data:LoginDto,res:Response){
        try {
            const rows = await this.userRepo.query('SELECT * FROM users WHERE username=?',[data.username])

            if(!rows.length){
                return res.status(400).json({
                    status:false,
                    message:["Invalid credintials"]
                })
            }

            const match = await bcrypt.compare(data.password,rows[0].password)
            if(!match){
                return res.status(400).json({
                    status:false,
                    message:["Invalid credintials"]
                })
            }

            const token = this.jwtService.sign(rows[0].id)
            const response = res.cookie("token",token)
            delete rows[0].id
            delete rows[0].password
            return response.json({
                status:true,
                message:["Login Successfully"],
                user:rows[0],
                token
            })
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                status:false,
                message:["Something went wrong"]
            })
        }
    }

    async logoutUser(res:Response){
        try {
            const response = res.cookie("token","")
            return response.json({
                status:true,
                message:['Logout successfull'],
            
            })
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                status:false,
                message:["Something went wrong"]
            })
        }
    }

    async addUser(data:AddUserDto,req:Request){
        try {
            const credintials= await generateUserCredintials(data.name)
            const hashpass = await bcrypt.hash(credintials.password,10)
            await this.userRepo.insert({name:data.name,username:credintials.username,password:hashpass})
            await this.activityService.addActivity(req,"add a admin")
            return credintials
        } catch (error) {
            console.log(error);
            throw new HttpException(["Something went wrong"],
                500,
                {
                    cause:error
                }
                )
        }
    }
}
