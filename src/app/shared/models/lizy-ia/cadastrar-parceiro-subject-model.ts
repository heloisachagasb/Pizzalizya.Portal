import { DadosCnpjConsultado } from "../cnpj/dados-cnpj";


export class CadastrarParceiroSubjectModel{
    cliente: boolean;
    transportadora: boolean;
    fornecedor: boolean;
    dados_parceiro: DadosCnpjConsultado;
}