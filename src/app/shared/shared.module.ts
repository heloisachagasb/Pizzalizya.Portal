import { LOCALE_ID, NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { CapitalizarPalavrasPrincipaisPipe } from "./pipes/capitilazar-palavras-principais.pipe";
import { BoletoNossoNumeroPipe } from "./pipes/boleto-nosso-numero.pipe.";
import { CapitalizeFirstPipe } from "./pipes/capitalize-first-letter.pipe";
import { CepPipe } from "./pipes/cep.pipe";
import { CNAEPipe } from "./pipes/cnae.pipe";
import { CpfCnpjPipe } from "./pipes/cpf-cnpj.pipe";
import { DecimalParaHorasPipe } from "./pipes/decimal-para-horas.pipe";
import { DiferencaDiasTarefaPipe } from "./pipes/diferenca-dias-tarefa.pipe";
import { FormataLista } from "./pipes/formata-lista";
import { IniciaisNomePipe } from "./pipes/iniciais-nome.pipe";
import { RazaoCnpjPipe } from "./pipes/razao-cnpj.pipe";
import { StatusProdutoPipe } from "./pipes/status-produto.pipe";
import { StatusServicoPipe } from "./pipes/status-servico.pipe";
import { TelefonePipe } from "./pipes/telefone.pipe";
import { UltimosDigitosCpfCnpjPipe } from "./pipes/ultimos-digitos-cpf-cnpj.pipe";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CommonModule, CurrencyPipe, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgxFileDropModule } from "ngx-file-drop";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "left",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
    declarations: [
        CapitalizarPalavrasPrincipaisPipe,
        BoletoNossoNumeroPipe,
        CapitalizeFirstPipe,
        CepPipe,
        CNAEPipe,
        CpfCnpjPipe,
        DecimalParaHorasPipe,
        DiferencaDiasTarefaPipe,
        FormataLista,
        IniciaisNomePipe,
        RazaoCnpjPipe,
        StatusProdutoPipe,
        StatusServicoPipe,
        TelefonePipe,
        UltimosDigitosCpfCnpjPipe,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        NgSelectModule,
        CurrencyPipe,
        DatePipe,
        NgxFileDropModule,
        NgxMaskDirective,
        CurrencyMaskModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }, // Define o locale como 'pt-BR'
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        provideNgxMask(),
    ],
    exports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        FormsModule,
        CapitalizarPalavrasPrincipaisPipe,
        BoletoNossoNumeroPipe,
        CapitalizeFirstPipe,
        CepPipe,
        CNAEPipe,
        CpfCnpjPipe,
        DecimalParaHorasPipe,
        DiferencaDiasTarefaPipe,
        DiferencaDiasTarefaPipe,
        FormataLista,
        IniciaisNomePipe,
        RazaoCnpjPipe,
        StatusProdutoPipe,
        StatusServicoPipe,
        TelefonePipe,
        UltimosDigitosCpfCnpjPipe,
        NgSelectModule,
        CurrencyPipe,
        DatePipe,
        NgxMaskDirective,
        CurrencyMaskModule,
    ]
})
export class SharedModule { }