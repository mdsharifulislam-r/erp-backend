import { Module } from '@nestjs/common';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entity/account.entity';
import { Sale } from 'src/entity/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account,Sale])],
  controllers: [DetailsController],
  providers: [DetailsService]
})
export class DetailsModule {}
