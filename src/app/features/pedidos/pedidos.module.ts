import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PedidosAppComponent } from "./pedidos.app.component";
import { PedidosRoutingModule } from "./pedidos.route";
import { PedidosPageComponent } from "./pages/pedidos-page/pedidos-page.component";

@NgModule({
    declarations: [
        PedidosAppComponent,
        PedidosPageComponent
    ],
    imports: [
        CommonModule,
        PedidosRoutingModule,
        SharedModule,
    ],
    providers: [
    ]
})

export class PedidosModule { }