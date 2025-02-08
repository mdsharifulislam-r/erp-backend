import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { ActivityService } from 'src/activity/activity.service';
import { Activity } from 'src/entity/activity.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Activity])],
  controllers: [ProductController],
  providers: [ProductService,ActivityService]
})
export class ProductModule {}
