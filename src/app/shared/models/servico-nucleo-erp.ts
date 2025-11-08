export class ServicoNucleoErp {
    id_operacao: string;
    codigo: string;
    descricao: string;
    unidade_medida: string;
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
    imposto: Imposto | null;
    iss: ISS;
    deducao: Deducao | null;
    retencao: Retencao | null;

    constructor() {
        this.imposto = new Imposto();
        this.iss = new ISS();
        this.deducao = new Deducao();
        this.retencao = new Retencao();
    }
}

export class Imposto {
    codigo_tributacao_municipio: string | null;
    cnae: string | null;
    descricao: string | null;
    unidade_medida: string | null;
    quantidade: number | null;
    quantidade_horas: number | null;
    valor_unitario: number | null;
    valor_total: number | null;
    observacao: string | null;
    tributavel: number | null;
    responsavel_retencao: number | null;
    tributos_federais_retidos: number | null;
}

export  class ISS {
    tipo_tributacao_iss: string | null;
    exigibilidade_servico: string | null;
    retido: number | null;
    aliquota: number | null;
    valor: number | null;
    valor_retido: number | null;
    numero_processo_suspensao: number | null;
}

export  class Deducao {
    id_tipo_deducao: string | null;
    descricao: string | null;
    valor: number | null;
}

export  class Retencao {
    id_servico: string | null;
    tipo_retencao: number | null;
    aliquota: number | null;
    valor: number | null;
}