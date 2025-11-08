import { AdicionarVolumeTransportadoRequest } from "./requests/adicionar-volume-transportado.request";

export class VolumeTransportado{

    id:string;
    id_operacao:string;
    quantidade_volumes:number;
    especie:string;
    marca:string;
    peso_bruto:number;
    peso_liquido:number;

    public alterarDadosComBaseCriarVolumeRequest(volume: AdicionarVolumeTransportadoRequest){
        this.quantidade_volumes = volume.quantidade_volumes;
        this.especie = volume.especie;
        this.marca = volume.marca;
        this.peso_bruto = volume.peso_bruto;
        this.peso_liquido = volume.peso_liquido;        
    }
}