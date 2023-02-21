import { Module } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { LotteryController } from './lottery.controller';

@Module({
  controllers: [LotteryController],
  providers: [LotteryService]
})
export class LotteryModule {}
