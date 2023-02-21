import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { Timemania, TimemaniaDocument } from "src/lottery/schemas/timemania.schema";
import { LotteryRepository } from "../lottery.repository";




@Injectable()
export class MongoTimemaniaRepository implements LotteryRepository {

    constructor(@InjectModel(Timemania.name) private timemaniaModel: Model<TimemaniaDocument>) { }
        
    async create(timemania: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.timemaniaModel.create(timemania);
        return loteria;
    }


    async findAll() {
        const values = await this.timemaniaModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.timemaniaModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }


    async findOne(concurso: number) {
        const resultTimemania = await this.timemaniaModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultTimemania){
            return []
        }
        return resultTimemania;
    }

    async removeByConcurso(concurso: number) {
        const resultTimemania = await this.timemaniaModel.deleteOne({ concurso: concurso});
        if(!resultTimemania){
            return []
        }
        return resultTimemania;
    }
}