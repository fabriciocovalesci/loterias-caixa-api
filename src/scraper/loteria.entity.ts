

interface estadosPremiados {
    uf: string; 
    cidade: string; 
    numeroGanhadores: string;
}


interface Premiacao {
    acertos: string;
    ganhadores: string;
    premio: string;
    faixa?: number;
}

export interface Loteria {
    createAt?: Date | string;
    acumuladaProxConcurso?: string;
    acumulou?: boolean;
    concurso?: number;
    data?: string;
    dataProxConcurso?: string;
    dezenas?: string[];
    dezenasSegundoSorteio?: string[];
    dezenasOrdemSorteio?: string[];
    trevosSorteados?: string[];
    estadosPremiados?: estadosPremiados[];
    local?: string;
    loteria?: string;
    mesSorte?: string;
    nome?: string;
    premiacoes?: Premiacao[];
    proxConcurso?: number;
    timeCoracao?: string;
}