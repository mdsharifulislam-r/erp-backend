import { Body, Controller, Delete, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/DTO/register.dto';
import { LoginDto } from 'src/DTO/login.dto';
import { Request, Response } from 'express';
import { AddUserDto } from 'src/DTO/adduser.dto';

@Controller('/api/auth')
export class AuthController {
    constructor(private userService:AuthService){}
    @Post('register')
    register(@Body() data:RegisterDto) {
      
        return this.userService.register(data)
    }

    @Post('login')
    login(@Body() data:LoginDto, @Res() res:Response){
        return this.userService.loginUser(data,res)
    }

    @Delete('logout')
    logout(@Res() res:Response){
        return this.userService.logoutUser(res)
    }

    @Post('add-user')
    addUser(@Body() data:AddUserDto,@Req() req:Request){
        return this.userService.addUser(data,req)
    }
}
