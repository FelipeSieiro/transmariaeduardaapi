import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),

  PORT: z.coerce.number().int().positive(),

  API_PREFIX: z.string().min(1),

  SUPABASE_URL: z.url(),

  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  JWT_SECRET: z.string().min(10),

  JWT_EXPIRES_IN: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Variáveis de ambiente inválidas.\n");
  console.error(parsed.error.format());

  process.exit(1);
}

export const env = parsed.data;