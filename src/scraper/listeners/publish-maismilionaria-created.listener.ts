import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoMaisMilionariaRepository } from 'src/lottery/repositories/mongo/mongo.maismilionaria.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishMaisMilionariaScraperCreatedListener {


  constructor(
    private maismilionariaRepository: MongoMaisMilionariaRepository,
  ) {}

  @OnEvent('maismilionaria.created')
  async handleDiaDeSorteCreated(event: LoteriaCreatedEvent) {
    try {
      await this.maismilionariaRepository.create(event.loteria);       
    } catch (error) {
      console.log(error); 
    }
  }
}