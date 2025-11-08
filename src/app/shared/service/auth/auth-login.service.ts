import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base.service';
import { LizyApiResponse } from '../../models/lizy-api-response';
import { LoginResponse } from '../../models/auth/login.response';
import { environment } from '../../../../environments/environment';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // URL do seu IdentityServer
  issuer: environment.identityServerUrl,
  clientId: 'lizyerp',
  scope: 'openid profile api_principal',
  clearHashAfterLogin: false,
  tokenEndpoint: environment.identityServerUrl + '/connect/token',
};


@Injectable({
  providedIn: 'root',
})
export class AuthLoginService extends BaseService {

  constructor(private oauthService: OAuthService, private http: HttpClient, private router2: Router) {
    super(router2);
    this.oauthService.configure(authConfig);
  }

  login(email: string, senha: string): Observable<LizyApiResponse<LoginResponse>> {
      return this.http.post<LizyApiResponse<LoginResponse>>(
      `${environment.lizyIdentidadeApiUrl}login/autenticar`,
      { email, senha },
      this.ObterHeaderJsonDefault() 
    ).pipe(
      switchMap(respostaDaApi => {
        return from(this.oauthService.fetchTokenUsingPasswordFlow(email, senha)).pipe(
          map(() => respostaDaApi)
        );
      }),
      catchError(errorResponse => {
        return this.serviceError(errorResponse);
      })
    );
  }

  logout() {
    this.oauthService.logOut();
    this.LocalStorage.limparDadosLocaisUsuario();
    this.router2.navigate(['/auth/login']);
  }

  esqueceuSenha(email: string): Observable<Result> {
    return this.http.post<Result>(`${environment.lizyIdentidadeApiUrl}usuarios/recuperar-senha`, JSON.stringify({
      email_usuario: email,
      link_para_redefinicao: "https://app.lizy.com.br/auth/reset-password"
    }),
      this.ObterHeaderJson())
      .pipe(catchError(this.serviceError));
  }

  redefinirSenha(idSolicitacao: string, novaSenha: string): Observable<LizyApiResponse<any>> {
    return this.http.post<LizyApiResponse<any>>(`${environment.lizyIdentidadeApiUrl}usuarios/redefinir-senha/${idSolicitacao}`, JSON.stringify({
      nova_senha: novaSenha,
    }),
      this.ObterHeaderJson())
      .pipe(catchError(this.serviceError));
  }
  
   public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  public isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public getClaims(): object {
    return this.oauthService.getIdentityClaims();
  }
}

class Result {
  sucess: boolean;
  erros: string[];
}