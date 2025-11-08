export class AdicionarOportunidadeRequest {

    cpf_cnpj: string;
    razao_social: string;
    nome_fantasia: string;
    id_funil_vendas: string | undefined;
    id_etapa_funil_venda: string | undefined;
    id_vendedor_responsavel: string | undefined;
    oportunidade: DadosOportunidadeRequest | undefined;
}


export class DadosOportunidadeRequest {
    id_tipo_oportunidade_negocio: string;
    descricao: string;
    observacao: string;
    contato: string;
    email: string;
    valor: Number | undefined;
    campo_adicional_1: string;
    campo_adicional_2: string;
    campo_adicional_3: string;
    campo_adicional_4: string;
    campo_adicional_5: string;
    campo_adicional_6: string;
    campo_adicional_7: string;
    campo_adicional_8: string;
    campo_adicional_9: string;
    campo_adicional_10: string;
    id_usuario_criacao: string | undefined;
    nome_usuario_criacao: string ;  
    data_criacao: Date | undefined ;  
}