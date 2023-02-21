import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { Megasena, MegaSenaDocument } from "src/lottery/schemas/mega-sena.schema";
import { LotteryRepository } from "../lottery.repository";



@Injectable()
export class MongoMegasenaRepository implements LotteryRepository {

    constructor(@InjectModel(Megasena.name) private megasenaModel: Model<MegaSenaDocument>) { }
        
    async create(megasena: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.megasenaModel.create(megasena);
        return loteria;
    }


    async findAll() {
        const values = await this.megasenaModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.megasenaModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }


    async findOne(concurso: number) {
        const resultMega = await this.megasenaModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultMega){
            return []
        }
        return resultMega;
    }

    async removeByConcurso(concurso: number) {
        const resultMega = await this.megasenaModel.deleteOne({ concurso: concurso});
        if(!resultMega){
            return []
        }
        return resultMega;
    }
}