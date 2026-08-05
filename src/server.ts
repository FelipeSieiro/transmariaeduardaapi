import app from "./app.js";
import { env } from "./config/env.js";


export function startServer(): void {
  app.listen(env.PORT, () => {
    console.log("====================================");
    console.log("🚀 Transporte Escolar API");
    console.log(`🌐 http://localhost:${env.PORT}${env.API_PREFIX}`);
    console.log(`📦 Environment: ${env.NODE_ENV}`);
    console.log("====================================");
  });
}