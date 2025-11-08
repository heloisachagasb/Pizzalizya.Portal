import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boletoNossoNumero',
})
export class BoletoNossoNumeroPipe implements PipeTransform {

  transform(input: string): string {

    if (input.length <= 3) {
      return input;
    }

    const mainPart = input.slice(0, -3);
    const lastThreeDigits = input.slice(-3);
    return `${mainPart} - ${lastThreeDigits}`;
  }
}
