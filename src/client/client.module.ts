import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/entity/client.entity';
import { ActivityService } from 'src/activity/activity.service';
import { Activity } from 'src/entity/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client,Activity])],
  controllers: [ClientController],
  providers: [ClientService,ActivityService]
})
export class ClientModule {}
