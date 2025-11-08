export interface CampoPersonalizadoControleProducao{

    id: string;
    id_empresa: string;
    descricao: string;
    ordem: string;
    campo_ficha: CamposFicha[];
}

export interface CamposFicha {
    id: string;
    id_grupo_ficha: string;
    tipo_campo: number | null;
    descricao: string;
    ordem: number | null;
    quantidade_colunas: number | null;
    classe_campo: string;
    classe_div: string;
    on_blur_event: string;
    on_click_event: string;
    on_change_event: string;
    descricao_para_relatorio: string;
    eh_checkbox: boolean;
    valor_texto: string | null;
    valor_bit: string | null;
}