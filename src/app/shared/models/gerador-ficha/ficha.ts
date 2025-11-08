import { CampoPersonalizadoControleProducao, CamposFicha } from "./campo-personalizado-controle-producao";

export class Ficha {

    ordem: OrdemViewModel;
    abas: AbaViewModel[];
    grupos_apresentar_antes_abas: GrupoFichaViewModel[];
    grupos_apresentar_apos_abas: GrupoFichaViewModel[];
    ficha: FichaViewModel;
}

export class GrupoFichaViewModel {
    id: string;
    id_empresa: string;
    id_aba: string;
    descricao: string;
    ordem: number | undefined;
    campo_ficha: CamposFicha[];
    apresentar_apos_abas: boolean;
}

export class AbaViewModel {

    id: string;
    descricao: string;
    ordem: number;
    grupos_ficha: GrupoFichaViewModel[];
}

export class FichaViewModel {
    id:string;
    id_empresa:string;
    descricao:string;
    ficha_eh_criacao_ordem:boolean;
    id_categoria_equipamento:string;
    id_ficha_anterior:string;
    id_fila_inicial:string;
    id_status_fila_inicial:string;
}

export class OrdemViewModel{

    id:string;
    id_cliente:string;
    id_empresa:string;
    id_categoria_equipamento:string;
    numero_ordem:string;
    data_inicio:Date;
    data_fim:Date;
    tipo_ordem:string;  
    nome_cliente:string;
}