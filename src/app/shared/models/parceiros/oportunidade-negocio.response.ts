import { DadosOportunidadeRequest } from "./adicionar-oportunidade.request";

export class OportunidadeNegocioResponse extends DadosOportunidadeRequest {

    id: string
    cpf_cnpj: string
    razao_social: string
    id_funil: string
    id_cliente: string
    id_etapa: string

}