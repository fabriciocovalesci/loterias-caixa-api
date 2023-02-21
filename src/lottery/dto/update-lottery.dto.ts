import { PartialType } from '@nestjs/mapped-types';
import { CreateLotteryDto } from './create-lottery.dto';

export class UpdateLotteryDto extends PartialType(CreateLotteryDto) {}
