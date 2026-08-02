import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "API online",
    timestamp: new Date().toISOString(),
  });
});

export { healthRouter };