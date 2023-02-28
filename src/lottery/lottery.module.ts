import { Module } from '@nestjs/common';
import { LotteryService } from './lottery.service';
import { LotteryController } from './lottery.controller';

import { Lotofacil, LotofacilSchema } from './schemas/lotofacil.schema';
import { Lotomania, LotomaniaSchema } from './schemas/lotomania.schema';
import { Megasena, MegasenaSchema } from './schemas/mega-sena.schema';
import { DuplaSena, DuplaSenaSchema } from './schemas/dupla-sena.schema';
import { Quina, QuinaSchema } from './schemas/quina.schema';
import { Timemania, TimemaniaSchema } from './schemas/timemania.schema';
import { DiaDeSorte, DiaDeSorteSchema } from './schemas/dia-de-sorte.schema';
import { SuperSete, SuperSeteSchema } from './schemas/super-sete.schema';

import { MongoLotomaniaRepository } from './repositories/mongo/mongo.lotomania.repository';
import { MongoMegasenaRepository } from './repositories/mongo/mongo.megasena.repository';
import { MongoDulpaSenaRepository } from './repositories/mongo/mongo.duplasena.repository';
import { MongoQuinaRepository } from './repositories/mongo/mongo.quina.repository';
import { MongoSuperSeteRepository } from './repositories/mongo/mongo.supersete.repository';
import { MongoTimemaniaRepository } from './repositories/mongo/mongo.timemania.repository';
import { MongoDiaDeSorteRepository } from './repositories/mongo/mongo.diadesorte.repository';
import { MongoLotofacilRepository } from './repositories/mongo/mongo.lotofacil.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Lotofacil.name, schema: LotofacilSchema },
      { name: Lotomania.name, schema: LotomaniaSchema },
      { name: Megasena.name, schema: MegasenaSchema },
      { name: DuplaSena.name, schema: DuplaSenaSchema },
      { name: Quina.name, schema: QuinaSchema },
      { name: Timemania.name, schema: TimemaniaSchema },
      { name: DiaDeSorte.name, schema: DiaDeSorteSchema },
      { name: SuperSete.name, schema: SuperSeteSchema }
    ]),
  ],
  controllers: [LotteryController],
  providers: [
    LotteryService,
    MongoLotofacilRepository,
    MongoLotomaniaRepository,
    MongoMegasenaRepository,
    MongoDulpaSenaRepository,
    MongoQuinaRepository,
    MongoSuperSeteRepository,
    MongoTimemaniaRepository,
    MongoDiaDeSorteRepository,
  ],
  exports: [
    MongoLotofacilRepository,
    MongoLotomaniaRepository,
    MongoMegasenaRepository,
    MongoDulpaSenaRepository,
    MongoQuinaRepository,
    MongoSuperSeteRepository,
    MongoTimemaniaRepository,
    MongoDiaDeSorteRepository
  ],
})
export class LotteryModule { }
