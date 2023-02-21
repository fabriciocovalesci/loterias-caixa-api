import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotteryModule } from './lottery/lottery.module';

@Module({
  imports: [LotteryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
