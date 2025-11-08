import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbModule } from '@syncfusion/ej2-angular-navigations';
import { LayoutsComponent } from './layouts.component';
import { SharedModule } from '../../shared/shared.module';
import { Routing } from '../../app.routes';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    children: Routing,
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    BreadcrumbModule,
  ],
  exports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  providers:[    
    DatePipe,
  ]
})
export class LayoutsModule { }