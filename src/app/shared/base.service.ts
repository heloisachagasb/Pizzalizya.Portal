import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LocalStorageUtils } from './utils/localstorage';
import { environment } from '../../environments/environment.prod';
import { NotificacaoErro } from './models/notificao-erro';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {


  constructor(private router: Router) { }

  public LocalStorage = new LocalStorageUtils();

  protected serviceError(response: Response | any) {
    let mensagemErroGenerica: string = "Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.";


    if (response.status === 500)
      return throwError(mensagemErroGenerica);

    else if (response.status === 401 && !window.location.href.includes('login')) {

      let localStorage = new LocalStorageUtils();

      localStorage.limparDadosLocaisUsuario();

      this.router.navigate(['auth/login']);

      return throwError("Por favor realize o login novamente");
    }
    else if (response.status === 419 || response.status === 412 || response.status === 409) {
      let listaErrosConvertidas: NotificacaoErro[] = response.error.notifications;
      let mensagemErroFormatada = "";

      if (listaErrosConvertidas) {
        listaErrosConvertidas.forEach(element => {
          mensagemErroFormatada += element.message + " \n";
        });
      }
      else if (response.error.message)
        mensagemErroFormatada = response.error.message;
      else {
        mensagemErroFormatada = mensagemErroGenerica;
      }

      return throwError(mensagemErroFormatada);
    }
    else if (response.status === 400) {
      if (response.error.message)
        return throwError(response.error.message);

      let mensagemErroFormatada = "Os seguinte campo são obrigatórios:\n";

      let erros = Object.keys(response.error.errors);

      erros.forEach(element => {
        let textoSeparado = element.split('.');

        if (textoSeparado.length <= 1) {
          mensagemErroFormatada += element;
          return;
        }

        let grupo = '';
        let campo = '';

        if (textoSeparado[1])
          grupo = textoSeparado[1]

        if (textoSeparado[2])
          campo = textoSeparado[2]


        if (grupo)
          mensagemErroFormatada += grupo[0].toUpperCase() + grupo.substr(1).toLowerCase()

        if (campo)
          mensagemErroFormatada += " " + campo[0].toUpperCase() + campo.substr(1).toLowerCase() + " \n";

      });

      return throwError(mensagemErroFormatada);
    }
    else if (response instanceof HttpErrorResponse) {
      if (response.statusText === "Unknown Error")
        return throwError("Ocorreu um erro. Tente novamente mais tarde");

      return throwError(mensagemErroGenerica);
    }
    else {
      return throwError(mensagemErroGenerica);
    }
  }

  protected ObterHeaderJson() {
    var headerObject = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
      })
    };

    if (this.LocalStorage.obterTokenUsuario()) {
      headerObject.headers = headerObject.headers.append("Authorization", `Bearer ${this.LocalStorage.obterTokenUsuario()}`)
      headerObject.headers = headerObject.headers.append("X-Customer-Id", `${this.LocalStorage.obterIdCliente()}`)
      headerObject.headers = headerObject.headers.append("X-Company-Id", `${this.LocalStorage.obterIdEmpresaAtiva()}`)
    }

    return headerObject;
  }
  
  protected ObterHeaderJsonDefault() {
    var headerObject = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
      })
    };

    return headerObject;
  }

  protected ObterHeaderJsonFormData() {
    var headerObject = {
      headers: new HttpHeaders({
        'Accept': '*/*',
      })
    };

    if (this.LocalStorage.obterTokenUsuario()) {
      headerObject.headers = headerObject.headers.append("Authorization", `Bearer ${this.LocalStorage.obterTokenUsuario()}`)
      headerObject.headers = headerObject.headers.append("X-Customer-Id", `${this.LocalStorage.obterIdCliente()}`)
      headerObject.headers = headerObject.headers.append("X-Company-Id", `${this.LocalStorage.obterIdEmpresaAtiva()}`)
    }

    return headerObject;
  }

  protected ObterHeaderJsonFormDataExcelOuJson() {
    var headerObject = {
      headers: new HttpHeaders({
        'Accept': 'application/json, application/vnd.ms-excel',
      }),
      responseType: 'blob' as 'json'
    };

    if (this.LocalStorage.obterTokenUsuario()) {
      headerObject.headers = headerObject.headers.append("Authorization", `Bearer ${this.LocalStorage.obterTokenUsuario()}`);
      headerObject.headers = headerObject.headers.append("X-Customer-Id", `${this.LocalStorage.obterIdCliente()}`)
      headerObject.headers = headerObject.headers.append("X-Company-Id", `${this.LocalStorage.obterIdEmpresaAtiva()}`)
    }

    return headerObject;
  }

  protected ObterHeaderJsonComParametrosNaQuery(queryParameters: HttpParams) {
    var headerObject = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
      }),
      params: queryParameters
    };

    if (this.LocalStorage.obterTokenUsuario()) {
      headerObject.headers = headerObject.headers.append("Authorization", `Bearer ${this.LocalStorage.obterTokenUsuario()}`)
      headerObject.headers = headerObject.headers.append("X-Customer-Id", `${this.LocalStorage.obterIdCliente()}`)
      headerObject.headers = headerObject.headers.append("X-Company-Id", `${this.LocalStorage.obterIdEmpresaAtiva()}`)
    }

    return headerObject;
  }

  
  protected ObterHeaderMPMJsonComParametrosNaQuery(queryParameters: HttpParams) {
    var headerObject = {
      headers: new HttpHeaders({
        'Accept': '*/*',
      }),
      params: queryParameters
    };

    return headerObject;
  }



  protected ObterHeaderJsonDownloadPdfComParametroQuery(queryParameters: HttpParams) {
    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`,
        'X-Customer-Id': `${this.LocalStorage.obterIdCliente()}`,
        'X-Company-Id': `${this.LocalStorage.obterIdEmpresaAtiva()}`,
        'Accept': '*/*',
      }),
      params: queryParameters,
      responseType: 'arraybuffer',
    };
    return HTTPOptions;
  }



  protected ObterFileUploadHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      })
    };
  }

  protected ObterHeaderJsonDownloadPdf() {
    let HTTPOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`,
        'X-Customer-Id': `${this.LocalStorage.obterIdCliente()}`,
        'X-Company-Id': `${this.LocalStorage.obterIdEmpresaAtiva()}`,
      }),
      responseType: 'arraybuffer'
    };
    return HTTPOptions;
  }


  public atualizarListas<T>(novaLista: T[], velhaLista: T[]) {
    const newData = novaLista;
    let oldData = velhaLista;

    if (!oldData || oldData.length <= 0)
      return newData;

    // Iterar sobre os novos dados
    newData.forEach((newItem: any) => {
      // Encontrar o item correspondente nos dados antigos
      const oldItem = oldData.find((item: any) => item.id === newItem.id);

      // Se o item existir e for diferente, atualize-o
      if (oldItem && JSON.stringify(oldItem) !== JSON.stringify(newItem)) {
        const index = oldData.indexOf(oldItem);
        oldData[index] = newItem;
      }
      // Se o item não existir nos dados antigos, adicione-o
      else if (!oldItem) {
        oldData.push(newItem);
      }
    });

    // Iterar sobre os dados antigos
    oldData = oldData.filter((oldItem: any) => {
      // Verificar se o item ainda existe nos novos dados
      return newData.some((newItem: any) => newItem.id === oldItem.id);
    });

    return oldData;
  }

  calcularValorEmPorcentagemDaBaseCalculo(baseCalculo: number, aliquota: number): number {
    if (baseCalculo <= 0 || aliquota <= 0)
      return 0;

    return (baseCalculo * aliquota) / 100;
  }

  baixarArquivo(data: any, fileType: string, nomeArquivo: string) {
    const file = new Blob([data], { type: "application/" + fileType });
    const fileURL = URL.createObjectURL(file);

    let link = document.createElement('a');
    link.href = fileURL;
    link.download = nomeArquivo + '.' + fileType;
    link.click();
  }
  abrirPdf(data: any, fileType: string, nomeArquivo: string) {

    const file = new Blob([data], { type: "application/" + fileType });
    const fileURL = URL.createObjectURL(file);
    let pwa = window.open(fileURL, nomeArquivo,  "width=800,height=1200");

    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      Swal.fire({
        title: 'Atenção',
        text: 'Não foi possivel abrir diretamente o arquivo, libere o popup no canto superior direto da tela e gere novamente',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }   
  }
}