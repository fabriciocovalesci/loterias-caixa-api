import { Test, TestingModule } from '@nestjs/testing';
import { LotteryController } from './lottery.controller';
import { LotteryService } from './lottery.service';

describe('LotteryController', () => {
  let controller: LotteryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotteryController],
      providers: [LotteryService],
    }).compile();

    controller = module.get<LotteryController>(LotteryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
