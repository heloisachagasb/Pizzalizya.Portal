import { Produto } from "../cadastros-shared/models/produtos/produto";

export class ProdutoSituacaoTributaria extends Produto {

    unidade_medida: string;
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
    observacao: string;
}