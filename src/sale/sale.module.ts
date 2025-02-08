import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { Purchase } from 'src/entity/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entity/account.entity';
import { Statement } from 'src/entity/statement.entity';
import { Activity } from 'src/entity/activity.entity';
import { Product } from 'src/entity/product.entity';
import { StatementService } from 'src/statement/statement.service';
import { ActivityService } from 'src/activity/activity.service';
import { Sale } from 'src/entity/sale.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sale,Account,Statement,Activity,Product])],
  controllers: [SaleController],
  providers: [SaleService,StatementService,ActivityService]
})
export class SaleModule {}
