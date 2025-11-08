import { LancamentoFinanceiro } from "../lancamento-financeiro";

export class LancamentoPersonalizado {
    dias_entre_lancamentos: number[];
    lancamento_financeiro: LancamentoFinanceiro;
    parcelamento: Parcelamento[];
}

export class Parcelamento {
    data_vencimento: Date;
    valor_parcela: number;
    valor_parcela_1: number;

    constructor(data_vencimento: Date, valor_parcela: number) {
        this.data_vencimento = data_vencimento;
        this.valor_parcela = valor_parcela;
    }

    get data_vencimento_string(): string {
        // Formata a data para string no formato dd/MM/yyyy

            return this.data_vencimento.toLocaleDateString('pt-BR');
    }

    set data_vencimento_string(valor: string) {
        // Converte a string de volta para o objeto Date
        const [dia, mes, ano] = valor.split('/').map(Number);
    
        // Verifica se o ano tem 4 dígitos. Se não, pode optar por não definir a data
        if (!ano || ano.toString().length !== 4) {
            return;
        }
    
        this.data_vencimento = new Date(ano, mes - 1, dia);
    
        // Verifique se a data é válida
        if (isNaN(this.data_vencimento.getTime())) {
            // Lidar com data inválida, talvez definindo this.data_vencimento para null ou uma data padrão
        }
    }
}