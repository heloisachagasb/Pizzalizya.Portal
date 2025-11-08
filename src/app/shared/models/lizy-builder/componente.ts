import {
  LizyBuilderComponenteConfiguracaoDeCondicionaisCondicaoAcaoEnum,
  LizyBuilderComponenteConfiguracaoDeCondicionaisCondicaoEnum,
  LizyBuilderComponenteDoFormularioBaseDeCadastrosEnum,
  LizyBuilderTipoDeCampoEnum,
} from '../enums/lizy-builder-ficha';
import {
  LizyBuilderTipoDeCampoParametroCrudClienteComCondicionais,
  LizyBuilderTipoDeCampoParametroCrudFornecedoresComCondicionais,
  LizyBuilderTipoDeCampoParametroCrudPecasComCondicionais,
  LizyBuilderTipoDeCampoParametroCrudServicosComCondicionais,
  LizyBuilderTipoDeCampoParametroCrudTransportadorasComCondicionais,
} from './cruds';

export interface LizyBuilderTipoDeCampoParametroBaseComCustomizacaoDeColunas {
  span: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  placeholder: string;
  tooltip: string;
  limiteDeCaracteres: number;
  subgrupo: number;
}

export interface LizyBuilderTipoDeCampoParametroBase
  extends LizyBuilderTipoDeCampoParametroBaseComCustomizacaoDeColunas {}

export interface LizyBuilderTipoDeCampoParametroComOpcoes
  extends LizyBuilderTipoDeCampoParametroBaseComCustomizacaoDeColunas {
  tipo: 'customizado' | 'dinamico';
  opcoes: Array<{
    label: string;
    value: string;
  }>;
  baseDeCadastro: LizyBuilderComponenteDoFormularioBaseDeCadastrosEnum;
}

export interface LizyBuilderTipoDeCampoParametroParagrafo
  extends LizyBuilderTipoDeCampoParametroBaseComCustomizacaoDeColunas {
  conteudo: string;
}

export type LizyBuilderTipoDeCampoParametroComOpcoesEPlaceholder =
  LizyBuilderTipoDeCampoParametroComOpcoes &
    LizyBuilderTipoDeCampoParametroBase;

export type LizyBuilderTipoDeCampoParametroGrupoDeCampos = {
  subgrupos: Array<{
    label: string;
  }>;
};

export type LizyBuilderTipoDeCampoParametroComMascara =
  LizyBuilderTipoDeCampoParametroBase & {
    mascara: string;
  };

export type LizyBuilderTipoDeCampoParametroComAlinhamento = {
  alinhamento: 'esquerda' | 'centro' | 'direita' | 'justificado';
};

export interface LizyBuilderTipoDeCampoParametroComCondicionais {
  condicionaisHabilitados: boolean;
  condicionais: Array<{
    campo: string;
    condicao: LizyBuilderComponenteConfiguracaoDeCondicionaisCondicaoEnum;
    acao: LizyBuilderComponenteConfiguracaoDeCondicionaisCondicaoAcaoEnum;
  }>;
}

export type LizyBuilderTipoDeCampoParametroComMascaraEAlinhamento =
  LizyBuilderTipoDeCampoParametroComMascara &
    LizyBuilderTipoDeCampoParametroComAlinhamento;

export type LizyBuilderTipoDeCampoParametroComMascaraEAlinhamentoECondicionais =
  LizyBuilderTipoDeCampoParametroComMascaraEAlinhamento &
    LizyBuilderTipoDeCampoParametroComCondicionais;

export type LizyBuilderTipoDeCampoParametroComAlinhamentoECondicionais =
  LizyBuilderTipoDeCampoParametroComAlinhamento &
    LizyBuilderTipoDeCampoParametroComCondicionais;

export type LizyBuilderTipoDeCampoParametroParagrafoComCondicionais =
  LizyBuilderTipoDeCampoParametroParagrafo &
    LizyBuilderTipoDeCampoParametroComCondicionais;

export type LizyBuilderTipoDeCampoParametroComOpcoesComCondicionais =
  LizyBuilderTipoDeCampoParametroComOpcoes &
    LizyBuilderTipoDeCampoParametroComCondicionais;

export type LizyBuilderTipoDeCampoParametroComOpcoesEPlaceholderComCondicionais =
  LizyBuilderTipoDeCampoParametroComOpcoesEPlaceholder &
    LizyBuilderTipoDeCampoParametroComCondicionais;

export type LizyBuilderTipoDeCampoParametroGrupoDeCamposComCondicionais =
  LizyBuilderTipoDeCampoParametroBaseComCustomizacaoDeColunas &
    LizyBuilderTipoDeCampoParametroGrupoDeCampos &
    LizyBuilderTipoDeCampoParametroComCondicionais;

export type LizyBuilderComponenteDoFormularioParametros<
  TC extends LizyBuilderTipoDeCampoEnum
