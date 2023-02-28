import { Logger } from "@nestjs/common";
import { load } from "cheerio";
import { Loteria } from "../loteria.entity";




export class DiaDeSorteSpyder {
    private objLoteria: Loteria = {}
    private $: any;

    private readonly logger = new Logger(DiaDeSorteSpyder.name);
    

   constructor(html) {
    this.$ = load(html);
    }


    getMonthName(monthNumber: number): string{
        const date = new Date();
        date.setMonth(monthNumber - 1);      
        return date.toLocaleString('pt-BR', { month: "long" });
      }

    checkDezenasSorteio(){
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


    checkRateio(){
        try {           
            const rateio: boolean = this.$("div#res-c-3 div.res-acu").text().includes("RATEIO EM") ? true : false
            return rateio
        } catch (error) {
            this.logger.error(error);
        }
    }


    valuesDefault(): void{
        try {
            this.objLoteria.local = "SÃO PAULO, SP ESPAÇO DA SORTE";
            this.objLoteria.timeCoracao = "";
            this.objLoteria.loteria = "DIA_DE_SORTE";
            this.objLoteria.nome = "diadesorte";
        } catch (error) {
            this.logger.error(error);
        }
    }


    getConcurso(): void{
        try {
            const concurso = this.$("form h1")?.first()?.text()?.match(/\d{4}/g)[0];
            this.objLoteria.concurso = concurso ? parseInt(concurso) : 0
        } catch (error) {
            this.logger.error(error);
        }
    }

    getProxConcurso(): void{
        try {
            this.objLoteria.proxConcurso = this.objLoteria.concurso + 1
        } catch (error) {
            this.logger.error(error);
        }
    }

    checkAmumulou(): void{
        try {
            const re = /(7 Acertos)(\d+)/g
            let acumulou: boolean = false;
            const statusAcumulado = this.$("table.res-tb > tbody > tr > td").text();
            if (statusAcumulado){
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

    getDezenas(): void{
        try {
            const Dezenas = this.$("div.res-ns div.result-ct").first();
              Dezenas.each((index, element) => {
                const regex = /\d{2}/g;
                this.objLoteria.dezenas= this.$(element).children('span').text().match(regex);
              });
        } catch (error) {
            this.logger.error(error);
        }
    }


    getMonth(): void{
        try {
            const Dezenas = this.$("div.res-ns div.result-ct").first();
              Dezenas.each((index, element) => {
                const regex = /\d/g;
                this.objLoteria.mesSorte = this.getMonthName(parseInt(this.$(element).children('span.month').text()));
              });
        } catch (error) {
            this.logger.error(error);
        }
    }


    getDezenasByOrdemSorteio(): void{
        try {
            const Dezenas = this.$("div.result-ct").last();
              Dezenas.each((index, element) => {
                const regex = /\d{2}/g;
                this.objLoteria.dezenasOrdemSorteio= this.$(element).children('span').text().match(regex);
              });
        } catch (error) {
            this.logger.error(error);
        }
    }

    getPremiacoes(): void{
        try {
            let tablePremiacoes = []
            this.$("div#res-c-2 > table.res-tb > tbody > tr").each((index, element) => {
              if (index === 0) return true;
              const tds = this.$(element).find("td");
              const acertos = this.$(tds[0]).text();
              const ganhadores = this.$(tds[1]).text();
              const premio = this.$(tds[2]).text();
              const premiacoes = { acertos, ganhadores, premio };
              tablePremiacoes.push(premiacoes)
            });
            this.objLoteria.premiacoes = tablePremiacoes;
            
        } catch (error) {
            this.logger.error(error);
        }
    }

    getPremioPrxSorteio(): void{
        try {
            this.objLoteria.acumuladaProxConcurso = this.$("div#res-c-2 > div > span").text();
        } catch (error) {
            this.logger.error(error);
        }
    }

    getDateSorteioAndProxSorteio(): void{
        try {
            const dataSorteio = this.$("form h1").first().text().match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}")
            const dataProxSorteio = this.$("div#res-c-2 > div > b").text().match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}")
            if (dataProxSorteio.length !== 0){
                this.objLoteria.dataProxConcurso = dataProxSorteio[0]
            }
            if (dataSorteio.length !== 0){
                this.objLoteria.data = dataSorteio[0]
            }
        } catch (error) {
            this.logger.error(error);
        }
    }

    estadosPremiados(): void{
        try {
            const tableEstadosPremiacoes = []
        this.$("div#res-c-3 > table.res-tb.res-tb-win > tbody > tr").each((index, element) => {
          if (index === 0 || index == 1) return true;
          const tds = this.$(element).find("td");
          const uf = this.$(tds[0]).text();
          const cidade = this.$(tds[1]).text();
          const numeroGanhadores = this.$(tds[2]).text();
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
                this.getDezenas();
                this.getMonth();
                this.getConcurso();
                this.getDezenasByOrdemSorteio()
                this.getPremiacoes();
                this.getProxConcurso();
                this.checkAmumulou();
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