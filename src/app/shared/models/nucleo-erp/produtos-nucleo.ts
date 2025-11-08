import { HistoricoComprasProdutoResponse } from "../../cadastros-shared/models/produtos/historico-compras-produto";
import { Produto } from "../../cadastros-shared/models/produtos/produto";
import { ProdutosPorFonecedor } from "../../suprimentos-shared/models/pedidos-compras/produtos-por-fonecedor";
import { TipoCalculoImpostoEnum } from "./tipo-calculo-imposto.enum";

export class ProdutoNucleo {
    id: string | undefined;
    id_operacao: string | null;
    id_produto: string;
    id_local_estoque: string | undefined;
    codigo: string;
    descricao: string;
    status: number | undefined;
    unidade_medida: string;
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
    valor_desconto: number;
    valor_orcamento: number;
    ncm: string;
    cfop: string;
    tipo_moeda_estrangeira: string;
    valor_unitario_estrangeira: number;
    valor_total_estrangeira: number;
    valor_desconto_estrangeira: number;
    valor_cotacao_moeda_estrangeira: number;
    observacao: string;
    numero_pedido: string;
    numero_item: string;
    valor_frete: number | undefined;
    cofins: Cofins;
    pis: Pis;
    ipi: Ipi;
    icms: Icms;
    importacao: ImportacaoProdutoNucleoERP;
    simbolo_monetario: string;
    valor_outras_despesas_acessorias: number | undefined;
    produto_foi_alterado: boolean

    ordem: number;

    imposto_esta_preenchido: boolean;
    selecionado_para_aprovar_cotacao: boolean;
    mostrar_fornecedores: boolean;
    fornecedores: ProdutosPorFonecedor[];

    ultima_compra: HistoricoComprasProdutoResponse | undefined;

    constructor() {
        this.cofins = new Cofins();
        this.pis = new Pis();
        this.ipi = new Ipi();
        this.icms = new Icms();
        this.importacao = new ImportacaoProdutoNucleoERP();
    }

    criarBaseadoproduto(produto: Produto): ProdutoNucleo {
        let novoProdutoNucleo = new ProdutoNucleo();
        novoProdutoNucleo.id_produto = produto.id;
        novoProdutoNucleo.codigo = produto.codigo;
        novoProdutoNucleo.descricao = produto.descricao;
        novoProdutoNucleo.ncm = produto.ncm;
        novoProdutoNucleo.quantidade = 1;
        novoProdutoNucleo.valor_unitario = produto.preco_venda;
        novoProdutoNucleo.valor_total = novoProdutoNucleo.quantidade * novoProdutoNucleo.valor_unitario;

        novoProdutoNucleo.cofins = new Cofins().criarBaseadoproduto(produto);
        novoProdutoNucleo.pis = new Pis().criarBaseadoproduto(produto);
        novoProdutoNucleo.ipi = new Ipi().criarBaseadoproduto(produto);
        novoProdutoNucleo.icms = new Icms().criarBaseadoproduto(produto);

        novoProdutoNucleo.importacao = new ImportacaoProdutoNucleoERP();

        novoProdutoNucleo.importacao.base_calculo = novoProdutoNucleo.valor_total;

        return novoProdutoNucleo;
    }

    alterarBaseCalculoImpostos(valorBaseCalculo: number) {

        let valorICMS = 0;

        if (this.icms) {
            this.icms.base_calculo_icms = valorBaseCalculo;
            this.icms.calcularValorImposto();

            valorICMS = this.icms.valor_icms;
        }

        if (this.cofins) {
            this.cofins.valor_base_calculo = valorBaseCalculo - valorICMS;
            this.cofins.calcularValorImposto();
            this.cofins.calcularValorImpostoST();
        }
        if (this.pis) {

            this.pis.valor_base_calculo = valorBaseCalculo - valorICMS;
            this.pis.calcularValorImposto();
            this.pis.calcularValorImpostoST();
        }

        if (this.importacao) {
            this.importacao.base_calculo = valorBaseCalculo;
        }
    }


