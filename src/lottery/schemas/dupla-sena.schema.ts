import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DuplaSenaDocument = HydratedDocument<DuplaSena>;

@Schema()
export class DuplaSena {

  @Prop()
  nome: string;

  @Prop()
  loteria: string;

  @Prop()
  mesSorte: string;

  @Prop()
  concurso: number;

  @Prop()
  acumulou: boolean;

  @Prop()
  data: string;

  @Prop()
  acumuladaProxConcurso: string;

  @Prop()
  dataProxConcurso: string;

  @Prop()
  local: string;

  @Prop([String])
  dezenas: string[];

  @Prop([String])
  dezenasOrdemSorteio: string[];

  @Prop([Object])
  premiacoes: [];

  @Prop([Object])
  estadosPremiados: [];

  @Prop()
  proxConcurso: number;

  @Prop()
  timeCoracao: string;

  @Prop()
  createAt: Date;
}

export const DuplaSenaSchema = SchemaFactory.createForClass(DuplaSena);
