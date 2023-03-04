import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoDulpaSenaRepository } from 'src/lottery/repositories/mongo/mongo.duplasena.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishDuplaSenaScraperCreatedListener {


  constructor(
    private duplasenaRepository: MongoDulpaSenaRepository,
  ) {}

  @OnEvent('duplasena.created')
  async handleDuplaSenaCreated(event: LoteriaCreatedEvent) {
    try {
      await this.duplasenaRepository.create(event.loteria);
    } catch (error) {
      console.log(error); 
    }
  }
}