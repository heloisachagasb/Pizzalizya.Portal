export class ParceiroCRM {

    id: string;
    codigo: number;
    nome_fantasia: string;
    razao_social: string;
    cpf_cnpj: string;
    id_empresa: string;
    id_status: number;
    id_vendedor_responsavel: string;
    vendedor_responsavel: string;
    id_tipo_proxima_tarefa: number;
    tipo_proxima_tarefa: string;
    data_proxima_tarefa: Date | undefined;
    quantidade_pedidos_ativos: number;
}