    impostoEstaPreenchido(): boolean {

        if ((this.icms || this.ipi || this.pis || this.cofins) && this.icms.id_situacao_tributaria_icms)
            return true;
        else
            return false;
    }
}

export class Cofins {
    id_situacao_tributaria_cofins: string;
    tipo_calculo: number;
    valor_base_calculo: number;
    aliquota_percentual: number;
    aliquota_reais: number;
    quantidade: number;
    valor: number;
    tipo_calculo_st: number;
    valor_base_calculo_st: number;
    aliquota_percentual_st: number;
    aliquota_reais_st: number;
    quantidade_st: number;
    valor_st: number;

    criarBaseadoproduto(produto: Produto): Cofins {

        this.id_situacao_tributaria_cofins = produto.cofins.id_situacao_tributaria;
        this.tipo_calculo = TipoCalculoImpostoEnum.SELECIONE;
        this.tipo_calculo_st = TipoCalculoImpostoEnum.SELECIONE;

        if (produto.cofins.valor_unitario_reais) {

            this.tipo_calculo = TipoCalculoImpostoEnum.VALOR;
            this.aliquota_reais = produto.cofins.valor_unitario_reais;
        }
        else if (produto.cofins.aliquota_percentual) {
            this.tipo_calculo = TipoCalculoImpostoEnum.PERCENTUAL;
            this.aliquota_percentual = produto.cofins.aliquota_percentual;
        }


        if (produto.cofins.valor_unitario_reais_st) {

            this.tipo_calculo_st = TipoCalculoImpostoEnum.VALOR;
            this.aliquota_reais_st = produto.cofins.valor_unitario_reais_st;
        }
        else if (produto.cofins.aliquota_percentual_st) {
            this.tipo_calculo_st = TipoCalculoImpostoEnum.PERCENTUAL;
            this.aliquota_percentual_st = produto.cofins.aliquota_percentual_st;
        }


        return this;
    }

    calcularValorImposto() {
        this.valor = 0;

        if (this.tipo_calculo == TipoCalculoImpostoEnum.PERCENTUAL) {
            if (!this.valor_base_calculo || this.valor_base_calculo <= 0 || !this.aliquota_percentual || this.aliquota_percentual <= 0) {
                return;
            }

            this.valor = (this.valor_base_calculo * this.aliquota_percentual) / 100;
        }
        else if (this.tipo_calculo == TipoCalculoImpostoEnum.VALOR) {

            if (!this.quantidade || this.quantidade <= 0 || !this.aliquota_reais || this.aliquota_reais <= 0) {
                return;
            }

            this.valor = this.quantidade * this.aliquota_reais
        }
    }

    calcularValorImpostoST() {
        this.valor_st = 0;
        if (this.tipo_calculo_st == TipoCalculoImpostoEnum.PERCENTUAL) {
            if (!this.valor_base_calculo_st || this.valor_base_calculo_st <= 0 || !this.aliquota_percentual_st || this.aliquota_percentual_st <= 0) {
                return;
            }

            this.valor_st = (this.valor_base_calculo_st * this.aliquota_percentual_st) / 100;
        }
        else if (this.tipo_calculo_st == TipoCalculoImpostoEnum.VALOR) {

            if (!this.quantidade_st || this.quantidade_st <= 0 || !this.aliquota_reais_st || this.aliquota_reais_st <= 0) {
                return;
            }

            this.valor_st = this.quantidade_st * this.aliquota_reais_st
        }
    }
}

export class Pis {
    id_situacao_tributaria_pis: string;
    tipo_calculo: number;
    valor_base_calculo: number;
    aliquota_percentual: number;
    aliquota_reais: number;
    quantidade: number;
    valor: number;
    tipo_calculo_st: number;
    valor_base_calculo_st: number;
    aliquota_percentual_st: number;
    aliquota_reais_st: number;
    quantidade_st: number;
    valor_st: number;

