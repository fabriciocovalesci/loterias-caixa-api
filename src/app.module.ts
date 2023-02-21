import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotteryModule } from './lottery/lottery.module';

@Module({
  imports: [
    LotteryModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.CONNECTION_STRING,
      }),
    }),
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
