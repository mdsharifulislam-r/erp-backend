import { Module } from '@nestjs/common';

import { StatementService } from './statement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statement } from 'src/entity/statement.entity';
import { Account } from 'src/entity/account.entity';
import { Activity } from 'src/entity/activity.entity';
import { ActivityService } from 'src/activity/activity.service';
import { StatementController } from './statement.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Statement,Account,Activity])],
  controllers: [StatementController],
  providers: [StatementService,ActivityService]
})
export class StatementModule {}
