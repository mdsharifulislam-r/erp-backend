import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/entity/purchase.entity';
import { Account } from 'src/entity/account.entity';
import { StatementService } from 'src/statement/statement.service';
import { Statement } from 'src/entity/statement.entity';
import { Activity } from 'src/entity/activity.entity';
import { ActivityService } from 'src/activity/activity.service';
import { Product } from 'src/entity/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Purchase,Account,Statement,Activity,Product])],
  controllers: [PurchaseController],
  providers: [PurchaseService,StatementService,ActivityService]
})
export class PurchaseModule {}
