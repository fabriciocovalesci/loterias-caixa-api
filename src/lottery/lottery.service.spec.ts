import { Test, TestingModule } from '@nestjs/testing';
import { LotteryService } from './lottery.service';

describe('LotteryService', () => {
  let service: LotteryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotteryService],
    }).compile();

    service = module.get<LotteryService>(LotteryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
