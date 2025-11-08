import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PageInfoService } from '../core/page-info.service';
import { AuthLoginService } from '../../../shared/service/auth/auth-login.service';

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


	dataHoraAtual: any | null = '';

	headerContainerCssClasses: string = '';
	asideDisplay: boolean = true;
	headerLeft: string = 'menu';
	pageTitleCssClasses: string = '';
	pageTitleAttributes: {
		[attrName: string]: string | boolean;
	};

	title$: Observable<string>;
	showTitle: boolean = true;
	breadcrumbPath: string = '';

	private unsubscribe: Subscription[] = [];

	constructor(private router: Router,
		private authLoginService: AuthLoginService,
		private pageInfo: PageInfoService,
	) {

		this.routingChanges();
	}

	ngOnInit() {
		this.dataHoraAtual = new Date();

		this.atualizarBreadcrumb();

		this.title$ = this.pageInfo.title.asObservable();

		const routerSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.atualizarBreadcrumb();
			}
		});

		this.unsubscribe.push(routerSubscription);

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
						return `<span class="text-primary">${breadcrumb}</span>`;
					} else {
						return `<span class="text-gray-900">${breadcrumb}</span>`;
					}
				})
				.join(
					`<i class="ki-filled ki-right text-xs text-gray-600 font-semibold mr-1 ml-1"></i>`
				);
		}

		this.pageInfo.setTitle(this.breadcrumbPath);
	}

	logout() {
		setTimeout(() => {
			this.authLoginService.logout();
		}, 100);
	}

	ngAfterViewInit() {
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
}