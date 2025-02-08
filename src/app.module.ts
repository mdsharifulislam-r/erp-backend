import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { ActivityModule } from './activity/activity.module';
import { ActivityService } from './activity/activity.service';
import { ClientModule } from './client/client.module';
import { AccountModule } from './account/account.module';
import { StatementModule } from './statement/statement.module';
import { ProductModule } from './product/product.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SaleModule } from './sale/sale.module';
import { BillModule } from './bill/bill.module';
import { StaffModule } from './staff/staff.module';
import { DetailsController } from './details/details.controller';
import { DetailsModule } from './details/details.module';
import { DetailsService } from './details/details.service';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
   
    }),
    JwtModule.register({
      secret: 'RunaBinteAnamul',
      signOptions: {},
      global: true,
    }),
    ActivityModule,
    ClientModule,
    AccountModule,
    StatementModule,
    ProductModule,
    PurchaseModule,
    SaleModule,
    BillModule,
    StaffModule,
    DetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/auth/add-user',
      method: RequestMethod.POST,
    });
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/activity',
      method: RequestMethod.GET,
    });
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/client',
      method: RequestMethod.ALL,
    });

    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/account',
      method: RequestMethod.ALL,
    });

    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/account/diposit',
      method: RequestMethod.ALL,
    });

    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/product',
      method: RequestMethod.ALL,
    });

    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/statement',
      method: RequestMethod.ALL,
    });

    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/sale',
      method: RequestMethod.ALL,
    });

    consumer.apply(LoggerMiddleware).forRoutes({
      path: '/api/purchase',
      method: RequestMethod.ALL,
    });


  }
}
