import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { ImagemUploaded } from './models/imagem-uploaded';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService extends BaseService {

  private arquviosServiceUrl: string = environment.lizyNucleoApiUrl+ "arquivos";

  constructor(private http:HttpClient, private router2: Router){
    super(router2);
}

  fazerUpload(formData: FormData): Observable<ImagemUploaded> {
      return this.http.post<ImagemUploaded>(this.arquviosServiceUrl, formData)
          .pipe(catchError(super.serviceError))
  }

  uploadFotoPerfil(caminhoFoto: string) {
    return this.http.put(`${environment.lizyIdentidadeApiUrl + this.LocalStorage.obterIdCliente()}/usuarios/${this.LocalStorage.obterIdUsuario()}/foto-perfil`, { caminho_foto_perfil: caminhoFoto }, this.ObterHeaderJson())
      .pipe(catchError(this.serviceError));
  }
}