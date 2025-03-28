import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv'
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({origin:"*",credentials:true})
    console.log(process.env.PORT);
    
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
