import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entity/account.entity';
import { ActivityService } from 'src/activity/activity.service';
import { Activity } from 'src/entity/activity.entity';
import { StatementService } from 'src/statement/statement.service';
import { Statement } from 'src/entity/statement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account,Activity,Statement])],
  controllers: [AccountController],
  providers: [AccountService,ActivityService,StatementService]
})
export class AccountModule {}
