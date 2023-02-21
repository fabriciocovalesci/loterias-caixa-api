import { LotteryEnum } from "../config/lottery.enum";



export const validatorParamsLottery = (lottery: string): string | object => {

    const lottery_key = Object.entries(LotteryEnum).find((element) => {
        if (element[1] === lottery) return element[0];
        return false;
    });

    if (!lottery_key) return { message: `Loteria ${lottery} not found!` };

    return lottery_key
}

