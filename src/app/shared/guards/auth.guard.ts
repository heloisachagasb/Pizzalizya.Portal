import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthLoginService } from '../service/auth/auth-login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthLoginService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.LocalStorage.usuarioEstaLogado()) {
      return true;
    }

    // Se não está logado, redirecionar para /auth/login
    this.router.navigate(['/auth/login'], {
      // Passamos a rota que o usuário tentou acessar, caso queira redirecionar depois do login
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
