import { LizyBuilderFichaCategoriaEnum } from '../enums/lizy-builder-ficha';
import {
  LizyBuilderComponenteDoFormulario,
  LizyBuilderFichaComponenteFormatado,
} from './componente';

export interface LizyBuilderFichaVinculadaFormatada {
  fichaId?: number;
  tituloFicha: string;
  dataPublicacao: string | null;
  categoriaId: number;
  vinculoAtivo: boolean;
}

export type LizyBuilderCriarFichaPayload = Pick<
  LizyBuilderFichaVinculadaFormatada,
  'tituloFicha' | 'dataPublicacao' | 'categoriaId'
> &
  Partial<Pick<LizyBuilderFichaVinculadaFormatada, 'dataPublicacao'>> & {
    vinculoAtivo: false;
  };

export interface LizyBuilderFichaVinculada {
  id?: number;
  nome: string;
  categoria: LizyBuilderFichaCategoriaEnum;
  publicadoEm: Date | null;
  arquivado: boolean;
}

export interface ListarFichasParametros {
  workflowId?: number;
}

export interface LizyBuilderFichaComSecoes {
  fichaId: number;
  tituloFicha: string;
  padrao: boolean;
  secoes: Array<{
    secaoId: number;
    titulo: string;
  }>;
}
