import { Injectable } from '@nestjs/common';
import { CreateLotteryDto } from './dto/create-lottery.dto';
import { UpdateLotteryDto } from './dto/update-lottery.dto';

@Injectable()
export class LotteryService {
  create(createLotteryDto: CreateLotteryDto) {
    return 'This action adds a new lottery';
  }

  findAll() {
    return `This action returns all lottery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lottery`;
  }

  update(id: number, updateLotteryDto: UpdateLotteryDto) {
    return `This action updates a #${id} lottery`;
  }

  remove(id: number) {
    return `This action removes a #${id} lottery`;
  }
}
