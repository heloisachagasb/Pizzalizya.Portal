export class OrdensAbertasVersatronicmotoresResponse {
    id_ordem: number;
    id_ordem_lizy: string;
    numero_ordem: string;
    fabricante: string;
    modelo: string;
    vendedor_responsavel: string;
    referencia_cliente: string;
    valor: number;
    setor: string;
    status: string;
    numero_serie_equipamento: string;
    numero_nota_saida: string;
    data_entrada: Date;
    data_fim: Date | undefined;
    id_tipo_fila: string;
    id_fila: string;
    data_envio_orcamento: Date | undefined;
    data_prevista_entrega: Date | undefined;
    potencia: string;
    rpm: string;
}

export class OrdensClienteVersatronicmotoresResponse {
    ordens: OrdensAbertasVersatronicmotoresResponse[];
}