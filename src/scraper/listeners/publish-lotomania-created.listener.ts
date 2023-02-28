import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoLotomaniaRepository } from 'src/lottery/repositories/mongo/mongo.lotomania.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishLotomaniaCreatedListener {

  constructor(
    private lotomaniaModel: MongoLotomaniaRepository,
  ) {}

  @OnEvent('lotomania.created')
  async handleLotomaniaCreated(event: LoteriaCreatedEvent) {
    try {
      await this.lotomaniaModel.create(event.loteria);
    } catch (error) { 
    }
  }
}