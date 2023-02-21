import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { DiaDeSorte, DiaDeSorteDocument } from "src/lottery/schemas/dia-de-sorte.schema";

import { LotteryRepository } from "../lottery.repository";




@Injectable()
export class MongoDiaDeSorteRepository implements LotteryRepository {

    constructor(@InjectModel(DiaDeSorte.name) private diadesorteModel: Model<DiaDeSorteDocument>) { }
        
    async create(diadesorte: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.diadesorteModel.create(diadesorte);
        return loteria;
    }


    async findAll() {
        const values = await this.diadesorteModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.diadesorteModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }


    async findOne(concurso: number) {
        const resultDiadesorte = await this.diadesorteModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultDiadesorte){
            return []
        }
        return resultDiadesorte;
    }

    async removeByConcurso(concurso: number) {
        const resultDiadesorte = await this.diadesorteModel.deleteOne({ concurso: concurso});
        if(!resultDiadesorte){
            return []
        }
        return resultDiadesorte;
    }
}