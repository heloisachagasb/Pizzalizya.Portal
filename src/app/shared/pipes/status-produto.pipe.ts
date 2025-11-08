import { Pipe, PipeTransform } from '@angular/core';
import { StatusServicoRequisicao } from '../models/enums/status-servico-requisicao';
import { StatusProdutoRequisicao } from '../models/enums/status-produto-requisicao';

@Pipe({
  name: 'statusProduto'
})
export class StatusProdutoPipe implements PipeTransform {

  transform(idStatus: number | undefined): string {

    if (!idStatus)
      return '';

    if (idStatus == StatusProdutoRequisicao.AGUARDANDO_SUPRIMENTOS)
      return 'Aguardando Suprimentos';
    else if (idStatus == StatusProdutoRequisicao.SOLICITADO_COTAÇÃO)
      return 'Solicitado Cotação';
    else if (idStatus == StatusProdutoRequisicao.AGUARDANDO_FORNECEDOR)
      return 'Aguarndado Fornecedor';
    else if (idStatus == StatusProdutoRequisicao.SOLICITADO_COMPRA)
      return 'Solicitado Compra';
    else if (idStatus == StatusProdutoRequisicao.LIBERADO_PARA_RETIRADA)
      return 'Liberado para Retirada';
    else if (idStatus == StatusProdutoRequisicao.RETIRADO)
      return 'Retirado';

    return '';
  }
}