> = TC extends LizyBuilderTipoDeCampoEnum.TEXTO
  ? LizyBuilderTipoDeCampoParametroComMascaraEAlinhamentoECondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.NUMERO
  ? LizyBuilderTipoDeCampoParametroComMascaraEAlinhamentoECondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.TEXTO_LONGO
  ? LizyBuilderTipoDeCampoParametroBase &
      LizyBuilderTipoDeCampoParametroComAlinhamentoECondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.PARAGRAFO
  ? LizyBuilderTipoDeCampoParametroParagrafoComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.SELECT
  ? LizyBuilderTipoDeCampoParametroComOpcoesComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.MULTI_SELECT
  ? LizyBuilderTipoDeCampoParametroComOpcoesComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.RADIO_BUTTON
  ? LizyBuilderTipoDeCampoParametroComOpcoesComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.CHECKBOX
  ? LizyBuilderTipoDeCampoParametroComOpcoesComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.AUTOCOMPLETE
  ? LizyBuilderTipoDeCampoParametroComOpcoesEPlaceholderComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.GRUPO_DE_CAMPOS
  ? LizyBuilderTipoDeCampoParametroGrupoDeCamposComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.CRUD_PECAS
  ? LizyBuilderTipoDeCampoParametroCrudPecasComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.CRUD_CLIENTE
  ? LizyBuilderTipoDeCampoParametroCrudClienteComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.CRUD_SERVICOS
  ? LizyBuilderTipoDeCampoParametroCrudServicosComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.CRUD_FORNECEDORES
  ? LizyBuilderTipoDeCampoParametroCrudFornecedoresComCondicionais
  : TC extends LizyBuilderTipoDeCampoEnum.CRUD_TRANSPORTADORAS
  ? LizyBuilderTipoDeCampoParametroCrudTransportadorasComCondicionais
  : LizyBuilderTipoDeCampoParametroComMascaraEAlinhamentoECondicionais;

export type LizyBuilderComponenteDoFormularioFormatadoParametros<
  TC extends LizyBuilderTipoDeCampoEnum
> = LizyBuilderComponenteDoFormularioParametros<TC>;

export type LizyBuilderFichaComponenteFormatado =
  | (LizyBuilderFichaComponenteFormatadoBase & {
      type: LizyBuilderTipoDeCampoEnum.PARAGRAFO;
      parameters: LizyBuilderComponenteDoFormularioFormatadoParametros<LizyBuilderTipoDeCampoEnum.PARAGRAFO>;
    })
  | (LizyBuilderFichaComponenteFormatadoBase & {
      type:
        | LizyBuilderTipoDeCampoEnum.TEXTO
        | LizyBuilderTipoDeCampoEnum.NUMERO
        | LizyBuilderTipoDeCampoEnum.TEXTO_LONGO;
      parameters: LizyBuilderComponenteDoFormularioFormatadoParametros<LizyBuilderTipoDeCampoEnum.TEXTO>;
    })
  | (LizyBuilderFichaComponenteFormatadoBase & {
      type:
        | LizyBuilderTipoDeCampoEnum.SELECT
        | LizyBuilderTipoDeCampoEnum.MULTI_SELECT
        | LizyBuilderTipoDeCampoEnum.RADIO_BUTTON
        | LizyBuilderTipoDeCampoEnum.CHECKBOX;
      parameters: LizyBuilderComponenteDoFormularioFormatadoParametros<LizyBuilderTipoDeCampoEnum.SELECT>;
    })
  | (LizyBuilderFichaComponenteFormatadoBase & {
      type: LizyBuilderTipoDeCampoEnum.AUTOCOMPLETE;
      parameters: LizyBuilderComponenteDoFormularioFormatadoParametros<LizyBuilderTipoDeCampoEnum.AUTOCOMPLETE>;
    })
  | (LizyBuilderFichaComponenteFormatadoBase & {
      type: LizyBuilderTipoDeCampoEnum.GRUPO_DE_CAMPOS;
      parameters: LizyBuilderComponenteDoFormularioFormatadoParametros<LizyBuilderTipoDeCampoEnum.GRUPO_DE_CAMPOS>;
    })
  | (LizyBuilderFichaComponenteFormatadoBase & {
      type: LizyBuilderTipoDeCampoEnum;
      parameters: never;
    });

interface LizyBuilderFichaComponenteFormatadoBase {
  id: string;
  title: string;
  children?: LizyBuilderFichaComponenteFormatado[];
  descriptionField: boolean;
  required: boolean;
  adminOnly: boolean;
}

interface LizyBuilderComponenteDoFormularioBase {
  id: string;
  titulo: string;
  icone: string;
  campoDescricao: boolean;
  obrigatorio: boolean;
  somenteAdmin: boolean;
  filhos: LizyBuilderComponenteDoFormulario[];
}

export type LizyBuilderComponenteDoFormulario =
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.PARAGRAFO;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.PARAGRAFO>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.TEXTO;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.TEXTO>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.TEXTO_LONGO;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.TEXTO_LONGO>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.NUMERO;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.TEXTO>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.RADIO_BUTTON;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.RADIO_BUTTON>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.AUTOCOMPLETE;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.AUTOCOMPLETE>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.SELECT;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.SELECT>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.MULTI_SELECT;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.MULTI_SELECT>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.CHECKBOX;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.CHECKBOX>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.GRUPO_DE_CAMPOS;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.GRUPO_DE_CAMPOS>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.SECAO;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.SECAO>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.INTERRUPTOR;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.INTERRUPTOR>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.DATEPICKER;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.DATEPICKER>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.TEMPO;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.TEMPO>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.AUTOCOMPLETE;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.AUTOCOMPLETE>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_PECAS;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.CRUD_PECAS>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_CLIENTE;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.CRUD_CLIENTE>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_FORNECEDORES;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.CRUD_FORNECEDORES>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_TRANSPORTADORAS;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.CRUD_TRANSPORTADORAS>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_SERVICOS;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.CRUD_SERVICOS>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_CLIENTE;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.CRUD_CLIENTE>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.ARQUIVO;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.ARQUIVO>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum.IMAGEM;
      parametros: LizyBuilderComponenteDoFormularioParametros<LizyBuilderTipoDeCampoEnum.IMAGEM>;
    })
  | (LizyBuilderComponenteDoFormularioBase & {
      tipo: LizyBuilderTipoDeCampoEnum;
      parametros: never;
    });

export interface LizyBuilderGrupoDeComponentesDoFormulario {
  titulo: string;
  elementos: LizyBuilderComponenteDoFormulario[];
}
