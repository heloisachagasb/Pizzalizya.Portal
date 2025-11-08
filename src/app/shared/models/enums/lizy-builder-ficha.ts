export enum LizyBuilderFichaCategoriaEnum {
  PRODUCAO = 1,
  SERVICO = 2,
}

export enum LizyBuilderFichaStatusEnum {
  TODOS = 0,
  PUBLICADO = 1,
  RASCUNHO = 2,
  ARQUIVADO = 3,
}

export enum LizyBuilderTipoDeCampoEnum {
  SECAO = 1,
  TEXTO = 2,
  TEXTO_LONGO = 3,
  NUMERO = 4,
  PARAGRAFO = 5,
  DIVISORIA = 6,
  INTERRUPTOR = 7,
  GRUPO_DE_CAMPOS = 8,
  AUTOCOMPLETE = 9,
  SELECT = 10,
  MULTI_SELECT = 11,
  RADIO_BUTTON = 12,
  CHECKBOX = 13,
  CRUD_CLIENTE = 14,
  CRUD_SERVICOS = 16,
  CRUD_PRODUTOS = 15,
  CRUD_FORNECEDORES = 17,
  CRUD_TRANSPORTADORAS = 18,
  CRUD_PROCESSOS = 19,
  DATEPICKER = 20,
  TEMPO = 21,
  IMAGEM = 22,
  ASSINATURA = 23,
  ARQUIVO = 24,
  QR_CODE = 25,
  COLUNAS = 26,
  NUMEROORDEM = 27,
  CLIENTE = 28,
  CRUD_PECAS = 29,
}

export enum LizyBuilderComponenteDoFormularioBaseDeCadastrosEnum {
  CLIENTES = 1,
  FORNECEDORES = 2,
  TRANSPORTADORAS = 3,
  PRODUTOS = 4,
  SERVICOS = 5,
  TECNICOS = 6,
  CONDICAO_DE_PAGAMENTO = 7,
  SETOR = 8,
}

export enum LizyBuilderComponenteConfiguracaoDeCondicionaisCondicaoEnum {
  NAO_FOR_VAZIO = 'NAO_FOR_VAZIO',
  FOR_VAZIO = 'FOR_VAZIO',
}

export enum LizyBuilderComponenteConfiguracaoDeCondicionaisCondicaoAcaoEnum {
  MOSTRAR_SE = 'MOSTRAR_SE',
}
