import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenusPermissoesLizy } from '../../../shared/utils/menus-permissoes';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
	@HostBinding('class') hostClass = 'sidebar dark:bg-[#09090B] bg-[#09090B] border-r border-r-gray-200 dark:border-r-coal-700 fixed z-20 hidden lg:flex flex-col items-stretch shrink-0';
	@HostBinding('attr.data-drawer') drawer = 'true';
	@HostBinding('attr.data-drawer-class') drawerClass = 'drawer drawer-start top-0 bottom-0';
	@HostBinding('attr.data-drawer-enable') drawerEnable = 'true|lg:false';
	@HostBinding('attr.id') id = 'sidebar';

	rotaAtiva: string = '';

	abasDesativadas: boolean = true;
	apresentarMenuVendas: boolean = false;

	MENUS = MenusPermissoesLizy;

	constructor(public router: Router) {
		this.router.events.subscribe(() => {
			this.rotaAtiva = this.router.url;
		});
	}

	ngOnInit(): void {
	}

	rotaComercialAtiva(): boolean {
		return this.router.url.startsWith('/comercial');
	}

	estaAtiva(rotas: string[]): boolean {
		return rotas.some(rota => this.rotaAtiva === rota);
	}
}