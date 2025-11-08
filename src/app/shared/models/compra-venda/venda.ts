export class VendaEntity {
    id: string;
    codigo: number;
    id_cliente: string;
    id_empresa: string;
    status: string;
    id_usuario_responsavel: string;
    data_criacao: string;
    data_finalizacao: string | null;
    numero_pedido_compra: string;
    numero_item_pedido_compra: string;
    descricao: string;
    observacao: string;
    gerar_nota_venda: number;
    gerar_nota_servico: number;
    realizar_movimentacao_estoque: boolean;
    numero_orcamento: number;
    numero_revisao_orcamento: number;
    valor_custo: number;
    valor_venda: number;
    porcentagem_desconto: number;
    valor_desconto: number;
    porcentagem_comissao_venda: number;
    valor_comissao_venda: number;
    prazo_garantia: string;
    prazo_entrega: string;
    id_orcamento: string;
}

enum StatusVenda {
    EM_DIGITACAO = 1,
    FINALIZADA = 2,
    CANCELADA = 3
}

enum StatusOrcamento {
    ENVIAR_AO_CLIENTE = 1,
    AGUARDANDO_APROVACAO = 2,
    APROVADO = 3,
    NÃO_APROVADO = 4,
    VENDA_REALIZADA = 5
}