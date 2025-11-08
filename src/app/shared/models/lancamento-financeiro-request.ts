import { AnexoLancamento } from "./financeiro/anexo";

export class LancamentoFinanceiroRequest {
    id_categoria_financeira: string;
    id_empresa: string;
    id_conta_bancaria: string;
    id_parceiro: string;
    descricao: string;
    data_vencimento: Date | string;
    valor: number;
    data_pagamento: Date | string;
    valor_pagamento: number;
    porcentagem_juros: number;
    valor_juros: number;
    porcentagem_multa: number;
    valor_multa: number;
    porcentagem_desconto: number;
    valor_desconto: number;
    id_meio_pagamento: string | null;
    descricao_meio_pagamento_outros: string | null;
    id_operacao: string | null;
    data_emissao: string | Date;
    numero_nota: string | null;
    observacao: string | null;
    tipo_parcelamento: number | null;
    quantidade_parcelas: number | null;
    anexos: AnexoLancamento[] | null;
    eh_protocolo: boolean;
    numero_ordem: string;
    id_centro_de_custo: string;
    lancamento_protestado: boolean;
}