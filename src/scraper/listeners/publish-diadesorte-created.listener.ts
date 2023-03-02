import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MongoDiaDeSorteRepository } from 'src/lottery/repositories/mongo/mongo.diadesorte.repository';
import { LoteriaCreatedEvent } from '../events/loteria-created.event';




@Injectable()
export class PublishDiaDeSorteScraperCreatedListener {


  constructor(
    private diadesorteRepository: MongoDiaDeSorteRepository,
  ) {}

  @OnEvent('diadesorte.created')
  async handleDiaDeSorteCreated(event: LoteriaCreatedEvent) {
    try {
      await this.diadesorteRepository.create(event.loteria)          
    } catch (error) {
      console.log(error); 
    }
  }
}