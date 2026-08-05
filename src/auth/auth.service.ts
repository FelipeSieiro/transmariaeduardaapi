import bcrypt from "bcrypt";
import { AppError } from "../errors/AppError";
import { AuthRepository } from "./auth.repository";
import { CreateUserDTO, LoginDTO } from "./auth.types";
import { generateToken } from "../utils/jwt";
import { supabase } from "../config/supabase.js";

export class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    async register(data: CreateUserDTO & { password: string }) {
        const existingUser = await this.authRepository.findByEmail(data.email);

        if (existingUser) {
            throw new AppError("Usuário já cadastrado", 409);
        }

        const passwordHash = await bcrypt.hash(data.password, 10);

        const user = await this.authRepository.create({
            nome: data.nome,
            email: data.email,
            senha_hash: passwordHash,
            perfil: data.perfil || "user",
            ativo: true
        });

        const token = generateToken({
            id: user.id,
            email: user.email,
            perfil: user.perfil
        });

        const { senha_hash, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token
        };
    }

    async login(data: LoginDTO) {
        const user = await this.authRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError("Email ou senha inválidos", 401);
        }

        if (user.ativo === false) {
            throw new AppError("Usuário desativado no sistema", 403);
        }

        const passwordMatch = await bcrypt.compare(
            data.password,
            user.senha_hash
        );

        if (!passwordMatch) {
            throw new AppError("Email ou senha inválidos", 401);
        }

        // Atualizar ultimo_login
        await supabase
            .from("usuarios")
            .update({ ultimo_login: new Date().toISOString() })
            .eq("id", user.id);

        const token = generateToken({
            id: user.id,
            email: user.email,
            perfil: user.perfil
        });

        const { senha_hash, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token
        };
    }

    async findProfile(id: string) {
        const user = await this.authRepository.findById(id);

        if (!user) {
            throw new AppError("Usuário não encontrado", 404);
        }

        const { senha_hash, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }
}