import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from 'src/entity/activity.entity';
import { Users } from 'src/entity/auth.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Activity,Users])],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
