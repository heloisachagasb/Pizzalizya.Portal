import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(cep: string): string {
    
    var re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;

	if(re.test(cep)){
		return cep.replace(re,"$1.$2-$3");
	}
	
	return cep;     
  }
}