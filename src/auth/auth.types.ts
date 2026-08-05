export interface User {
    id: string;
    nome: string;
    email: string;
    senha_hash: string;
    perfil: string;
    ativo: boolean | null;
    ultimo_login: string | null;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface CreateUserDTO {
    nome: string;
    email: string;
    senha_hash: string;
    perfil?: string;
    ativo?: boolean;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface JwtPayload {
    id: string;
    email: string;
    perfil: string;
}