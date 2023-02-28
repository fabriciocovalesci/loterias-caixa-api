import { Logger } from "@nestjs/common";
import { load } from "cheerio";
import { Loteria } from "../loteria.entity";



export class QuinaSpyder {
    private objLoteria: Loteria = {};
    private $: any;

    private readonly logger = new Logger(QuinaSpyder.name);
    

   constructor(html) {
    this.$ = load(html);
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
            this.objLoteria.mesSorte = "";
            this.objLoteria.timeCoracao = "";
            this.objLoteria.loteria = "QUINA";
            this.objLoteria.nome = "quina";
        } catch (error) {
            console.error(error);
        }
    }


    getConcurso(): void{
        try {
            const concurso = this.$("form h1")?.first()?.text()?.match(/\d{4}/g)[0];           
            this.objLoteria.concurso = concurso ? parseInt(concurso) : 0            
        } catch (error) {
            console.error(error);
        }
    }

    getProxConcurso(): void{
        try {
            this.objLoteria.proxConcurso = this.objLoteria.concurso + 1
        } catch (error) {
            console.error(error);
        }
    }

    checkAmumulou(): void{
        try {
            const statusAcumulado = this.$("div#res-c-3 > div.res-acu").text()?.includes("ACUMULOU");
            this.objLoteria.acumulou = true ? statusAcumulado : false;
        } catch (error) {
            console.error(error);
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
            console.error(error);
        }
    }

    getDezenasByOrdemSorteio(): void{
        try {
            const Dezenas = this.$("div.res-ns div.result-ct").last();
              Dezenas.each((index, element) => {
                const regex = /\d{2}/g;
                this.objLoteria.dezenasOrdemSorteio= this.$(element).children('span').text().match(regex);
              });
        } catch (error) {
            console.error(error);
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
            console.error(error);
        }
    }

    getPremioPrxSorteio(): void{
        try {
            this.objLoteria.acumuladaProxConcurso = this.$("div#res-c-2 > div > span").text();
        } catch (error) {
            console.error(error);
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
            console.error(error);
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
            console.error(error);
        }
    }

    extract(): void{
        try {
            if (this.checkRateio() === true) {
                this.logger.debug("Resultado ainda não realizado!!");
            } else {
                this.logger.log("Resultado disponivel para extração!!");
                this.getConcurso();
                this.getDezenas();
                this.getDezenasByOrdemSorteio()
                this.getPremiacoes();
                this.getProxConcurso();
                this.checkAmumulou();
                this.getDateSorteioAndProxSorteio();
                this.getPremioPrxSorteio();
                this.estadosPremiados();
                this.valuesDefault()
            }
        } catch (error) {
            console.error(error);
            
        }
    }

    start(): Loteria {
        try {
            this.extract();            
            return this.objLoteria;
        } catch (error) {
            console.error(error);   
        }
    }
}