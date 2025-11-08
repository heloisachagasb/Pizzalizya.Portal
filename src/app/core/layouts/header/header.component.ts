import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PageInfoService } from '../core/page-info.service';
import { AuthLoginService } from '../../../shared/service/auth/auth-login.service';
import { MenusPermissoesLizy } from '../../../shared/utils/menus-permissoes';

declare var KTDrawer: any;

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

	@HostBinding('class') hostClass = 'header fixed top-0 z-10 left-0 right-0 flex items-stretch shrink-0 bg-[#fefefe] dark:bg-[#09090B]';
	@HostBinding('attr.role') hostRole = 'banner';
	@HostBinding('attr.data-sticky') dataSticky = 'true';
	@HostBinding('attr.data-sticky-name') dataStickyName = 'header';
	@HostBinding('id') hostId = 'header';

	@ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef;

	MENUS = MenusPermissoesLizy;
	
	dataHoraAtual: any | null = '';

	headerContainerCssClasses: string = '';
	headerLeft: string = 'menu';
	pageTitleCssClasses: string = '';
	pageTitleAttributes: {
		[attrName: string]: string | boolean;
	};
	title$: Observable<string>;
	breadcrumbPath: string = '';
	nomeUsuario: string = '';
	emailUsuario: string = '';
	fotoPerfilUsuario: string;
	rotaAtiva: string = '';

	asideDisplay: boolean = true;
	showTitle: boolean = true;
	modoEscuroAtivo: boolean = false;

	private unsubscribe: Subscription[] = [];

	constructor(private router: Router,
		private authLoginService: AuthLoginService,
		private pageInfo: PageInfoService) {
		this.routingChanges();

		this.router.events.subscribe(() => {
			this.rotaAtiva = this.router.url;
		});
	}

	ngOnInit() {
		this.dataHoraAtual = new Date();

		this.atualizarBreadcrumb();
		this.obterDadosUsuarioLogado();

		this.modoEscuroAtivo = document.documentElement.classList.contains('dark');

		this.title$ = this.pageInfo.title.asObservable();

		const routerSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.atualizarBreadcrumb();
			}
		});

		this.unsubscribe.push(routerSubscription);
	}

	obterDadosUsuarioLogado() {
		this.nomeUsuario = localStorage.getItem('lizy.user');
		this.emailUsuario = localStorage.getItem('lizy.user_email');
		// this.fotoPerfilUsuario = localStorage.getItem('lizy.foto_perfil');
	}

	getIniciais(nome: string): string {
		if (!nome) return '';

		const partes = nome.trim().split(' ').filter(p => p.length > 0);

		if (partes.length === 1) {
			return partes[0].substring(0, 2).toUpperCase();
		}

		const primeira = partes[0].charAt(0).toUpperCase();
		const ultima = partes[partes.length - 1].charAt(0).toUpperCase();

		return primeira + ultima;
	}

	atualizarBreadcrumb() {
		let rotaAtual = this.router.routerState.snapshot.root;
		const breadcrumbs: string[] = [];

		while (rotaAtual) {
			const breadcrumb = rotaAtual.data?.['breadcrumb'];

			if (breadcrumb && !breadcrumbs.includes(breadcrumb)) {
				breadcrumbs.push(breadcrumb);
			}
			rotaAtual = rotaAtual.firstChild;
		}

		if (breadcrumbs.length === 1) {
			this.breadcrumbPath = `<span class="text-gray-900">${breadcrumbs[0]}</span>`;
		} else {
			this.breadcrumbPath = breadcrumbs
				.map((breadcrumb, index) => {
					if (index === breadcrumbs.length - 1) {
						return `<span class="text-gray-900 text-sm font-semibold">${breadcrumb}</span>`;
					} else {
						return `<span class="text-gray-600 text-sm font-semibold">Avt</span>
						<i class="ki-filled ki-right text-xs text-gray-600 mr-1 ml-1 !font-normal"></i>
						<span class="text-gray-600 text-sm font-semibold">${breadcrumb}</span>`;
					}
				})
				.join(
					`<i class="ki-filled ki-right text-xs text-gray-600 mr-1 ml-1"></i>`
				);
		}

		this.pageInfo.setTitle(this.breadcrumbPath);
	}

	logout() {
		setTimeout(() => {
			// this.authLoginService.logout();
		}, 100);
	}

	private drawer: any;

	ngAfterViewInit() {
		const el = document.getElementById('chat_drawer');
		const toggle = document.getElementById('chat_drawer_toggle');
		const close = document.getElementById('chat_drawer_close');

		if (el && typeof KTDrawer !== 'undefined') {
			this.drawer = new KTDrawer(el, {
				overlay: true,
				direction: 'end',
				width: () => (window.innerWidth < 992 ? '300px' : '500px'),
			});
		}

		toggle?.addEventListener('click', () => this.drawer.toggle());
		close?.addEventListener('click', () => this.drawer.hide());

		if (this.ktPageTitle) {
			for (const key in this.pageTitleAttributes) {
				if (this.pageTitleAttributes.hasOwnProperty(key)) {
					this.ktPageTitle.nativeElement.attributes[key] =
						this.pageTitleAttributes[key];
				}
			}
		}
	}

	routingChanges() {
		const routerSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
			}
		});
		this.unsubscribe.push(routerSubscription);
	}

	dropdownAberto = false;

	abrirDropdown() {
		this.dropdownAberto = true;
	}

	abrirPaginaUsuarios() {
		this.router.navigate(['/configuracoes/usuarios']);
	}

	abrirPaginaMetaVendedores() {
		this.router.navigate(['/configuracoes/meta-vendedores']);
	}

	estaAtiva(rotas: string[]): boolean {
		return rotas.some(rota => this.rotaAtiva === rota);
	}
}