import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthLoginService } from '../../../shared/service/auth/auth-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  mostrarSenha: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authLoginService: AuthLoginService,
    private toastr: ToastrService,
  ) {}

  returnUrl: string;
  
  carregando: boolean = false;

  ngOnInit(): void {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/cadastros';
  }

  alterarVisibilidadeSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  esqueceuSenha() {
    this.router.navigate(['/auth/forgot-password']);
  }

  email: string = 'guilherme@lizy.com.br';
  senha: string = 'Mudar123!';

  submit() {

  //   this.carregando = true;
  //   this.authLoginService.login(this.email, this.senha).subscribe(
  //       response => {
          
  //         let idUsuarioMPM = "";

  //         if(response.value.id_usuario_mpm)
  //           idUsuarioMPM = response.value.id_usuario_mpm.toString();

  //         // this.authLoginService.LocalStorage.salvarDadosTokenUsuario(this.authLoginService.getAccessToken());
  //         this.authLoginService.LocalStorage.salvarDadosLocaisUsuario(response.value.id_usuario, response.value.nome_usuario,
  //           response.value?.id_cliente, this.email, idUsuarioMPM);
          
  //       },
  //       erro => {
  //         this.carregando = false;
  //         this.toastr.warning('Login/senha inválido!', 'Atenção!');
  //       })
  }

}