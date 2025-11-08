
import { ConfiguracaoMenusVisiveis } from "../models/menus-ativos/menus-ativos.response";
import { Permissoes } from "../models/auth/permissoes";

export class LocalStorageUtils {

    static readonly KEY_ID_USARIO = 'lizy.id_usuario';
    static readonly KEY_ID_USARIO_MPM = 'lizy.id_usuario_mpm';
    static readonly KEY_USER = 'lizy.user';
    static readonly KEY_EMAIL_USER = 'lizy.user_email';
    static readonly KEY_ID_CLIENTE = 'lizy.id_cliente';
    static readonly KEY_TOKEN = 'lizy.token';
    static readonly KEY_ID_EMPRESA = 'lizy.id_empresa';
    static readonly KEY_LISTA_EMPRESAS = 'lizy.emrpesas_usuario';
    static readonly KEY_MENUS_ATIVOS = 'lizy.menus_ativos';
    static readonly KEY_CONFIGURACAO_ORCAMENTO = 'lizy.configuracao_orcamento';
    static readonly KEY_CONFIGURACAO_INTEGRACAO_ORCAMENTO = 'lizy.configuracao_integracao_orcamento';
    static readonly KEY_CONFIGURACAO_CONTROLE_PRODUCAO = 'lizy.configuracao_controle_producao';
    static readonly KEY_PERMISSOES = 'lizy.permissoes';
    static readonly KEY_CONFIGURACAO_FINANCEIRO = 'lizy.configuracao_financeiro';

    public obterUsuario(): any {
        const user = localStorage.getItem(LocalStorageUtils.KEY_USER);

        return user == null ? "" : JSON.parse(user);
    }

    public salvarDadosLocaisUsuario(idUsuario: string, nomeUsuario: string, idCliente: string, emailUsuario: string, idUsuarioMPM: string) {
        localStorage.setItem(LocalStorageUtils.KEY_ID_USARIO, idUsuario);
        localStorage.setItem(LocalStorageUtils.KEY_ID_USARIO_MPM, idUsuarioMPM);
        this.salvaNomeUsuarioLogado(nomeUsuario);
        localStorage.setItem(LocalStorageUtils.KEY_ID_CLIENTE, idCliente);
        localStorage.setItem(LocalStorageUtils.KEY_EMAIL_USER, emailUsuario);
    }

    public salvarDadosLocaisEmpresaAtiva(idEmpresa: string) {
        localStorage.setItem(LocalStorageUtils.KEY_ID_EMPRESA, idEmpresa);
    }

    public salvarDadosTokenUsuario(response: string) {
        if (!response) return;

        localStorage.setItem(LocalStorageUtils.KEY_TOKEN, response);
    }

    public salvaNomeUsuarioLogado(nomeUsuario: string) {
        localStorage.setItem(LocalStorageUtils.KEY_USER, nomeUsuario);
    }


    public obterTokenUsuario(): string {
        let token = localStorage.getItem(LocalStorageUtils.KEY_TOKEN);

        if (token == "undefined") token = "";

        return !token ? "" : token;
    }

    public obterIdUsuario() {
        let idUsuario = localStorage.getItem(LocalStorageUtils.KEY_ID_USARIO);

        if (idUsuario == "undefined") idUsuario = "";

        return !idUsuario ? "" : idUsuario;
    }

    public obterIdUsuarioMpm() {
        let idUsuario = localStorage.getItem(LocalStorageUtils.KEY_ID_USARIO_MPM);

        if (idUsuario == "undefined") idUsuario = "";

        return !idUsuario ? "" : idUsuario;
    }

    public obterIdCliente() {
        let idCliente = localStorage.getItem(LocalStorageUtils.KEY_ID_CLIENTE);

        if (idCliente == "undefined") idCliente = "";

        return !idCliente ? "" : idCliente;
    }

    public obterEmailUsuario() {
        let email = localStorage.getItem(LocalStorageUtils.KEY_EMAIL_USER);

        if (email == "undefined") email = "";

        return !email ? "" : email;
    }

    public obterIdEmpresaAtiva() {
        let idEmpresa = localStorage.getItem(LocalStorageUtils.KEY_ID_EMPRESA);

        if (idEmpresa == "undefined") idEmpresa = "";

        return !idEmpresa ? "" : idEmpresa;
    }

    public obterNomeUsuario() {
        let nome = localStorage.getItem(LocalStorageUtils.KEY_USER);

        if (nome == "undefined") nome = "";

        return !nome ? "" : nome;
    }

    public usuarioEstaLogado(): boolean {
        return this.obterTokenUsuario() ? true : false;
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem(LocalStorageUtils.KEY_ID_USARIO);
        localStorage.removeItem(LocalStorageUtils.KEY_USER);
        localStorage.setItem(LocalStorageUtils.KEY_ID_CLIENTE, '');
        localStorage.setItem(LocalStorageUtils.KEY_TOKEN, '');
        localStorage.setItem(LocalStorageUtils.KEY_ID_EMPRESA, '');
        localStorage.removeItem(LocalStorageUtils.KEY_ID_CLIENTE);
        localStorage.removeItem(LocalStorageUtils.KEY_TOKEN);
        localStorage.removeItem(LocalStorageUtils.KEY_ID_EMPRESA);
        localStorage.removeItem(LocalStorageUtils.KEY_LISTA_EMPRESAS);
        localStorage.removeItem(LocalStorageUtils.KEY_MENUS_ATIVOS);
        localStorage.removeItem(LocalStorageUtils.KEY_PERMISSOES);
    }

    public salvarDados(chave: string, valor: string) {
        localStorage.setItem(chave, valor);
    }

    public obterDados(chave: string): string {
        let valor = localStorage.getItem(chave);

        if (valor == "undefined") valor = "";

        return !valor ? "" : valor;
    }

    public obterConfiguracaoMenusVisiveis(): ConfiguracaoMenusVisiveis {
        let menus = localStorage.getItem(LocalStorageUtils.KEY_MENUS_ATIVOS);

        return menus == null ? new ConfiguracaoMenusVisiveis() : JSON.parse(menus);
    }

    public salvaConfiguracaoMenusVisiveis(configuracao: ConfiguracaoMenusVisiveis) {
        localStorage.setItem(LocalStorageUtils.KEY_MENUS_ATIVOS, JSON.stringify(configuracao));
    }
    public obterConfiguracaoMenusPermissoes(): Permissoes {
        let permissoes = localStorage.getItem(LocalStorageUtils.KEY_PERMISSOES);

        return permissoes == null ? new Permissoes() : JSON.parse(permissoes);
    }

    public usuarioPossuiPermissao(permissaoASerValidada: string | string[]): boolean {
        let permissoesUsuario = this.obterConfiguracaoMenusPermissoes();

        const featureList = typeof permissaoASerValidada === 'string' ? [permissaoASerValidada] : permissaoASerValidada;

        if (permissoesUsuario.menus_liberados && permissoesUsuario.menus_liberados.length > 0) {
            const hasPermission = featureList.some(featureName =>
                permissoesUsuario.menus_liberados.includes(featureName)
            );

            if (hasPermission) {
                return true;
            }
        }

        return false;
    }

}