    criarBaseadoproduto(produto: Produto): Pis {

        this.id_situacao_tributaria_pis = produto.pis.id_situacao_tributaria_pis;
        this.tipo_calculo = TipoCalculoImpostoEnum.SELECIONE;
        this.tipo_calculo_st = TipoCalculoImpostoEnum.SELECIONE;

        if (produto.pis.valor_unitario_reais) {

            this.tipo_calculo = TipoCalculoImpostoEnum.VALOR;
            this.aliquota_reais = produto.pis.valor_unitario_reais;
        }
        else if (produto.pis.aliquota_percentual) {
            this.tipo_calculo = TipoCalculoImpostoEnum.PERCENTUAL;
            this.aliquota_percentual = produto.pis.aliquota_percentual;
        }


        if (produto.pis.valor_unitario_reais_st) {

            this.tipo_calculo_st = TipoCalculoImpostoEnum.VALOR;
            this.aliquota_reais_st = produto.pis.valor_unitario_reais_st;
        }
        else if (produto.pis.aliquota_percentual_st) {
            this.tipo_calculo_st = TipoCalculoImpostoEnum.PERCENTUAL;
            this.aliquota_percentual_st = produto.pis.aliquota_percentual_st;
        }
        return this;
    }

    calcularValorImposto() {
        this.valor = 0;
        if (this.tipo_calculo == TipoCalculoImpostoEnum.PERCENTUAL) {
            if (!this.valor_base_calculo || this.valor_base_calculo <= 0 || !this.aliquota_percentual || this.aliquota_percentual <= 0) {
                return;
            }

            this.valor = (this.valor_base_calculo * this.aliquota_percentual) / 100;
        }
        else if (this.tipo_calculo == TipoCalculoImpostoEnum.VALOR) {

            if (!this.quantidade || this.quantidade <= 0 || !this.aliquota_reais || this.aliquota_reais <= 0) {
                return;
            }

            this.valor = this.quantidade * this.aliquota_reais
        }
    }

    calcularValorImpostoST() {
        this.valor_st = 0;
        if (this.tipo_calculo_st == TipoCalculoImpostoEnum.PERCENTUAL) {
            if (!this.valor_base_calculo_st || this.valor_base_calculo_st <= 0 || !this.aliquota_percentual_st || this.aliquota_percentual_st <= 0) {
                return;
            }

            this.valor_st = (this.valor_base_calculo_st * this.aliquota_percentual_st) / 100;
        }
        else if (this.tipo_calculo_st == TipoCalculoImpostoEnum.VALOR) {

            if (!this.quantidade_st || this.quantidade_st <= 0 || !this.aliquota_reais_st || this.aliquota_reais_st <= 0) {
                return;
            }

            this.valor_st = this.quantidade_st * this.aliquota_reais_st
        }
    }
}

export class Ipi {
    id_situacao_tributaria_ipi: string;
    tipo_calculo: number;
    codigo_enquadramento: string;
    classe_enquadramento: string;
    codigo_selo_controle: string;
    cnpj_produtor: string;
    quantidade_selo_controle: string;
    valor_base_calculo: number;
    aliquota: number;
    quantidade_total_unidade_padrao: number;
    valor_unidade: number;
    valor_ipi: number;
    percentual_mercadoria_devolvida: number | undefined;
    valor_ipi_devolvido: number  | undefined;

    criarBaseadoproduto(produto: Produto): Ipi {
        this.id_situacao_tributaria_ipi = produto.ipi.id_situacao_tributaria_ipi;
        this.tipo_calculo = TipoCalculoImpostoEnum.SELECIONE;

        this.codigo_enquadramento = produto.ipi.codigo_enquadramento;
        this.classe_enquadramento = produto.ipi.classe_enquadramento;
        this.codigo_selo_controle = produto.ipi.codigo_selo_controle;
        this.cnpj_produtor = produto.ipi.cnpj_produtor;
        this.quantidade_selo_controle = produto.ipi.quantidade_selo_controle;


        if (produto.ipi.aliquota) {

            this.tipo_calculo = TipoCalculoImpostoEnum.PERCENTUAL;
            this.aliquota = produto.pis.valor_unitario_reais_st;
        }
        else if (produto.ipi.valor_por_unidade) {
            this.tipo_calculo = TipoCalculoImpostoEnum.VALOR;
            this.valor_unidade = produto.pis.aliquota_percentual_st;
        }

        return this;
    }

