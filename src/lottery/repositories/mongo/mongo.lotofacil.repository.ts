import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateLotteryDto } from "src/lottery/dto/create-lottery.dto";
import { Lotofacil, LotofacilDocument } from "src/lottery/schemas/lotofacil.schema";
import { LotteryRepository } from "../lottery.repository";


@Injectable()
export class MongoLotofacilRepository implements LotteryRepository {

    constructor(
    @InjectModel(Lotofacil.name)
    private lotofacilModel: Model<LotofacilDocument>,
    ) { }
        
    async create(lotofacil: CreateLotteryDto): Promise<CreateLotteryDto> {
        const loteria = await this.lotofacilModel.create(lotofacil);
        return loteria;
    }


    async findAll(): Promise<any> {
        const values = await this.lotofacilModel.find({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }

    
   async findLatest() {
        const values = await this.lotofacilModel.findOne({}, { _id: false, __v: false }).sort({ concurso: -1 });
        return values
    }


    async findOne(concurso: number) {
        const resultLotofacil = await this.lotofacilModel.findOne({ concurso: concurso}, { _id: false, __v: false });
        if(!resultLotofacil){
            return []
        }
        return resultLotofacil;
    }

    async removeByConcurso(concurso: number) {
        const resultLotofacil = await this.lotofacilModel.deleteOne({ concurso: concurso});
        if(!resultLotofacil){
            return []
        }
        return resultLotofacil;
    }
}