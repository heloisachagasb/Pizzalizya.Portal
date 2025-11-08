import {
  LizyBuilderTipoDeCampoParametroBase,
  LizyBuilderTipoDeCampoParametroComAlinhamentoECondicionais,
} from './componente';

export type LizyBuilderTipoDeCampoParametroCrudColuna<T extends string> = {
  habilitado: boolean;
  chave: T;
  somenteAdmin: boolean;
};

export type LizyBuilderCrudServicosItem = {
  quantidade: number;
  descricao: string;
  setor: string;
  valor_unitario: number;
  valor_total: number;
  observacoes: string;
};

export type LizyBuilderTipoDeCampoParametroCrudServicos = {
  crudColunas: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'setor'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
  crudCamposCriacao: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'setor'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
};

export type LizyBuilderCrudClienteItem = {
  quantidade: number;
  descricao: string;
  parceiro: string;
  valor_unitario: number;
  valor_total: number;
  observacoes: string;
};

export type LizyBuilderTipoDeCampoParametroCrudCliente = {
  crudColunas: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'parceiro'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
  crudCamposCriacao: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'parceiro'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
};

export type LizyBuilderCrudFornecedoresItem = {
  quantidade: number;
  descricao: string;
  parceiro: string;
  valor_unitario: number;
  valor_total: number;
  observacoes: string;
};

export type LizyBuilderTipoDeCampoParametroCrudFornecedores = {
  crudColunas: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'parceiro'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
  crudCamposCriacao: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'parceiro'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
};

export type LizyBuilderCrudTransportadorasItem = {
  quantidade: number;
  descricao: string;
  parceiro: string;
  valor_unitario: number;
  valor_total: number;
  observacoes: string;
};

export type LizyBuilderTipoDeCampoParametroCrudTransportadoras = {
  crudColunas: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'parceiro'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
  crudCamposCriacao: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'parceiro'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
};

export type LizyBuilderCrudPecasItem = {
  quantidade: number;
  descricao: string;
  unidade_medida: string;
  reutiliza_peca: boolean;
  cliente_fornece: boolean;
  valor_unitario: number;
  valor_total: number;
  descricao_orcamento: string;
  observacoes: string;
};

export type LizyBuilderTipoDeCampoParametroCrudPecas = {
  crudColunas: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'unidade_medida'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'reutiliza_peca'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'cliente_fornece'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao_orcamento'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
  crudCamposCriacao: [
    LizyBuilderTipoDeCampoParametroCrudColuna<'quantidade'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'unidade_medida'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'reutiliza_peca'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'cliente_fornece'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_unitario'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'valor_total'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'descricao_orcamento'>,
    LizyBuilderTipoDeCampoParametroCrudColuna<'observacoes'>
  ];
};

export type LizyBuilderTipoDeCampoParametroCrudPecasComCondicionais =
  LizyBuilderTipoDeCampoParametroComAlinhamentoECondicionais &
    LizyBuilderTipoDeCampoParametroBase &
    LizyBuilderTipoDeCampoParametroCrudPecas;

export type LizyBuilderTipoDeCampoParametroCrudServicosComCondicionais =
  LizyBuilderTipoDeCampoParametroComAlinhamentoECondicionais &
    LizyBuilderTipoDeCampoParametroBase &
    LizyBuilderTipoDeCampoParametroCrudServicos;

export type LizyBuilderTipoDeCampoParametroCrudClienteComCondicionais =
  LizyBuilderTipoDeCampoParametroComAlinhamentoECondicionais &
    LizyBuilderTipoDeCampoParametroBase &
    LizyBuilderTipoDeCampoParametroCrudCliente;

export type LizyBuilderTipoDeCampoParametroCrudFornecedoresComCondicionais =
  LizyBuilderTipoDeCampoParametroComAlinhamentoECondicionais &
    LizyBuilderTipoDeCampoParametroBase &
    LizyBuilderTipoDeCampoParametroCrudFornecedores;

export type LizyBuilderTipoDeCampoParametroCrudTransportadorasComCondicionais =
  LizyBuilderTipoDeCampoParametroComAlinhamentoECondicionais &
    LizyBuilderTipoDeCampoParametroBase &
    LizyBuilderTipoDeCampoParametroCrudTransportadoras;

export type LizyBuilderNomeColunaCrud =
  | LizyBuilderTipoDeCampoParametroCrudServicos['crudCamposCriacao'][number]['chave']
  | LizyBuilderTipoDeCampoParametroCrudServicos['crudColunas'][number]['chave']
  | LizyBuilderTipoDeCampoParametroCrudCliente['crudCamposCriacao'][number]['chave']
  | LizyBuilderTipoDeCampoParametroCrudCliente['crudColunas'][number]['chave']
  | LizyBuilderTipoDeCampoParametroCrudPecas['crudCamposCriacao'][number]['chave']
  | LizyBuilderTipoDeCampoParametroCrudPecas['crudColunas'][number]['chave'];
