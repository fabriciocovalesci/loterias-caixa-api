
<p align="center">
  <img align="center" width="25%" src="https://user-images.githubusercontent.com/40548641/220343893-aae75004-3fcd-4c57-abc2-399909038fe1.jpg" alt="Logo loterias da caixa federal">
</p>

<h2 align="center">
  API Loterias CAIXA
</h2>

<p align="center">
  API contendo os resultados de jogos das <a href="https://loterias.caixa.gov.br/Paginas/default.aspx" target="_blank" alt="Link para site da caixa federal">Loterias Caixa Federal</a>
</p>
<p>
Pretendo melhorar a API com passar do tempo, atente-se com a versão que está sendo disponibilizada, pois algumas modificações podem ocorrer.
</p>

<h2 align="center">
  Loterias
</h2>

<p>
No momento estas são as loterias presentes no banco de dados:
</p>

```
[
"megasena",
"lotofacil",
"quina",
"lotomania",
"timemania",
"duplasena",
"diadesorte",
"supersete",
"maismilionaria"
]
```

<h2 align="center">
  Exemplos de retorno
</h2>

- **Resultado mais Recente**
``http://localhost:3000/v1/api/<loteria>/latest``

Exemplo Lotofácil:
[http://localhost:3000/v1/api/lotofacil/latest](http://localhost:3000/api/mega-sena/latest)

```
{
  "nome": "lotofacil",
  "loteria": "LOTOFACIL",
  "mesSorte": "",
  "concurso": 2744,
  "acumulou": false,
  "data": "18/02/2023",
  "acumuladaProxConcurso": "R$ 1.500.000,00",
  "dataProxConcurso": "22/02/2023",
  "local": "SÃO PAULO, SP ESPAÇO DA SORTE",
  "dezenas": [
    "01",
    "02",
    "03",
    "04",
    "06",
    "07",
    "08",
    "09",
    "11",
    "12",
    "15",
    "20",
    "21",
    "23",
    "25"
  ],
  "dezenasOrdemSorteio": [
    "04",
    "01",
    "23",
    "11",
    "12",
    "06",
    "21",
    "25",
    "07",
    "02",
    "20",
    "09",
    "08",
    "03",
    "15"
  ],
  "premiacoes": [
    {
      "acertos": "15 Acertos",
      "ganhadores": "1",
      "premio": "R$ 1.566.871,70"
    },
    {
      "acertos": "14 Acertos",
      "ganhadores": "167",
      "premio": "R$ 1.967,29"
    },
    {
      "acertos": "13 Acertos",
      "ganhadores": "8814",
      "premio": "R$ 25,00"
    },
    {
      "acertos": "12 Acertos",
      "ganhadores": "103380",
      "premio": "R$ 10,00"
    },
    {
      "acertos": "11 Acertos",
      "ganhadores": "636982",
      "premio": "R$ 5,00"
    }
  ],
  "estadosPremiados": [
    {
      "uf": "RO",
      "cidade": "PORTO VELHO",
      "numeroGanhadores": "1"
    }
  ],
  "proxConcurso": 2745,
  "timeCoracao": ""
}
```

- **Concurso  Específico**
`hhttp://localhost:3000/v1/api/<loteria>/<concurso>`

Mega-Sena, concurso 2565: [http://localhost:3000/v1/api/megasena/2565](http://localhost:3000/v1/api/lotofacil/2027)

```
{
  "nome": "megasena",
  "loteria": "MEGA_SENA",
  "mesSorte": "",
  "concurso": 2565,
  "acumulou": false,
  "data": "16/02/2023",
  "acumuladaProxConcurso": "R$ 3.000.000,00",
  "dataProxConcurso": "18/02/2023",
  "local": "SÃO PAULO, SP ESPAÇO DA SORTE",
  "dezenas": [
    "09",
    "13",
    "25",
    "39",
    "46",
    "54"
  ],
  "dezenasOrdemSorteio": [
    "54",
    "13",
    "25",
    "39",
    "09",
    "46"
  ],
  "premiacoes": [
    {
      "acertos": "6 Acertos",
      "ganhadores": "3",
      "premio": "R$ 17.626.625,69"
    },
    {
      "acertos": "5 Acertos",
      "ganhadores": "164",
      "premio": "R$ 24.367,94"
    },
    {
      "acertos": "4 Acertos",
      "ganhadores": "8245",
      "premio": "R$ 692,42"
    }
  ],
  "estadosPremiados": [
    {
      "uf": "MS",
      "cidade": "CAMPO GRANDE",
      "numeroGanhadores": "1"
    },
    {
      "uf": "PA",
      "cidade": "BELEM",
      "numeroGanhadores": "1"
    },
    {
      "uf": "PR",
      "cidade": "PARANAGUA",
      "numeroGanhadores": "1"
    }
  ],
  "proxConcurso": 2566,
  "timeCoracao": ""
}
```

<h2 align="center">
  Documentação API
</h2>

<p>
Outras informações que desejar, pode ser encontrada na documentação.
</p>

<h2 align="center">
  Contribuição
</h2>

Este é um projeto **Opensource**, qualquer contribuição é bem vinda, sendo relatando bugs, ou sugerindo melhorias.

**Não esqueça de dar uma estrela :star: para o projeto, assim ele se torna mais visivel para outras pessoas**

A API foi desenvolvida em [Nestjs](https://nestjs.com/), com banco de dados [MongoDB](https://www.mongodb.com/pt-br).
