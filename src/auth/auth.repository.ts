import { supabase } from "../config/supabase.js";
import { User, CreateUserDTO } from "./auth.types.js";

export class AuthRepository {
    async findByEmail(email: string): Promise<User | null> {
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("email", email)
            .is("deleted_at", null)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data as User | null;
    }

    async findById(id: string): Promise<User | null> {
        const { data, error } = await supabase
            .from("usuarios")
            .select("*")
            .eq("id", id)
            .is("deleted_at", null)
            .maybeSingle();

        if (error) {
            throw error;
        }

        return data as User | null;
    }

    async create(user: CreateUserDTO): Promise<User> {
        const { data, error } = await supabase
            .from("usuarios")
            .insert(user)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data as User;
    }
}

export const authRepository = new AuthRepository();