    calcularValorImposto() {

        this.valor_ipi = 0;

        if (this.tipo_calculo == TipoCalculoImpostoEnum.PERCENTUAL) {
            if (!this.valor_base_calculo || this.valor_base_calculo <= 0 || !this.aliquota || this.aliquota <= 0) {
                return;
            }

            this.valor_ipi = (this.valor_base_calculo * this.aliquota) / 100;
        }
        else if (this.tipo_calculo == TipoCalculoImpostoEnum.VALOR) {

            if (!this.valor_unidade || this.valor_unidade <= 0 || !this.quantidade_total_unidade_padrao || this.quantidade_total_unidade_padrao <= 0) {
                return;
            }

            this.valor_ipi = this.quantidade_total_unidade_padrao * this.valor_unidade
        }
    }
}

export class Icms {
    base_calculo_icms: number;
    aliquota_icms: number;
    valor_icms: number;
    valor_icms_desonerado: number;
    porcentagem_base_calculo_operacao_propria: number;
    porcentagem_reducao_bc_icms: number;
    porcentagem_reducao_bc_icms_st: number;
    porcentagem_margem_valor_adicional_icms_st: number;
    bc_icms_st: number;
    aliquota_icms_st: number;
    valor_icms_st: number;
    valor_icms_st_desonerado: number;
    valor_credito_icms_pode_ser_aproveitado: number;
    bc_icms_st_retido_anteriormente: number;
    valor_icms_st_retido_anteriormente: number;
    aliquota_suportada_consumidor_final: number;
    base_calculo_fundo_combate_pobreza_st_cobrado_anteriormente: number;
    percentual_fundo_combate_pobreza_st_cobrado_anteriormente: number;
    valor_fundo_combate_pobreza_st_cobrado_anteriormente: number;
    base_calculo_fundo_combate_pobreza: number;
    percentual_fundo_combate_pobreza: number;
    valor_fundo_combate_pobreza: number;
    base_calculo_fundo_combate_pobreza_st: number;
    percentual_fundo_combate_pobreza_st: number;
    valor_fundo_combate_pobreza_st: number;
    aliquota_aplicavel_calculo_credito: number;
    icms_operacao_diferimento: number;
    porcentagem_diferimento: number;
    valor_icms_diferido: number;
    bc_icms_st_retido_uf_remetente: number;
    icms_st_retido_uf_remetente: number;
    bc_icms_st_uf_destino: number;
    icms_st_uf_destino: number;
    id_regime_tributario: string;
    id_situacao_tributaria_icms: string;
    id_origem: string;
    id_modalidade_determinacao_bc_icms: string | undefined;
    id_modalidade_determinacao_bc_icms_st: string | undefined;
    id_motivo_desoneracao_icms: string | undefined;
    id_motivo_desoneracao_icms_st: string | undefined;
    id_estado_icms_st_devido_operacao: string | undefined;


    criarBaseadoproduto(produto: Produto): Icms {
        this.aliquota_icms = produto.icms.aliquota_icms;
        this.porcentagem_base_calculo_operacao_propria = produto.icms.porcentagem_bc_operacao_propria;
        this.porcentagem_reducao_bc_icms = produto.icms.porcentagem_reducao_bc_icms;
        this.porcentagem_reducao_bc_icms_st = produto.icms.porcentagem_reducao_bc_icms_st;
        this.porcentagem_margem_valor_adicional_icms_st = produto.icms.porcentagem_margem_valor_adicional_icms_st;
        this.aliquota_icms_st = produto.icms.aliquota_icms_st;
        this.aliquota_aplicavel_calculo_credito = produto.icms.aliquota_aplicavel_calculo_credito;
        this.id_estado_icms_st_devido_operacao = produto.icms.id_estado_icms_st_devido_operacao;
        this.porcentagem_diferimento = produto.icms.porcentagem_diferimento;
        this.id_situacao_tributaria_icms = produto.icms.id_situacao_tributaria;
        this.id_modalidade_determinacao_bc_icms = produto.icms.id_modalidade_determinacao_bc_icms;
        this.id_modalidade_determinacao_bc_icms_st = produto.icms.id_modalidade_determinacao_bc_icms_st;
        this.id_motivo_desoneracao_icms = produto.icms.id_motivo_desoneracao_icms;

        return this;
    }

