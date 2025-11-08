import { Pipe, PipeTransform } from '@angular/core';
import { StatusServicoRequisicao } from '../models/enums/status-servico-requisicao';

@Pipe({
  name: 'statusServico'
})
export class StatusServicoPipe implements PipeTransform {

  transform(idStatus: number | undefined): string {

    if (!idStatus)
      return '';

    if (idStatus == StatusServicoRequisicao.AGUARDANDO_SUPRIMENTOS)
      return 'Aguardando Suprimentos';
    else if (idStatus == StatusServicoRequisicao.REALIZANDO_COTACAO)
      return 'Realizando Cotação';
    else if (idStatus == StatusServicoRequisicao.COMPRA_SOLICITADA)
      return 'Compra Solicitada';
    else if (idStatus == StatusServicoRequisicao.AGUARDANDO_RETIRADA)
      return 'Aguardando Retirada';
    else if (idStatus == StatusServicoRequisicao.RETIRADO)
      return 'Retirado';

    return '';
  }
}