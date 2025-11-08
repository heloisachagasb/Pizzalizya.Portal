import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataLista'
})
export class FormataLista implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (!value) {
      return '';
    }

    let formattedValue = value.replace(/;/g, ', ');

    return formattedValue.replace(/, $/, '');
  }

}
