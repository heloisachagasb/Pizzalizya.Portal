import { ValorCampoFicha } from "../valor-campo-ficha";

export class CriarOrdemRequest{
    id_cliente: string;
    id_empresa: string;
    id_categoria_equipamento: string;
    numero_ordem: string;
    data_inicio: Date;
    tipo_ordem: string;
    nome_cliente: string;
    id_fila_inicial: string;
    id_status_fila_inicial: string;
    valor_campo_ficha: ValorCampoFicha[];
}