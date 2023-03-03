import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoTimemaniaRepository } from 'src/lottery/repositories/mongo/mongo.timemania.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishTimemaniaScraperCreatedListener {


  constructor(
    private timemaniaRepository: MongoTimemaniaRepository,
  ) {}

  @OnEvent('timemania.created')
  async handleTimemaniaCreated(event: LoteriaCreatedEvent) {
    try {
      await this.timemaniaRepository.create(event.loteria);            
    } catch (error) {
      console.log(error); 
    }
  }
}