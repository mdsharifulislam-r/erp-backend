import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entity/auth.entity';
import { ActivityService } from 'src/activity/activity.service';
import { Activity } from 'src/entity/activity.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Users,Activity])],
  controllers: [AuthController],
  providers: [AuthService,ActivityService]
})
export class AuthModule {}
