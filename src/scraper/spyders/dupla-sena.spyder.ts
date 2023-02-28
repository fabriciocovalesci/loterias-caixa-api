import { Logger } from "@nestjs/common";
import { load } from "cheerio";
import { Loteria } from "../loteria.entity";




export class DuplaSenaSpyder {
    private objLoteria: Loteria = {}
    private $: any;

    private readonly logger = new Logger(DuplaSenaSpyder.name);


    constructor(html) {
        this.$ = load(html);
    }


    checkDezenasSorteio() {
        try {
            let sorteado: boolean = false;
            const dezenas = this.$("div#res-c-4 div.res-display div#result-ct").first()
            dezenas.each((index, element) => {
                sorteado = this.$(element).children('span.circle').text().includes("?")
            });
            return sorteado
        } catch (error) {
            this.logger.error(error);
        }
    }


    checkRateio() {
        try {
            const rateio: boolean = this.$("div#res-c-3 div.res-acu").text().includes("RATEIO EM") ? true : false
            return rateio
        } catch (error) {
            this.logger.error(error);
        }
    }


    valuesDefault(): void {
        try {
            this.objLoteria.local = "SÃO PAULO, SP ESPAÇO DA SORTE";
            this.objLoteria.loteria = "DUPLA_SENA";
            this.objLoteria.nome = "duplasena";
        } catch (error) {
            this.logger.error(error);
        }
    }


    getConcurso(): void {
        try {
            const concurso = this.$("form > h1")?.first()?.text()?.match(/\d{4}/g)[0];
            this.objLoteria.concurso = concurso ? parseInt(concurso) : 0
        } catch (error) {
            this.logger.error(error);
        }
    }

    getProxConcurso(): void {
        try {
            this.objLoteria.proxConcurso = this.objLoteria.concurso + 1
        } catch (error) {
            this.logger.error(error);
        }
    }

    checkAcumulou(): void {
        try {
            const re = /(6 Acertos)(\d+)/gi
            let acumulou: boolean = false;
            const statusAcumulado = this.$("div#res-c-2 > table.res-tb > tbody > tr > td").text();
            if (statusAcumulado) {
                const matches = re.exec(statusAcumulado);
                if (matches.length > 0) {
                    acumulou = true ? matches[2] === '0' : false;
                }
            }
            this.objLoteria.acumulou = acumulou
        } catch (error) {
            this.logger.error(error);
        }
    }

    getDezenasPrimeiroSorteio(): void {
        try {
            const Dezenas = this.$("div#res-c-1 div.lotoCt").first();
            Dezenas.each((index, element) => {
                const regex = /\d{2}/g;
                this.objLoteria.dezenas = this.$(element).find('span.lotoDz.lotoBg').text().match(regex);
            });
        } catch (error) {
            this.logger.error(error);
        }
    }


    getDezenasSegundoSoteio(): void {
        try {
            const Dezenas = this.$("div#res-c-1 div.lotoCt").last();
            Dezenas.each((index, element) => {
                const regex = /\d{2}/g;
                this.objLoteria.dezenasSegundoSorteio = this.$(element).find('span.lotoDz.lotoBg').text().match(regex);
            });
        } catch (error) {
            this.logger.error(error);
        }
    }


    nomeTimeCoracaoMesSorte(): void {
        try {
            const re = /(Time do Coração:)(\s+.)(.+)/gi
            const time = this.$("div#resultado-col-1 div.lotoCt").first();
            time.each((index, element) => {
                this.objLoteria.timeCoracao = re.exec(this.$(element).text())[3].match(/\w+/gi).join(",").replace(",", "/")
            });
        } catch (error) {
            this.logger.error(error);
        }
    }


    getDezenasByOrdemSorteio(): void {
        try {
            const Dezenas = this.$("div.res-ns");
            Dezenas.each((index, element) => {
                const regex = /\d{2}/g;
                // this.objLoteria.dezenasOrdemSorteio = this.$(element).find('span.circle').text().match(regex);
            });
        } catch (error) {
            this.logger.error(error);
        }
    }

    getPremiacoes(): void {
        try {
            const sorteio = [];
            this.$("div#res-c-2 > table > tbody > tr").each((index, element) => {
                if (index === 0) return;
                const tds = this.$(element).find("td");
                const acertos = this.$(tds[0]).text();
                const ganhadores = this.$(tds[1]).text();
                const premio = this.$(tds[2]).text();
                const faixa = (index > 5) ? (index - 1) : index;
                if (!acertos && !ganhadores && !premio) {
                    return;
                }
                const premiacoes = { acertos, ganhadores, premio, faixa };
                sorteio.push(premiacoes);
            });

            this.objLoteria.premiacoes = sorteio;

        } catch (error) {
            this.logger.error(error);
        }
    }

    getPremioPrxSorteio(): void {
        try {
            this.objLoteria.acumuladaProxConcurso = this.$("div#res-c-2 > div > span").text();
        } catch (error) {
            this.logger.error(error);
        }
    }

    getDateSorteioAndProxSorteio(): void {
        try {
            const dataSorteio = this.$("form > h1").first().text().match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
            const dataProxSorteio = this.$("div#res-c-2 > div").text().match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
            if (dataProxSorteio.length !== 0) {
                this.objLoteria.dataProxConcurso = dataProxSorteio[0]
            }
            if (dataSorteio.length !== 0) {
                this.objLoteria.data = dataSorteio[0]
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    estadosPremiados(): void {
        try {
            const tableEstadosPremiacoes = []
            this.$("div#res-c-3 > table.res-tb.res-tb-win > tbody > tr").each((index, element) => {
                if (index === 0 || index == 1) return true;
                const tds = this.$(element).find("td");
                const uf = this.$(tds[0]).text();
                const cidade = this.$(tds[1]).text();
                const numeroGanhadores = this.$(tds[2]).text();

                if (!uf && !cidade && !numeroGanhadores || uf === 'UF' && cidade === 'Cidade' && numeroGanhadores === 'Nº') return;

                const tableRow = { uf, cidade, numeroGanhadores };
                tableEstadosPremiacoes.push(tableRow)
            });

            this.objLoteria.estadosPremiados = tableEstadosPremiacoes;

        } catch (error) {
            this.logger.error(error);
        }
    }

    extract(): void {
        try {
            if (this.checkRateio() === true) {
                this.logger.debug("Resultado ainda não realizado!!");
            } else {
                this.logger.log("Resultado disponivel para extração!!");
                this.getDezenasPrimeiroSorteio();
                this.getDezenasSegundoSoteio();
                this.getConcurso();
                this.getDezenasByOrdemSorteio();
                this.getPremiacoes();
                this.getProxConcurso();
                this.checkAcumulou();
                this.getDateSorteioAndProxSorteio();
                this.getPremioPrxSorteio();
                this.estadosPremiados();
                this.valuesDefault();
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    start(): Loteria {
        try {
            this.extract();
            return this.objLoteria;
        } catch (error) {
            this.logger.error(error);
        }
    }
}