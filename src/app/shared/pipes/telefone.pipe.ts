import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(numero: string): unknown {

    if(!numero)
      return '';

    if (numero.length > 10) 
      return this.transformarFixo(numero);
    else if (numero.length > 9) 
      return this.transformarCelular(numero);

    return numero;
  }

  transformarFixo(numero: string):string {
    return numero.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');
  }

  transformarCelular(numero: string):string {
    return numero.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');
  }
}
