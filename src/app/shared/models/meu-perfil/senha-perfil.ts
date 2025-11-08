export class SenhaPerfil{
    senha_atual: string;
    senha_nova: string;

    constructor(senhaAtual:string, novaSenha:string){

        this.senha_atual = senhaAtual;
        this.senha_nova = novaSenha;
    }
}