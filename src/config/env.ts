import "dotenv/config";

import { z } from "zod";


const envSchema = z.object({

    NODE_ENV:
        z.string()
        .default("development"),


    PORT:
        z.coerce.number()
        .default(3000),


    API_PREFIX:
        z.string()
        .default("/api"),


    SUPABASE_URL:
        z.string()
        .url(),


    SUPABASE_SERVICE_ROLE_KEY:
        z.string(),


    JWT_SECRET:
        z.string()
        .min(32),


    JWT_EXPIRES_IN:
        z.string()
        .default("5h"),

});



export const env =
    envSchema.parse(process.env);