import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from 'src/entity/bill.entity';
import { Activity } from 'src/entity/activity.entity';
import { Account } from 'src/entity/account.entity';
import { StatementService } from 'src/statement/statement.service';
import { Statement } from 'src/entity/statement.entity';
import { ActivityService } from 'src/activity/activity.service';

@Module({
  imports:[TypeOrmModule.forFeature([Bill,Activity,Account,Statement])],
  controllers: [BillController],
  providers: [BillService,StatementService,ActivityService]
})
export class BillModule {}
