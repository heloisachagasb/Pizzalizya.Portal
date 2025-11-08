import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../model/pedido';
import { PedidoService } from '../../services/pedidos.service';
import { Endereco } from '../../model/endereco';

@Component({
  selector: 'app-pedidos-page',
  templateUrl: './pedidos-page.component.html',
  styleUrl: './pedidos-page.component.scss'
})
export class PedidosPageComponent implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.carregarRegistros();
  }

  carregarRegistros() {
    this.pedidoService.obterPedidos().subscribe(
      response => {
        this.pedidos = response;
        console.log(response)
      }
    );
  }

  obterNomePagamento(tipo: number): string {
    switch (tipo) {
      case 1: return 'Cartão';
      case 2: return 'PIX';
      case 3: return 'Dinheiro';
      case 4: return 'Caju';
      case 5: return 'Outro';
      default: return 'Desconhecido';
    }
  }

  obterItensFormatados(pedido: Pedido): string {
    return pedido.itens_pedido
      .map(i => `${i.nome_item} (${i.quantidade}x)`)
      .join(', ');
  }

  calcularValorTotalPedido(pedido: Pedido): number {
    return pedido.itens_pedido.reduce((total, item) => {
      return total + (item.valor_unitario * item.quantidade);
    }, 0);
  }

  endereco(endereco: Endereco): string {
    return `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, CEP: ${endereco.cep}`;
  }
}