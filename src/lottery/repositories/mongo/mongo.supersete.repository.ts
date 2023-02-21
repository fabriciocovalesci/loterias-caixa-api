import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { SuperSete, SuperSeteDocument } from "src/lottery/schemas/super-sete.schema";
import { LotteryRepository } from "../lottery.repository";




@Injectable()
export class MongoSuperSeteRepository implements LotteryRepository {

    constructor(@InjectModel(SuperSete.name) private superseteModel: Model<SuperSeteDocument>) { }
        
    async create(supersete: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.superseteModel.create(supersete);
        return loteria;
    }


    async findAll() {
        const values = await this.superseteModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.superseteModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }


    async findOne(concurso: number) {
        const resultSuperseteModel = await this.superseteModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultSuperseteModel){
            return []
        }
        return resultSuperseteModel;
    }

    async removeByConcurso(concurso: number) {
        const resultSuperseteModel = await this.superseteModel.deleteOne({ concurso: concurso});
        if(!resultSuperseteModel){
            return []
        }
        return resultSuperseteModel;
    }
}