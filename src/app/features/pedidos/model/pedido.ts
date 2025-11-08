import { Cliente } from "./cliente";
import { Item } from "./item";
import { TipoPagamento } from "./tipo-pagamento";

export class Pedido {
    data_pedido: string;
    cliente: Cliente;
    valor_pedido: number;
    metodo_pagamento: TipoPagamento;
    itens_pedido: Item[];
    delivery: boolean;
}