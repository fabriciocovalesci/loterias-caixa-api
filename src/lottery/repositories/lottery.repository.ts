import { CreateLotteryDto } from "../dto/create-lottery.dto";



export abstract class LotteryRepository {
     
    abstract create(lottery: CreateLotteryDto): Promise<CreateLotteryDto>;
    abstract findAll(): object;
    abstract findLatest(): object;
    abstract findOne(concurso: number): object;
    abstract removeByConcurso(concurso: number): any;
}