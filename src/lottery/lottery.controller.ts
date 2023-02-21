import { Body, Controller, Get, Param } from '@nestjs/common';
import { LotteryService } from './lottery.service';




@Controller({
  version: '1',
  path: '/api/'
})
export class LotteryController {


  constructor(
    private loteriaService: LotteryService,
  ) { }



  @Get(':lottery/latest')
  findLottery(@Param('lottery') lottery: string) {
    return this.loteriaService.findResultsLatest(lottery);
  }


  @Get(':lottery/:concurso')
  findLotteryByConcurso(@Param('lottery') lottery: string, @Param('concurso') concurso: number) {
    return this.loteriaService.findOne(lottery, concurso);
  }


}