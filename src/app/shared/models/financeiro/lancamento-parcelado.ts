import { LancamentoFinanceiro } from "../lancamento-financeiro";
import { Parcelamento } from "./lancamento-personalizado";

export class LancamentoParcelado {
    tipo_parcelamento: number;
    quantidade_parcelas: number;
    lancamento_financeiro: LancamentoFinanceiro;
    parcelamento: Parcelamento[];
    emitir_para_todos_lancamentos: boolean;
    questionar_se_deseja_emitir_para_todos_lancamentos: boolean;
    
    constructor() {
        this.lancamento_financeiro = new LancamentoFinanceiro();
    }
}
