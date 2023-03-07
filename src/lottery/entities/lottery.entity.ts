import { ApiProperty } from "@nestjs/swagger";


interface estadosPremiados {
    uf: string; 
    cidade: string; 
    numeroGanhadores: string;
}

interface Premiacoes {
    acertos: string;
    ganhadores: string;
    premio: string;
    faixa?: number;
}

export class Lottery {
    @ApiProperty({
        description: "Data da inserção do objeto"
    })
    createAt?: Date | string;
    
    @ApiProperty()
    acumuladaProxConcurso?: string;

    @ApiProperty()
    acumulou?: boolean;

    @ApiProperty()
    concurso?: number;

    @ApiProperty()
    data?: string;

    @ApiProperty()
    dataProxConcurso?: string;

    @ApiProperty()
    dezenas?: string[];

    @ApiProperty()
    dezenasOrdemSorteio?: string[];

    @ApiProperty()
    trevosSorteados?: string[];

    @ApiProperty()
    estadosPremiados?: estadosPremiados[];

    @ApiProperty()
    local?: string;

    @ApiProperty()
    loteria?: string;

    @ApiProperty()
    mesSorte?: string;

    @ApiProperty()
    nome?: string;

    @ApiProperty()
    premiacoes?: Premiacoes[];

    @ApiProperty()
    proxConcurso?: number

    @ApiProperty()
    timeCoracao?: string;
}

