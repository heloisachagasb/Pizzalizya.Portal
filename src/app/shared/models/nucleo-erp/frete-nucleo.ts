export class FreteNucleo {
    tipo_frete: string;
    id_transportadora: string |undefined;
    valor: number;
    quantidade_volumes: number;
    tipo_volumes: string;
    base_icms: number;
    valor_icms: number;
    peso_bruto: number;
    peso_liquido: number;
    placa_veiculo: string;
    uf_veiculo: string;
}