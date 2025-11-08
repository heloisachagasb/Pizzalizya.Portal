import {
  LizyBuilderFichaCategoriaEnum,
  LizyBuilderTipoDeCampoEnum,
} from '../enums/lizy-builder-ficha';
import {
  LizyBuilderComponenteDoFormulario,
  LizyBuilderFichaComponenteFormatado,
} from './componente';
import {
  LizyBuilderCrudClienteItem,
  LizyBuilderCrudFornecedoresItem,
  LizyBuilderCrudPecasItem,
  LizyBuilderCrudServicosItem,
  LizyBuilderCrudTransportadorasItem,
} from './cruds';

export interface LizyBuilderFichaFormatada {
  fichaId?: number;
  titulo: string;
  descricao: string;
  dataPublicacao: string | null;
  dataCriacao: string | null;
  conteudoJson: LizyBuilderFichaComponenteFormatado[];
  padrao: boolean;
  arquivado: boolean;
  categoriaFichaId: number;
}

export interface LizyBuilderWokflowVisualizacaoPreenchimento {
  preenchimentosEtapasAnteriores: Array<LizyBuilderCriarOrdemPayloadPreenchimentoFormatado>;
  preenchimentosEtapaAtual: Array<LizyBuilderCriarOrdemPayloadPreenchimentoFormatado>;
}

export interface LizyBuilderWorkflowSecaoDeFichaDeWorkflowFormatado {
  secaoId: number;
  conteudoJson:
    | [
        Extract<
          LizyBuilderFichaComponenteFormatado,
          { type: LizyBuilderTipoDeCampoEnum.SECAO }
        >
      ]
    | Extract<
        LizyBuilderFichaComponenteFormatado,
        { type: LizyBuilderTipoDeCampoEnum.SECAO }
      >;
}

export interface LizyBuilderWorkflowSecaoDeFichaDeWorkflow {
  secaoId: number;
  conteudoJson: Extract<
    LizyBuilderComponenteDoFormulario,
    { tipo: LizyBuilderTipoDeCampoEnum.SECAO }
  >;
}

export type LizyBuilderCriarFichaPayload = Pick<
  LizyBuilderFichaFormatada,
  'titulo' | 'descricao' | 'conteudoJson' | 'categoriaFichaId' | 'padrao'
> &
  Partial<Pick<LizyBuilderFichaFormatada, 'dataPublicacao'>> & {
    arquivado: false;
  };

export interface LizyBuilderFicha {
  id?: number;
  nome: string;
  categoria: LizyBuilderFichaCategoriaEnum;
  componentesDoFormulario: LizyBuilderComponenteDoFormulario[];
  descricao: string;
  tipoDeFicha: 'padrao' | 'personalizada';
  publicadoEm: Date | null;
  criadoEm: Date | null;
  arquivado: boolean;
}

export interface ListarFichasParametros {
  workflowId?: number;
}

export interface LizyBuilderFichaComSecoes {
  fichaId: number;
  tituloFicha: string;
  padrao: boolean;
  vinculoAtivo: boolean;
  secoes: Array<{
    secaoId: number;
    titulo: string;
  }>;
}

export type LizyBuilderValorComponente =
  | {
      tipo: LizyBuilderTipoDeCampoEnum.TEXTO;
      valor: string;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.TEXTO_LONGO;
      valor: string;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.INTERRUPTOR;
      valor: boolean;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.SELECT;
      valor: string;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.MULTI_SELECT;
      valor: string[];
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.NUMERO;
      valor: string;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.CHECKBOX;
      valor: string[];
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.RADIO_BUTTON;
      valor: string;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.DATEPICKER;
      valor: Date;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.TEMPO;
      valor: string;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.AUTOCOMPLETE;
      valor: string;
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_PECAS;
      valor: LizyBuilderCrudPecasItem[];
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_FORNECEDORES;
      valor: LizyBuilderCrudFornecedoresItem[];
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_SERVICOS;
      valor: LizyBuilderCrudServicosItem[];
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_CLIENTE;
      valor: LizyBuilderCrudClienteItem[];
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.CRUD_TRANSPORTADORAS;
      valor: LizyBuilderCrudTransportadorasItem[];
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.ARQUIVO;
      valor: { label: string; caminho: string | File; url: string | null }[];
    }
  | {
      tipo: LizyBuilderTipoDeCampoEnum.IMAGEM;
      valor: { label: string; caminho: string | File; url: string | null }[];
    }
  | never;

export type LizyBuilderFichaComponenteFormatadoComValor<
  T extends LizyBuilderTipoDeCampoEnum
> = Omit<
  Extract<LizyBuilderFichaComponenteFormatado, { type: T }>,
  'children'
> & {
  value: Extract<LizyBuilderValorComponente, { tipo: T }>['valor'];
  children?: Array<
    LizyBuilderFichaComponenteFormatadoComValor<LizyBuilderTipoDeCampoEnum>
  >;
};
export interface LizyBuilderCriarOrdemPayloadPreenchimentoFormatado {
  secaoId: number;
  conteudoJson:
    | Array<
        LizyBuilderFichaComponenteFormatadoComValor<LizyBuilderTipoDeCampoEnum>
      >
    | LizyBuilderFichaComponenteFormatadoComValor<LizyBuilderTipoDeCampoEnum.SECAO>;
}

export interface LizyBuilderCriarOrdemPayload {
  etapaAtualId: number;
  workflowId: number;
  fichaId: number;
  preenchimentos: Array<LizyBuilderCriarOrdemPayloadPreenchimentoFormatado>;
}
