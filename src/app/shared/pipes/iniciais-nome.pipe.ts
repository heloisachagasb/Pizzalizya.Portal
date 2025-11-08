import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iniciais_nome'
})
export class IniciaisNomePipe implements PipeTransform {

  transform(nome: string): string {
    
    const allNames = nome.trim().split(' ');
    const initials = allNames.reduce((acc, curr, index) => {
      if(index === 0 || index === allNames.length - 1){
        acc = `${acc}${curr.charAt(0).toUpperCase()}`;
      }
      return acc;
    }, '');
    return initials;  
  }
}