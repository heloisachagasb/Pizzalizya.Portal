import { ObterServicoResponse } from "../../cadastros-shared/models/servicos/response/obter-servico.response";
import { AlterarValorCampoPersonalizadoRequest } from "../gerador-ficha/requests/alterar-valor-campo-personalizado.request";

export class ServicoNucleo {
    id: string | undefined;
    id_operacao: string | null;
    codigo: string;
    descricao: string;
    unidade_medida: string;
    quantidade: number;
    quantidade_horas: number;
    valor_unitario: number;
    valor_total: number;
    valor_desconto: number;
    observacao: string;
    imposto: Imposto;
    iss: ISS;
    deducao: Deducao;
    retencao: Retencao;
    status: number | undefined;
    valor_campos_personalizados: AlterarValorCampoPersonalizadoRequest[] = [];

    imposto_esta_preenchido: boolean;
    selecionado_para_aprovar_cotacao: boolean;

    constructor() {
        this.imposto = new Imposto();
        this.iss = new ISS();
        this.deducao = new Deducao();
        this.retencao = new Retencao();
    }

    criarBaseadoServicoCadastrado(servico: ObterServicoResponse){
        
        this.descricao = servico.descricao;
        this.quantidade = 1;
        this.valor_total = this.valor_unitario;

        this.imposto.criarBaseadoServicoCadastrado(servico);
        this.iss.criarBaseadoServicoCadastrado(servico);
        this.deducao.criarBaseadoServicoCadastrado(servico);
        this.retencao.criarBaseadoServicoCadastrado(servico);
    }
}

class Imposto {
    codigo_tributacao_municipio: string | undefined;
    cnae: string | undefined;
    descricao: string | undefined;
    unidade_medida: string;
    quantidade: number;
    quantidade_horas: number;
    valor_unitario: number;
    valor_total: number;
    observacao: string | undefined;
    tributavel: number;
    responsavel_retencao: number;
    tributos_federais_retidos: number;

    criarBaseadoServicoCadastrado(servico: ObterServicoResponse){
        
        this.cnae = servico.cnae;        
        
        this.codigo_tributacao_municipio = servico.imposto.codigo_tributacao_municipio;

        this.descricao= servico.imposto.descricao;
        
        this.observacao= servico.imposto.observacao
        this.tributavel = servico.imposto.tributavel ? 1 : 0
        this.responsavel_retencao = servico.imposto.responsavel_retencao ? servico.imposto.responsavel_retencao : 0;
        this.tributos_federais_retidos = servico.imposto.tributos_federais_retidos ? servico.imposto.tributos_federais_retidos : 0;
    }
}

class ISS {
    id_tipo_tributacao_iss: string | undefined;
    id_exigibilidade_servico: string | undefined; 
    retido: number;
    aliquota: number;
    valor: number;
    valor_retido: number;
    cnae: string | undefined;

    criarBaseadoServicoCadastrado(servico: ObterServicoResponse){
        
        this.cnae = servico.cnae;        
        
        this.id_tipo_tributacao_iss = servico.iss.id_tipo_tributacao_iss;

        this.id_exigibilidade_servico = servico.iss.id_exigibilidade_servico;
    }
}

class Deducao {
    id_tipo_deducao: string;
    descricao: string;
    valor: number;

    criarBaseadoServicoCadastrado(servico: ObterServicoResponse){
        
        this.id_tipo_deducao = servico.deducao.id;
    }
}

class Retencao {
    id_servico: string;
    tipo_retencao: number;
    aliquota: number;
    valor: number;

    criarBaseadoServicoCadastrado(servico: ObterServicoResponse){
        
        this.id_servico = servico.id;
        this.tipo_retencao = servico.retencao.tipo_retencao ? servico.retencao.tipo_retencao : 1;
        this.aliquota = servico.retencao.aliquota ? servico.retencao.aliquota : 0;
    }
}

export enum StatusServicos {
    AGUARDANDO_SUPRIMENTOS = 1,
    SOLICITADO_COTACAO,
    AGUARDANDO_FORNECEDOR,
    SOLICITADO_COMPRA,
    FINALIZADO
}