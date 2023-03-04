import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { HttpModule } from '@nestjs/axios';

import { ScraperService } from './scraper.service';
import { PublishLotofacilScraperCreatedListener } from './listeners/publish-lotofacil-created.listener';
import { PublishLotomaniaCreatedListener } from './listeners/publish-lotomania-created.listener';
import { PublishMegasenaCreatedListener } from './listeners/publish-megasena-created.listener';
import { PublishQuinaCreatedListener } from './listeners/publish-quina-created.listener';
import { LotteryModule } from 'src/lottery/lottery.module';
import { PublishDiaDeSorteScraperCreatedListener } from './listeners/publish-diadesorte-created.listener';
import { PublishTimemaniaScraperCreatedListener } from './listeners/publish-timemania-created.listener';
import { PublishSuperSeteScraperCreatedListener } from './listeners/publish-supersete-created.listener';
import { PublishDuplaSenaScraperCreatedListener } from './listeners/publish-duplasena-created.listener';

@Module({
  imports: [
    HttpModule,
    LotteryModule
  ],
  controllers: [],
  providers: [
    ScraperService,
    PublishLotofacilScraperCreatedListener,
    PublishLotomaniaCreatedListener,
    PublishMegasenaCreatedListener,
    PublishQuinaCreatedListener,
    PublishDiaDeSorteScraperCreatedListener,
    PublishTimemaniaScraperCreatedListener,
    PublishSuperSeteScraperCreatedListener,
    PublishDuplaSenaScraperCreatedListener,
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ]
})
export class ScraperModule {}