    calcularValorImposto() {
        this.valor_icms = 0;
    }
}

export class ImportacaoProdutoNucleoERP{
        base_calculo: number | undefined;
        valor_despesa_aduaneira: number | undefined;
        valor_imposto_importacao: number | undefined;
        valor_operacoes_financeiras: number | undefined;
        numero_documento_importacao: string;
        data_emissao: Date | undefined;
        via_transporte: number | undefined;
        valor_afrmm: number | undefined;
        forma_importacao: number | undefined;
        codigo_exportador: string;
        desembaraco_local: string;
        desembaraco_estado: string;
        desembaraco_data: Date | undefined;
        adquirente_cnpj: string;
        adquirente_uf: string;
        numero_adicao: string;
        numero_sequencia: string;
        numero_drawback: string;
        codigo_fabricante: string;
        valor_desconto: number | undefined;
        numero_adicao_2: string;
        numero_sequencia_2: string;
        numero_drawback_2: string;
        codigo_fabricante_2: string;
        valor_desconto_2: number | undefined;
        numero_adicao_3: string;
        numero_sequencia_3: string;
        numero_drawback_3: string;
        codigo_fabricante_3: string;
        valor_desconto_3: number | undefined;

        data_emissao_string: string;
        desembaraco_data_string: string;

        constructor() {
            this.data_emissao_string = this.formatDateToString(this.data_emissao);
            this.desembaraco_data_string = this.formatDateToString(this.desembaraco_data);
          }
        
           formatDateToString(date: Date | undefined): string {
            return date ? date.toISOString().substring(0, 10) : '';
          }
        
           parseStringToDate(dateString: string): Date | undefined {
            return dateString ? new Date(dateString) : undefined;
          }
        
          updateDateFields() {
            this.data_emissao = this.parseStringToDate(this.data_emissao_string);
            this.desembaraco_data = this.parseStringToDate(this.desembaraco_data_string);
          }
}

interface ICMSRates {
    [key: string]: {
        [key: string]: number;
    };
}

