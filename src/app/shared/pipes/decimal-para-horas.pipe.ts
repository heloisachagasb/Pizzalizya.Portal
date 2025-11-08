import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal_para_horas'
})
export class DecimalParaHorasPipe implements PipeTransform {

  transform(valor: number): string {
    
    if(!valor)
      return '';

    const hours = Math.floor(valor);
    const minutes = Math.round((valor - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  }
}