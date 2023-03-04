import {  Injectable } from '@nestjs/common';
import { LotteryEnum } from './config/lottery.enum';
import {validatorParamsLottery} from './helpers/lottery.helper';
import { MongoDiaDeSorteRepository } from './repositories/mongo/mongo.diadesorte.repository';
import { MongoDulpaSenaRepository } from './repositories/mongo/mongo.duplasena.repository';
import { MongoLotofacilRepository } from './repositories/mongo/mongo.lotofacil.repository';
import { MongoLotomaniaRepository } from './repositories/mongo/mongo.lotomania.repository';
import { MongoMegasenaRepository } from './repositories/mongo/mongo.megasena.repository';
import { MongoQuinaRepository } from './repositories/mongo/mongo.quina.repository';
import { MongoSuperSeteRepository } from './repositories/mongo/mongo.supersete.repository';
import { MongoTimemaniaRepository } from './repositories/mongo/mongo.timemania.repository';




@Injectable()
export class LotteryService {


  constructor(
    private lotofacil: MongoLotofacilRepository,
    private lotomania: MongoLotomaniaRepository,
    private megasena: MongoMegasenaRepository,
    private quina: MongoQuinaRepository,
    private duplasena: MongoDulpaSenaRepository,
    private diadesorte: MongoDiaDeSorteRepository,
    private supersete: MongoSuperSeteRepository,
    private timemania: MongoTimemaniaRepository
    ){}


  typeLottery(lottery: string) {
    const type: string | object = validatorParamsLottery(lottery);
    
    switch (type[1]) {
      case "lotofacil":
        return this.lotofacil;
      case "lotomania":
        return this.lotomania;
      case "megasena":
        return this.megasena;
      case "quina":
        return this.quina;
      case "duplasena":
        return this.duplasena;
      case "timemania":
        return this.timemania;
      case "diadesorte":
        return this.diadesorte;
      case "supersete":
        return this.supersete;
    }
  }


  findResultsLatest(lottery: string) {
    const type = this.typeLottery(lottery);
    return type.findLatest();
  }

  findOne(lottery: string, concurso: number){
    const type = this.typeLottery(lottery);
    return type.findOne(concurso);
  }

  findResultsAll(lottery: string) {
    const type = this.typeLottery(lottery);
    return type.findAll();
  }


  registeredLotteries(lottery: string) {

    const result: string | object = validatorParamsLottery(lottery);

    if (typeof result === 'object') return result;

    const values = Object.values(LotteryEnum).some((value) => value === lottery);
    return values;
  }

}
