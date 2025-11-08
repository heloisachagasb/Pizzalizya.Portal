import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'razaocnpj'
})
export class RazaoCnpjPipe implements PipeTransform {

  transform(value: string, limit: number = 25): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    
    let truncated = value.substring(0, limit);

    if (truncated[truncated.length - 1] === ' ') {
      truncated = truncated.substring(0, truncated.length - 1);
    }
    if (truncated[truncated.length - 1] === '.') {
      truncated = truncated.substring(0, truncated.length - 1);
    }
    
    return truncated + '.';
  }
}
