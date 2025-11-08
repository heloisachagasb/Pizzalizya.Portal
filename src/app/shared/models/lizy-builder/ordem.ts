import { LizyBuilderWorkflowStatusPcpEnum } from '../enums/lizy-builder-workflow';
import { LizyBuilderWorkflowNoStatus } from './workflow';

export interface LizyBuilderOrdem {
  ordemId: number;
  fichaId: number;
  numeroOrdem: string;
  nomeCliente: string;
  prioridade: string;
  statusOrdem: string;
  nomeTecnico: string;
  descricao1: string;
  descricao2: string;
  descricao3: string;
  dataCriacao: string | null;
  acoes: Array<{
    transicaoStatusId: number;
    nomeAcao: string;
  }>;
  tempoRestanteEtapa: string | null;
  servicosApontados: Array<{
    apontamentoServicoId: number;
    nomeServico: string;
    status: LizyBuilderApontamentosDaOrdemEtapaParteDePcpServicoStatusServicoTecnicoStatusTecnico;
    quantidadeTecnicos: number;
  }>;
  etapasParteDoPcp: Array<{
    etapaId: number;
    tituloEtapa: string;
    status: string;
  }>;
}

export type LizyBuilderApontamentosDaOrdemEtapaParteDePcpServicoStatusServico =
  | 'Aguardando'
  | 'Em andamento'
  | 'Pausado'
  | 'Finalizado';

export type LizyBuilderApontamentosDaOrdemEtapaParteDePcpServicoStatusServicoTecnicoStatusTecnico =
  'Aguardando' | 'Em andamento' | 'Pausado' | 'Finalizado' | 'Realizando';
export interface LizyBuilderApontamentosDaOrdemEtapaParteDePcpServicoTecnico {
  apontamentoTecnicoId: number;
  tecnicoId: string;
  nome: string;
  tempoEstimadoHoras: string;
  dataStatus: string;
  statusTecnico: LizyBuilderApontamentosDaOrdemEtapaParteDePcpServicoStatusServicoTecnicoStatusTecnico;
  dataInicio: null | string;
  dataFim: null | string;
  logsApontamentoTecnico: [];
  tempoTotal: string;
  acoes: [
    {
      transicaoStatusId: number;
      nomeAcao: string;
    }
  ];
}

export interface LizyBuilderApontamentosDaOrdemEtapaParteDePcpServico {
  apontamentoServicoId: number;
  etapaId: number;
  etapaTitulo: string;
  servicoTitulo: string;
  tempoEstimadoHoras: string;
  dataCriacao: string;
  dataStatus: string;
  statusServico: LizyBuilderApontamentosDaOrdemEtapaParteDePcpServicoStatusServico;
  apontamentosTecnicos: Array<LizyBuilderApontamentosDaOrdemEtapaParteDePcpServicoTecnico>;
  tempoTotal: string;
}
export interface LizyBuilderApontamentosDaOrdemEtapaParteDePcp {
  etapaId: number;
  tituloEtapa: string;
  quantidadeServicos: number;
  servicos: Array<LizyBuilderApontamentosDaOrdemEtapaParteDePcpServico>;
}

export interface LizyBuilderApontamentosDaOrdem {
  ordemId: number;
  numeroOrdem: string;
  nomeCliente: string;
  prioridade: string;
  dataCriacao: string;
  descricao1: string;
  descricao2: string;
  descricao3: string;
  etapasParteDePcp: Array<LizyBuilderApontamentosDaOrdemEtapaParteDePcp>;
}

export interface LizyBuilderOrdemComAcoesCompletas extends LizyBuilderOrdem {
  acoes: Array<{
    transicaoStatusId: number;
    nomeAcao: string;
    statusDestino: LizyBuilderWorkflowNoStatus;
  }>;
}

export interface LizyBuilderOrdemDaEtapa {
  etapaId: number;
  tituloEtapa: string;
  statusPcp: LizyBuilderWorkflowStatusPcpEnum;
  ordens: LizyBuilderOrdem[];
  totalOrdensEmPlanejamento: number | null;
  totalOrdensEmExecucao: number | null;
}

export interface LizyBuilderOrdemDaEtapaComAcoesCompletas
  extends LizyBuilderOrdemDaEtapa {
  ordens: LizyBuilderOrdemComAcoesCompletas[];
}

export type LizyBuilderOrdensDaEtapa = LizyBuilderOrdemDaEtapa[];
export type LizyBuilderOrdensDaEtapaComAcoesCompletas =
  LizyBuilderOrdemDaEtapaComAcoesCompletas[];

export enum LizyBuilderValidacaoOrdemTipoDeErro {
  CAMPO_OBRIGATORIO_VAZIO = 'CAMPO_OBRIGATORIO_VAZIO',
}

export class LizyBuilderValidacaoOrdemError extends Error {
  public tipo: LizyBuilderValidacaoOrdemTipoDeErro;
  constructor(message: string, tipo: LizyBuilderValidacaoOrdemTipoDeErro) {
    super(message);
    this.tipo = tipo;
  }
}
