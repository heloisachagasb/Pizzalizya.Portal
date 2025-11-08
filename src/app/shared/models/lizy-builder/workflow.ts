import {
  LizyBuilderWorkflowCategoriaEnum,
  LizyBuilderWorkflowColunaDaEtapaColunaEnum,
  LizyBuilderWorkflowStatusPcpEnum,
} from '../enums/lizy-builder-workflow';

export type CNPJ = `${string}.${string}.${string}/${string}-${string}`;
export interface LizyBuilderWorkflowFormatado {
  titulo: string;
  cnpj: CNPJ;
  descricao: string;
  categoriaWorkflowId: number;
  workflowId?: number;
  ativo: boolean;
  favorito: boolean;
  fichasIds: number[];
}

export type LizyBuilderCriarWorkflowPayload = Pick<
  LizyBuilderWorkflowFormatado,
  'titulo' | 'descricao' | 'categoriaWorkflowId' | 'cnpj' | 'fichasIds'
>;

export interface LizyBuilderWorkflow {
  nome: string;
  cnpj: string;
  descricao: string;
  categoria: LizyBuilderWorkflowCategoriaEnum;
  id?: number;
  ativo?: boolean;
  favorito?: boolean;
  fichasIds: number[];
}

export interface LizyBuilderListarWorkflowsPayload {
  ativo?: boolean;
}

export interface LizyBuilderWorkflowStatusFormatado {
  statusWorkflowId: number;
  titulo: string;
  ativo: boolean;
  workflowId: number | null;
}

export interface LizyBuilderListarWorkflowsStatusPayload {
  ativo: boolean;
  workflowId: number | null;
}

export interface LizyBuilderWorkflowStatusCriacaoPayload {
  titulo: string;
  ativo: boolean;
  workflowId: number;
}

export type LizyBuilderWorkflowNoInformacaoComplementariaDoBackend =
  | LizyBuilderWorkflowGrafoCriacaoPayloadTransicaoStatus
  | LizyBuilderWorkflowGrafoCriacaoPayloadEtapaStatus
  | LizyBuilderWorkflowGrafoCriacaoPayloadEtapa;

export interface LizyBuilderWorkflowNo {
  uuid: string;
  titulo: string;
  meta: `${string}:${string}:${string}`;
  tipo: 'personalizado' | 'padrao';
  tipoElemento: 'etapa' | 'status' | 'acao';
  posicao: {
    x: number;
    y: number;
  };
  statusInicial: boolean;
  etapaFichasSecoes: Array<{
    etapaFichaSecaoId: null | number;
    fichaId: number;
    secaoId: null | number;
    metaHoras: string;
    excluido: boolean;
  }>;
  estadoPcp: LizyBuilderWorkflowStatusPcpEnum;
  inicioDeWorkflow: boolean;
  permiteNovasOrdens: boolean;
  statusId: number | null;
  colunas: LizyBuilderWorkflowNoColunaDaEtapa[];
  infoDoBackend: null | LizyBuilderWorkflowNoInformacaoComplementariaDoBackend;
  excluido: boolean;
}

export interface LizyBuilderWorkflowNoColunaDaEtapa {
  etapaColunaId: number | null;
  coluna: LizyBuilderWorkflowColunaDaEtapaColunaEnum;
  visivel: boolean;
  apenasAdmin: boolean;
  excluido: boolean;
}

export interface LizyBuilderWorkflowConexao {
  inputId: string;
  outputId: string;
}

export interface LizyBuilderWorkflowNoStatus {
  id: number;
  titulo: string;
  tipo: 'personalizado' | 'padrao';
}

export interface LizyBuilderWorkflowNoAcao {
  titulo: string;
  icone: string;
}

export interface LizyBuilderWorkflowConfigracaoFichaFormatada {
  fichaId: number;
  metaHoras: string;
  secaoIds: number[];
}

export interface LizyBuilderWorkflowConfigracaoColunaFormatada {
  nome: string;
  visivel: boolean;
  somenteAdmin: boolean;
}
export interface LizyBuilderWorkflowConfigracaoTabelaFormatada {
  nomeTabela: string;
  ocultarMostrarColunas: boolean;
  colunas: LizyBuilderWorkflowConfigracaoColunaFormatada[];
}

