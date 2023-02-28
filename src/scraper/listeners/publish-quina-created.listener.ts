import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoQuinaRepository } from 'src/lottery/repositories/mongo/mongo.quina.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishQuinaCreatedListener {


  constructor(
    private quinaModel: MongoQuinaRepository,
  ) {}

  @OnEvent('quina.created')
  async handleQuinaCreated(event: LoteriaCreatedEvent) {
    try {
      await this.quinaModel.create(event.loteria)
    } catch (error) {
      console.log(error); 
    }
  }
}