import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { DuplaSena, DuplaSenaDocument } from "src/lottery/schemas/dupla-sena.schema";
import { LotteryRepository } from "../lottery.repository";




@Injectable()
export class MongoDulpaSenaRepository implements LotteryRepository {

    constructor(@InjectModel(DuplaSena.name) private duplasenaModel: Model<DuplaSenaDocument>) { }
        
    async create(duplasena: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.duplasenaModel.create(duplasena);
        return loteria;
    }


    async findAll() {
        const values = await this.duplasenaModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.duplasenaModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }


    async findOne(concurso: number) {
        const resultDuplasena = await this.duplasenaModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultDuplasena){
            return []
        }
        return resultDuplasena;
    }

    async removeByConcurso(concurso: number) {
        const resultDuplasena = await this.duplasenaModel.deleteOne({ concurso: concurso});
        if(!resultDuplasena){
            return []
        }
        return resultDuplasena;
    }
}