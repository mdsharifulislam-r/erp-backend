import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, response, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private jwtService:JwtService){}
  use(req:Request, res: Response, next: () => void) {
    try {
      const token = req.headers.authorization
      
      const verfiy = this.jwtService.verify(token)
      if(!verfiy){
        return res.status(400).json({
          status:false,
          message:'Token is Expired'
        })
      }
      next()
    } catch (error) {
    
      return res.status(500).json({
        status:false,
        message:['Token is Expired']
      })
    }
  }
}
