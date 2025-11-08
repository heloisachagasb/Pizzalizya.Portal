import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { BaseService } from '../../base.service';
import { ConsultaCnpjReceitaWS } from '../../models/cnpj/consulta-cnpj-receitaws';
import { DadosCnpjConsultado } from '../../models/cnpj/dados-cnpj';
import { LizyApiResponse } from '../../models/lizy-api-response';

@Injectable({
  providedIn: 'root'
})
export class CnpjService extends BaseService {

  constructor(private http:HttpClient, private router2: Router){
    super(router2);
}

  consultarCnpj(cnpj: string): Promise<DadosCnpjConsultado> {

    return new Observable<DadosCnpjConsultado>((subscriber) => {
      this.consultarCnpjReceitaWs(cnpj).subscribe(
        responseReceitaWs => {
          subscriber.next(this.preencherDadosEmpresaReceitaWs(responseReceitaWs.value))
          subscriber.complete();
        },
        erro => {
          subscriber.next(new DadosCnpjConsultado())
          subscriber.complete();
        }
      )
    }).toPromise();
  }

  private consultarCnpjReceitaWs(cnpj: string): Observable<LizyApiResponse<ConsultaCnpjReceitaWS>> {
    return this.http.get<LizyApiResponse<ConsultaCnpjReceitaWS>>(
      environment.lizyParceirosApiUrl + "/" + this.LocalStorage.obterIdEmpresaAtiva() + "/buscar-dados-cnpj/" + cnpj,
      this.ObterHeaderJson())
      .pipe(catchError(this.serviceError));
  }

  private preencherDadosEmpresaReceitaWs(dadosReceitaWs: ConsultaCnpjReceitaWS): DadosCnpjConsultado {
    let dadosCnpj = new DadosCnpjConsultado();

    if (!dadosReceitaWs || dadosReceitaWs.status == "ERROR")
      return dadosCnpj;

    dadosCnpj.nome_fantasia = dadosReceitaWs.fantasia;
    dadosCnpj.razao_social = dadosReceitaWs.nome;
    dadosCnpj.status = dadosReceitaWs.status;
    dadosCnpj.cnae_principal_descricao = dadosReceitaWs.atividade_principal.text;
    dadosCnpj.cnae_principal_codigo = dadosReceitaWs.atividade_principal.code;
    dadosCnpj.cep = dadosReceitaWs.cep;
    dadosCnpj.data_abertura = dadosReceitaWs.abertura;
    dadosCnpj.telefone = dadosReceitaWs.telefone;
    dadosCnpj.email = dadosReceitaWs.email;
    dadosCnpj.tipo_logradouro = '';
    dadosCnpj.logradouro = dadosReceitaWs.logradouro;
    dadosCnpj.numero = dadosReceitaWs.numero;
    dadosCnpj.complemento = dadosReceitaWs.complemento;
    dadosCnpj.bairro = dadosReceitaWs.bairro;
    dadosCnpj.cidade = dadosReceitaWs.municipio;
    dadosCnpj.uf = dadosReceitaWs.uf;

    return dadosCnpj;
  }
}
