export class CondicaoPagamento{
    id:string;
    id_empresa: string;
    descricao: string;
    parcelas: ParcelaCondicaoPagamento[];

    constructor(){
        this.parcelas = [];
    }

    obterPercentualRestanteParcelas(): number{
        let quantidadeTotalDisponivel = 100;

        this.parcelas.forEach(parcela => {
            quantidadeTotalDisponivel -= parcela.percentual;
        })

        return quantidadeTotalDisponivel;
    }
}

export class ParcelaCondicaoPagamento{
    id: string;
    id_condicao_pagamento: string;
    percentual: number;
    prazo: number;

    parcela_foi_alterada_manualmente: boolean;
}