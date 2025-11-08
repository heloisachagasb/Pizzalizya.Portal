export class PagamentoLancamentoFinanceiro{
    valor : number;
    juros : number;
    multa : number;
    data_vencimento: Date;

    constructor(valor: number, juros: number, multa: number, dataVencimento: Date) {
        this.valor = valor;
        this.juros = juros;
        this.multa = multa;
        this.data_vencimento = dataVencimento;
    }
}