import { Loteria } from "../loteria.entity";



export class LoteriaCreatedEvent {
  constructor(public loteria: Loteria) {}
}