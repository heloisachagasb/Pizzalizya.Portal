export class Notificacao{

    public id: string;
    public id_empresa: string;
    public tipo: number;
    public mensagem: string;
    public visualizado: boolean;
    public data_criacao: Date;
    public data_visualizacao: Date | undefined;
    public id_referencia: string | undefined;    
}