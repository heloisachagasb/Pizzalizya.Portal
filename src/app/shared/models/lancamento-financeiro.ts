import { AnexoLancamento } from "./financeiro/anexo";

export class LancamentoFinanceiro {
    id_categoria_financeira: string;
    id_empresa: string;
    id_conta_bancaria: string;
    id_parceiro: string;
    descricao: string;
    data_vencimento: Date | null;
    valor: number;
    data_pagamento: Date | null;
    valor_pagamento: number | null;
    porcentagem_juros: number | null;
    valor_juros: number | null;
    porcentagem_multa: number | null;
    valor_multa: number | null;
    porcentagem_desconto: number | null;
    valor_desconto: number | null;
    id: string;
    descricao_tipo_lancamento: string;
    tipo_lancamento: string;
    tipo_parcelamento: number | null;
    quantidade_parcelas: number | null;
    anexos: AnexoLancamento[]
}