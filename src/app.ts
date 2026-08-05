import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { router } from "./routes/index.js";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin: "*",
  }),
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(env.API_PREFIX, router);

app.use((_, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;