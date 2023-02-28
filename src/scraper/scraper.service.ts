import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LotomaniaSpyder } from './spyders/lotomania.spyder';
import { LotofacilSpyder } from './spyders/lotofacil.spyder';
import { Loteria } from './loteria.entity';
import EventEmitter from 'events';
import { LoteriaCreatedEvent } from './events/loteria-created.event';
import { QuinaSpyder } from './spyders/quina.spyder';
import { MegasenaSpyder } from './spyders/megasena.spyder';
import { DiaDeSorteSpyder } from './spyders/dia-de-sorte.spyder';
import { TimemaniaSpyder } from './spyders/timemania.spyder';
import { SuperSeteSpyder } from './spyders/super-sete.spyder';
import { DuplaSenaSpyder } from './spyders/dupla-sena.spyder';
import { MongoLotofacilRepository } from 'src/lottery/repositories/mongo/mongo.lotofacil.repository';
import { MongoQuinaRepository } from 'src/lottery/repositories/mongo/mongo.quina.repository';
import { MongoLotomaniaRepository } from 'src/lottery/repositories/mongo/mongo.lotomania.repository';
import { MongoMegasenaRepository } from 'src/lottery/repositories/mongo/mongo.megasena.repository';


@Injectable()
export class ScraperService {

    private readonly logger = new Logger(ScraperService.name);
    private baseUrl: string = 'https://www.mazusoft.com.br'

    constructor(
        private http: HttpService,
        private lotofacilRepository: MongoLotofacilRepository,
        private quinaRepository: MongoQuinaRepository,
        private lotomaniaRepository: MongoLotomaniaRepository,
        private megasenaRepository : MongoMegasenaRepository,
        @Inject("EventEmitter")
        private eventEmitter: EventEmitter
        ) {}


    @Cron("*/15 21-23 * * 1-6")
    // @Cron("*/30 * * * * 1-6")
    async crawlerQuina(){
        this.logger.warn("Running Cron job - Quina")
        const quinaMongo: any = await this.quinaRepository.findLatest();        
        const url = `${this.baseUrl}/quina/resultado.php?concurso=${quinaMongo?.proxConcurso}`;
        const html = await (await firstValueFrom(this.http.get(url))).data
        const scrapper = new QuinaSpyder(html);
        const quina: Loteria = scrapper.start(); 

        if (quina && quinaMongo?.concurso < quina?.concurso){
            this.eventEmitter.emit('quina.created', new LoteriaCreatedEvent(quina));
           this.logger.log(`Inserindo no banco de dados, concurso ${quina?.concurso}.`)
        }
        
    }



    @Cron("*/15 21-23 * * 1,3,5")
    // @Cron("*/30 * * * * 1-6")
    async crawlerLotoMania(){
        this.logger.warn("Running Cron job - Lotomania");
        const maniaMongo: any = await this.lotomaniaRepository.findLatest();        
        const url = `${this.baseUrl}/lotomania/resultado.php?concurso=${maniaMongo?.proxConcurso}`;
        const html = await (await firstValueFrom(this.http.get(url))).data
        const scrapper = new LotomaniaSpyder(html);
        const mania: Loteria = scrapper.start(); 

        if (mania && maniaMongo?.concurso < mania?.concurso){
            this.eventEmitter.emit('lotomania.created', new LoteriaCreatedEvent(mania));
           this.logger.log(`Inserindo no banco de dados, concurso ${mania?.concurso}.`)
        }
    }


    @Cron("*/15 21-23 * * 3,6")
    // @Cron("*/30 * * * * 1-6")
    async crawlerMegaSena(){
        this.logger.warn("Running Cron job - Megasena")
        const megaMongo: any = await this.megasenaRepository.findLatest();
        const url = `${this.baseUrl}/mega/resultado.php?concurso=${megaMongo?.proxConcurso}`;
        const html = await (await firstValueFrom(this.http.get(url))).data;
        const scrapper = new MegasenaSpyder(html);
        const megasena: Loteria = scrapper.start();
        
        if (megasena && megaMongo?.concurso < megasena?.concurso){
            this.eventEmitter.emit('megasena.created', new LoteriaCreatedEvent(megasena));
           this.logger.log(`Inserindo no banco de dados, concurso ${megasena?.concurso}.`)
        }
    }

