import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeMainWords'
})

export class CapitalizarPalavrasPrincipaisPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';

    const words = value.toLowerCase().split(' ');
    const capitalizedWords = words.map((word, index) => {
      if (
        index === 0 ||                      // Primeira palavra
        !['a', 'de', 'da', 'do', 'e',   // Artigos e conjunções
          'o', 'te', 'por', 'para', 'pra',   // Preposições
          'em', 'na', 'no'].includes(word) // Preposições
      ) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });

    return capitalizedWords.join(' ');
  }
}