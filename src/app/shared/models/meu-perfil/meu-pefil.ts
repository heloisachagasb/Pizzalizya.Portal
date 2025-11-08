export class MeuPerfil{
    id: number
    id_cliente: number
    email: string
    nome: string
    caminho_foto_perfil: string
    cargo: string
    master: boolean
    vendedor: boolean
    alterar_senha_proximo_acesso: boolean
    permissoes_cadastros: PermissoesCadastros
    permissoes_financeiro: PermissoesFinanceiro
}

class PermissoesCadastros {
    ver_dados_empresa: boolean
    gerenciar_dados_empresa: boolean
    ver_usuarios: boolean
    gerenciar_usuarios: boolean
    ver_contas_bancarias: boolean
    gerenciar_contas_bancarias: boolean
    ver_categorias_financeiras: boolean
    gerenciar_categorias_financeiras: boolean
    ver_parceiros: boolean
    gerenciar_parceiros: boolean
}

class PermissoesFinanceiro {
    ver_lancamentos: boolean
    gerenciar_lancamentos: boolean
    ver_saldos_e_resultados: boolean
}