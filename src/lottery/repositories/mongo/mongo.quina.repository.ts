import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { Quina, QuinaDocument } from "src/lottery/schemas/quina.schema";
import { LotteryRepository } from "../lottery.repository";




@Injectable()
export class MongoQuinaRepository implements LotteryRepository {

    constructor(@InjectModel(Quina.name) private quinaModel: Model<QuinaDocument>) { }
        
    async create(quina: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.quinaModel.create(quina);
        return loteria;
    }


    async findAll() {
        const values = await this.quinaModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.quinaModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }


    async findOne(concurso: number) {
        const resultLotofacil = await this.quinaModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultLotofacil){
            return []
        }
        return resultLotofacil;
    }

    async removeByConcurso(concurso: number) {
        const resultQuina= await this.quinaModel.deleteOne({ concurso: concurso});
        if(!resultQuina){
            return []
        }
        return resultQuina;
    }
}