export class TaxCalculator {
    private impostoICMSPorEstado: ICMSRates = {
        ac: {
            ac: 17,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        al: {
            ac: 12,
            al: 17,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        am: {
            ac: 12,
            al: 12,
            am: 18, // LEI COMPLEMENTAR N° 158, DE 08 DE OUTUBRO DE 2015
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        ap: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 18, // LEI N° 1.949, DE 29 DE OUTUBRO DE 2015
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        ba: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 17,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        ce: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 17,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        df: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 18, // LEI N° 5.548, DE 15 DE OUTUBRO DE 2015
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        es: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 17,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        go: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 17,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        ma: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 18, // LEI N° 10.329, DE 30 DE SETEMBRO DE 2015
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        mt: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 17,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        ms: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 17,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        mg: {
            ac: 7,
            al: 7,
            am: 7,
            ap: 7,
            ba: 7,
            ce: 7,
            df: 7,
            es: 7,
            go: 7,
            ma: 7,
            mt: 7,
            ms: 7,
            mg: 18,
            pa: 7,
            pb: 7,
            pr: 12,
            pe: 7,
            pi: 7,
            rn: 7,
            rs: 12,
            rj: 12,
            ro: 7,
            rr: 7,
            sc: 12,
            sp: 12,
            se: 7,
            to: 7
        },

        pa: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 17,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        pb: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 18, // LEI N° 10.507, DE 18 DE SETEMBRO DE 2015
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        pr: {
            ac: 7,
            al: 7,
            am: 7,
            ap: 7,
            ba: 7,
            ce: 7,
            df: 7,
            es: 7,
            go: 7,
            ma: 7,
            mt: 7,
            ms: 7,
            mg: 12,
            pa: 7,
            pb: 7,
            pr: 18,
            pe: 7,
            pi: 7,
            rn: 7,
            rs: 12,
            rj: 12,
            ro: 7,
            rr: 7,
            sc: 12,
            sp: 12,
            se: 7,
            to: 7
        },

        pe: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 18, // LEI Nº 10.259, DE 27 DE JANEIRO DE 1989
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        pi: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 17,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        rn: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 18, // LEI N° 9.991, DE 29 DE OUTUBRO DE 2015
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        rs: {
            ac: 7,
            al: 7,
            am: 7,
            ap: 7,
            ba: 7,
            ce: 7,
            df: 7,
            es: 7,
            go: 7,
            ma: 7,
            mt: 7,
            ms: 7,
            mg: 12,
            pa: 7,
            pb: 7,
            pr: 12,
            pe: 7,
            pi: 7,
            rn: 7,
            rs: 18, // LEI N° 9.991, DE 29 DE OUTUBRO DE 2015
            rj: 12,
            ro: 7,
            rr: 7,
            sc: 12,
            sp: 12,
            se: 7,
            to: 7
        },

        rj: {
            ac: 7,
            al: 7,
            am: 7,
            ap: 7,
            ba: 7,
            ce: 7,
            df: 7,
            es: 7,
            go: 7,
            ma: 7,
            mt: 7,
            ms: 7,
            mg: 12,
            pa: 7,
            pb: 7,
            pr: 12,
            pe: 7,
            pi: 7,
            rn: 7,
            rs: 12,
            rj: 18, // A alíquota do ICMS no RJ era 19% considerando 1% de FCP.
            ro: 7,
            rr: 7,
            sc: 12,
            sp: 12,
            se: 7,
            to: 7
        },

        ro: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 17.5, // LEI Nº 3699, DE 22 DE DEZEMBRO DE 2015
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        rr: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 17,
            sc: 12,
            sp: 12,
            se: 12,
            to: 12
        },

        sc: {
            ac: 7,
            al: 7,
            am: 7,
            ap: 7,
            ba: 7,
            ce: 7,
            df: 7,
            es: 7,
            go: 7,
            ma: 7,
            mt: 7,
            ms: 7,
            mg: 12,
            pa: 7,
            pb: 7,
            pr: 12,
            pe: 7,
            pi: 7,
            rn: 7,
            rs: 12,
            rj: 12,
            ro: 7,
            rr: 7,
            sc: 17,
            sp: 12,
            se: 7,
            to: 7
        },

        sp: {
            ac: 7,
            al: 7,
            am: 7,
            ap: 7,
            ba: 7,
            ce: 7,
            df: 7,
            es: 7,
            go: 7,
            ma: 7,
            mt: 7,
            ms: 7,
            mg: 12,
            pa: 7,
            pb: 7,
            pr: 12,
            pe: 7,
            pi: 7,
            rn: 7,
            rs: 12,
            rj: 12,
            ro: 7,
            rr: 7,
            sc: 12,
            sp: 18,
            se: 7,
            to: 7
        },

        se: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 18, // LEI N° 8.039, DE 01 DE OUTUBRO DE 2015
            to: 12
        },

        to: {
            ac: 12,
            al: 12,
            am: 12,
            ap: 12,
            ba: 12,
            ce: 12,
            df: 12,
            es: 12,
            go: 12,
            ma: 12,
            mt: 12,
            ms: 12,
            mg: 12,
            pa: 12,
            pb: 12,
            pr: 12,
            pe: 12,
            pi: 12,
            rn: 12,
            rs: 12,
            rj: 12,
            ro: 12,
            rr: 12,
            sc: 12,
            sp: 12,
            se: 12,
            to: 18 // LEI N° 3.019, DE 30 DE SETEMBRO DE 2015
        }
    };

    obterAliquotaICMS(ufDeOrigem: string, ufDeDestino: string = ufDeOrigem): number | undefined {
        return this.impostoICMSPorEstado[ufDeOrigem]?.[ufDeDestino];
    }
}

export enum StatusProdutos {
    AGUARDANDO_SUPRIMENTOS = 1,
    SOLICITADO_COTACAO,
    AGUARDANDO_FORNECEDOR,
    SOLICITADO_COMPRA,
    LIBERADO_PARA_RETIRADA,
    RETIRADO,
    FINALIZADO
}