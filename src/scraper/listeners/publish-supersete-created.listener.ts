import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoSuperSeteRepository } from 'src/lottery/repositories/mongo/mongo.supersete.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishSuperSeteScraperCreatedListener {


  constructor(
    private superseteRepository: MongoSuperSeteRepository,
  ) {}

  @OnEvent('supersete.created')
  async handleSuperSeteCreated(event: LoteriaCreatedEvent) {
    try {
      await this.superseteRepository.create(event.loteria);      
    } catch (error) {
      console.log(error); 
    }
  }
}