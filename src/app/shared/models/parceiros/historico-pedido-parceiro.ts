export class HistoricoPedidoParceiro {
    id: string;
    codigo:string;
    dados: string;
    status: string;
    valor: number;
    observacoes:string;
    id_referencia: string;

    eh_ordem_servico: boolean;
    eh_orcamento: boolean;
    alterando_data_prevista: boolean;

    data_prevista_aprovacao: Date;
    data_prevista_aprovacao_string: string;

    constructor(id: string, codigo: string, dados: string, status: string, valor: number, observacoes: string) {
        this.id = id;
        this.codigo = codigo;
        this.dados = dados;
        this.status = status;
        this.valor = valor;
        this.observacoes = observacoes;
    }
}