    @Cron("*/15 21-23 * * 1-6")
    // @Cron("*/30 * * * * 1-6")
    async crawlerLotoFacil(){
        this.logger.warn("Running Cron job - Lotofacil")
        const lotofacilMongo: any = await this.lotofacilRepository.findLatest();
        const url = `${this.baseUrl}/lotofacil/resultado.php?concurso=${lotofacilMongo?.proxConcurso}`;
        const html = await (await firstValueFrom(this.http.get(url))).data;
        const scrapper = new LotofacilSpyder(html);
        const lotofacil: Loteria = scrapper.start(); 
    
        if (lotofacil && lotofacilMongo?.concurso < lotofacil?.concurso){
            this.eventEmitter.emit('lotofacil.created', new LoteriaCreatedEvent(lotofacil));
           this.logger.log(`Inserindo no banco de dados, concurso ${lotofacil?.concurso}.`)
        }
    }


    // @Cron("*/15 21-23 * * 2,4,6")
    // @Cron("*/15 * * * * 1-6")
    async crawlerDiaDeSorte(){
        this.logger.warn("Running Cron job - Dia de Sorte");

        // const lotofacilMongo: any = await this.lotofacilRepository.findLatest();
        const url = `${this.baseUrl}/dia-de-sorte/resultado.php?concurso=${716}`;
        const html = await (await firstValueFrom(this.http.get(url))).data;
        const scrapper = new DiaDeSorteSpyder(html);
        const diadesorte: Loteria = scrapper.start(); 
        console.log(diadesorte);
        
    
        // if (lotofacil && lotofacilMongo?.concurso < lotofacil?.concurso){
        //     this.eventEmitter.emit('lotofacil.created', new LoteriaCreatedEvent(lotofacil));
        //    this.logger.log(`Inserindo no banco de dados, concurso ${lotofacil?.concurso}.`)
        // }
    }


    // @Cron("*/15 21-23 * * 2,4,6")
    // @Cron("*/15 * * * * 1-6")
    async crawlerTimeMania(){
        this.logger.warn("Running Cron job - Timemania");

        // const lotomaniMongo: any = await this.lotomaniaRepository.findLatest();
     
        const url = `${this.baseUrl}/lotofacil/resultado-timemania.php?concurso=${1892}`;
        const html = await (await firstValueFrom(this.http.get(url))).data;
        const scrapper = new TimemaniaSpyder(html);
        const timemania: Loteria = scrapper.start(); 
        console.log(timemania);
        
    
        // if (lotofacil && lotomaniMongo?.concurso < lotofacil?.concurso){
        //     this.eventEmitter.emit('lotofacil.created', new LoteriaCreatedEvent(lotofacil));
        //    this.logger.log(`Inserindo no banco de dados, concurso ${lotofacil?.concurso}.`)
        // }
    }


    //  @Cron("*/15 21-23 * * 1,3,5")
    async crawlerSuperSete(){
        this.logger.warn("Running Cron job - Super Sete");

        // const lotofacilMongo: any = await this.lotofacilRepository.findLatest();
      
        const url = `${this.baseUrl}/lotofacil/resultado-super-sete.php?concurso=${342}`;
        const html = await (await firstValueFrom(this.http.get(url))).data;
        const scrapper = new SuperSeteSpyder(html);
        const supersete: Loteria = scrapper.start(); 
        console.log(supersete);
        
    
        // if (lotofacil && lotofacilMongo?.concurso < lotofacil?.concurso){
        //     this.eventEmitter.emit('lotofacil.created', new LoteriaCreatedEvent(lotofacil));
        //    this.logger.log(`Inserindo no banco de dados, concurso ${lotofacil?.concurso}.`)
        // }
    }
        

    // @Cron("*/15 21-23 * * 1,3,5")
    async crawlerDuplaSena(){
        this.logger.warn("Running Cron job - Dupla Sena");

        // const lotofacilMongo: any = await this.lotofacilRepository.findLatest();
    
        const url = `${this.baseUrl}/dupla-sena/resultado.php?concurso=${2479}`;
        const html = await (await firstValueFrom(this.http.get(url))).data;
        const scrapper = new DuplaSenaSpyder(html);
        const supersete: Loteria = scrapper.start(); 
        // console.log(supersete);
        
    
        // if (lotofacil && lotofacilMongo?.concurso < lotofacil?.concurso){
        //     this.eventEmitter.emit('lotofacil.created', new LoteriaCreatedEvent(lotofacil));
        //    this.logger.log(`Inserindo no banco de dados, concurso ${lotofacil?.concurso}.`)
        // }
    }

}
