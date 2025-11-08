import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from '../../../shared/base.service';
import { Pedido } from '../model/pedido';
import { TipoPagamento } from '../model/tipo-pagamento';
import { TipoItem } from '../model/tipo-item';

@Injectable({
    providedIn: 'root'
})
export class PedidoService extends BaseService {

    constructor(private http: HttpClient, private router2: Router) {
        super(router2);
    }

    obterPedidos(): Observable<Pedido[]> {
        const pedidos: Pedido[] = [
            {
                data_pedido: '2025-11-08',
                cliente: {
                    nome: 'João Silva',
                    cpf: 12345678901,
                    endereco: {
                        rua: 'Rua das Flores',
                        numero: 123,
                        cep: 12345678,
                        bairro: 'Centro',
                        cidade: 'São Paulo',
                        estado: 'SP'
                    }
                },
                valor_pedido: 89.90,
                metodo_pagamento: TipoPagamento.pix,
                delivery: true,
                itens_pedido: [
                    {
                        nome_item: 'Pizza Grande de Calabresa',
                        tipo_item: TipoItem.pizza_grande,
                        valor_unitario: 59.90,
                        quantidade: 1
                    },
                    {
                        nome_item: 'Refrigerante 2L',
                        tipo_item: TipoItem.bebida,
                        valor_unitario: 30.00,
                        quantidade: 1
                    }
                ]
            },
            {
                data_pedido: '2025-11-07',
                cliente: {
                    nome: 'Maria Oliveira',
                    cpf: 98765432100,
                    endereco: {
                        rua: 'Avenida Brasil',
                        numero: 456,
                        cep: 87654321,
                        bairro: 'Jardins',
                        cidade: 'Rio de Janeiro',
                        estado: 'RJ'
                    }
                },
                valor_pedido: 49.90,
                metodo_pagamento: TipoPagamento.dinheiro,
                delivery: false,
                itens_pedido: [
                    {
                        nome_item: 'Esfirra de Carne',
                        tipo_item: TipoItem.esfirra,
                        valor_unitario: 7.50,
                        quantidade: 2
                    },
                    {
                        nome_item: 'Sobremesa Chocolate',
                        tipo_item: TipoItem.sobremesa,
                        valor_unitario: 34.90,
                        quantidade: 1
                    }
                ]
            }
        ];

        return of(pedidos);
    }
}