export interface LizyBuilderWorkflowVertice {
  verticeId: number;
  tempVerticeId: string;
  workflowId: number;
  posicaoX: number;
  posicaoY: number;
}
export interface LizyBuilderWorkflowGrafoEtapaFormatada
  extends LizyBuilderWorkflowVertice {
  titulo: string;
  metaHoras: string;
  inicioDeWorkflow: boolean;
  permiteNovasOrdens: boolean;
  pcp: boolean;
  parteDePcp: boolean;
  fichas: LizyBuilderWorkflowConfigracaoFichaFormatada[];
  tabela: LizyBuilderWorkflowConfigracaoTabelaFormatada | null;
}

export interface LizyBuilderWorkflowGrafoStatusFormatado
  extends LizyBuilderWorkflowVertice {
  statusWorkflowId: number;
  statusInicial: boolean;
}

export interface LizyBuilderWorkflowGrafoTransicaoFormatada {
  transicaoId: number;
  verticeOrigemId: number;
  verticeDestinoId: number;
  tempVerticeOrigemId: string;
  tempVerticeDestinoId: string;
  rotulo: string;
  workflowId: number;
}

export interface LizyBuilderWorkflowGrafoFormatado {
  workflowId: number;
  etapas: LizyBuilderWorkflowGrafoEtapaFormatada[];
  status: LizyBuilderWorkflowGrafoStatusFormatado[];
  transicoes: LizyBuilderWorkflowGrafoTransicaoFormatada[];
}

export interface LizyBuilderWorkflowGrafoCriacaoPayloadEtapa {
  etapaId?: number;
  tempEtapaId: string;
  titulo: string;
  posicaoX: number;
  posicaoY: number;
  metaHoras: string;
  inicioDeWorkflow: boolean;
  permiteNovasOrdens: boolean;
  statusPcp: LizyBuilderWorkflowStatusPcpEnum;
  excluido: boolean;
  moverOrdensParaEtapaId: null | number;
  moverOrdensParaTempEtapaId: null | string;
  etapaFichasSecoes: Array<{
    etapaFichaSecaoId: null | number;
    fichaId: number;
    secaoId: null | number;
    metaHoras: string;
    excluido: boolean;
  }>;
  etapaColunas: Array<LizyBuilderWorkflowNoColunaDaEtapa>;
}

export interface LizyBuilderWorkflowGrafoCriacaoPayloadEtapaStatus {
  etapaStatusId: null | number;
  tempEtapaStatusId: string;
  etapaId: null | number;
  tempEtapaId: string;
  inicial: boolean;
  statusWorkflowId: number;
  posicaoX: number;
  posicaoY: number;
  excluido: boolean;
}

export interface LizyBuilderWorkflowGrafoCriacaoPayloadTransicaoEtapa {
  transicaoEtapaId: null | number;
  tempEtapaOrigemId: string;
  tempEtapaDestinoId: string;
  statusDisparadorId: number;
  excluido: boolean;
  etapaDestinoId?: number;
  etapaOrigemId?: number;
}

export interface LizyBuilderWorkflowGrafoCriacaoPayloadTransicaoStatus {
  transicaoStatusId: null | number;
  nomeAcao: string;
  posicaoX: number;
  posicaoY: number;
  excluido: boolean;
  tempEtapaStatusIdOrigem: string;
  etapaStatusIdOrigem?: number;
  statusWorkflowIdOrigem: number;
  tempEtapaStatusIdDestino: string;
  etapaStatusIdDestino?: number;
  statusWorkflowIdDestino: number;
}

export type LizyBuilderWorkflowGrafoCriacaoPayload = {
  workflowId: number;
  etapas: LizyBuilderWorkflowGrafoCriacaoPayloadEtapa[];
  etapaStatus: LizyBuilderWorkflowGrafoCriacaoPayloadEtapaStatus[];
  transicoesEtapa: LizyBuilderWorkflowGrafoCriacaoPayloadTransicaoEtapa[];
  transicoesStatus: LizyBuilderWorkflowGrafoCriacaoPayloadTransicaoStatus[];
};
