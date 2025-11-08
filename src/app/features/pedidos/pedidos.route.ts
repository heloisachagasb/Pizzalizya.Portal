import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PedidosAppComponent } from "./pedidos.app.component";
import { PedidosPageComponent } from "./pages/pedidos-page/pedidos-page.component";

const routes: Routes = [
    {
        path: '', component: PedidosAppComponent, data: { breadcrumb: "Pedidos" },
        children: [
            {path: 'pedidos', component: PedidosPageComponent, data: { breadcrumb: "Pedidos" }},
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class PedidosRoutingModule{}