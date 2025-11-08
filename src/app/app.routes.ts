import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/guards/auth.guard';
import { MainLayoutComponent } from './main-layout.component';

export const Routing: Routes = [
	{		
		path: '',
		redirectTo: 'auth/login',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		loadChildren: () =>
			import('./core/auth/auth.module').then(m => m.AuthModule),
	},
	{
		component: MainLayoutComponent,
		path: '',
		canActivate: [AuthGuard],
		children: [	
			{
				path: 'pedidos',
				loadChildren: () => import('./features/pedidos/pedidos.module')
					.then(m => m.PedidosModule)
			}
		],
	},
	{
		path: '**',
		redirectTo: '/auth/login',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(Routing)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
