import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { Lotomania, LotomaniaDocument } from "src/lottery/schemas/lotomania.schema";
import { LotteryRepository } from "../lottery.repository";




@Injectable()
export class MongoLotomaniaRepository implements LotteryRepository {

    constructor(@InjectModel(Lotomania.name) private lotomaniaModel: Model<LotomaniaDocument>) { }
        
    async create(lotomania: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.lotomaniaModel.create(lotomania);
        return loteria;
    }


    async findAll() {
        const values = await this.lotomaniaModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.lotomaniaModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });        
        return values
    }


    async findOne(concurso: number) {
        const resultLotomania = await this.lotomaniaModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultLotomania){
            return []
        }
        return resultLotomania;
    }


    async removeByConcurso(concurso: number) {
        const resultLotomania = await this.lotomaniaModel.deleteOne({ concurso: concurso});
        if(!resultLotomania){
            return []
        }
        return resultLotomania;
    }
}