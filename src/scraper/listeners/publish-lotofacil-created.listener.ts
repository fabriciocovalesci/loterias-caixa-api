import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoLotofacilRepository } from 'src/lottery/repositories/mongo/mongo.lotofacil.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishLotofacilScraperCreatedListener {


  constructor(
    private lotofacilRepository: MongoLotofacilRepository,
  ) {}

  @OnEvent('lotofacil.created')
  async handleLotofacilCreated(event: LoteriaCreatedEvent) {
    try {
      await this.lotofacilRepository.create(event.loteria)
    } catch (error) {
      console.log(error); 
    }
  }
}