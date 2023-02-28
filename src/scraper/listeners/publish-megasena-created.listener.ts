import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoMegasenaRepository } from 'src/lottery/repositories/mongo/mongo.megasena.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishMegasenaCreatedListener {


  constructor(
    private megasenaModel: MongoMegasenaRepository,
  ) {}

  @OnEvent('megasena.created')
  async handleMegasenaCreated(event: LoteriaCreatedEvent) {
    try {      
      await this.megasenaModel.create(event.loteria)
    } catch (error) {
      console.log(error); 
    }
  }
}