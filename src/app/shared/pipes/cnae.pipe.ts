import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnae'
})
export class CNAEPipe implements PipeTransform {

  transform(cnae: string): string {
    if (!cnae) {
      return '';
    }

    const value = cnae.replace(/\D/g, ''); // Remove caracteres não numéricos

    let formatted = '';

    // Construir a máscara
    if (value.length <= 2) {
      formatted = value;
    } else if (value.length <= 4) {
      formatted = value.slice(0, 2) + '.' + value.slice(2);
    } else if (value.length <= 5) {
      formatted = value.slice(0, 2) + '.' + value.slice(2, 4) + '-' + value.slice(4);
    } else if (value.length <= 6) {
      formatted = value.slice(0, 2) + '.' + value.slice(2, 4) + '-' + value.slice(4, 5) + '-' + value.slice(5);
    } else {
      formatted = value.slice(0, 2) + '.' + value.slice(2, 4) + '-' + value.slice(4, 5) + '-' + value.slice(5, 7);
    }

    return formatted;
  }
}