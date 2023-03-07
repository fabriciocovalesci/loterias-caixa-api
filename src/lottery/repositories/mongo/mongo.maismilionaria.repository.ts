import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { MaisMilionaria, MaisMilionariaDocument } from "src/lottery/schemas/mais-milionaria.schema";

import { LotteryRepository } from "../lottery.repository";




@Injectable()
export class MongoMaisMilionariaRepository implements LotteryRepository {

    constructor(@InjectModel(MaisMilionaria.name) private maismilionariaModel: Model<MaisMilionariaDocument>) { }
        
    async create(maismilionaria: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.maismilionariaModel.create(maismilionaria);
        return loteria;
    }


    async findAll() {
        const values = await this.maismilionariaModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.maismilionariaModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }


    async findOne(concurso: number) {
        const resultDiadesorte = await this.maismilionariaModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultDiadesorte){
            return []
        }
        return resultDiadesorte;
    }

    async removeByConcurso(concurso: number) {
        const resultDiadesorte = await this.maismilionariaModel.deleteOne({ concurso: concurso});
        if(!resultDiadesorte){
            return []
        }
        return resultDiadesorte;
    }
}