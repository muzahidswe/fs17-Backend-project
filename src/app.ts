import express from "express";
import dotenv from 'dotenv';
import { Request, Response } from "express";
import passport from "passport";
import cors from "cors";
import pino from "pino";
import { informationLog, errorLog } from "./log/log";

const logger = pino();
const app = express();

import productsRouter from "./routers/productsRouter";
import usersRouter from "./routers/usersRouter";
import categoryRouter from "./routers/categoryRouter";
import orderRouter from "./routers/orderRouter";
import errorHandler from "./middlewares/errorHandler";

import {
  googleAuthStrategy,
  jwtStrategy,
} from "./config/passport";

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

app.use(cors())
app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(googleAuthStrategy);

// simple route without auth
app.get("/", (request: Request, response: Response) => {
  response.json({ message: "Hello World!" });
});

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Backend service is running on ${NODE_ENV} is running on port ${PORT}`);
  informationLog.info({ message: "Application restarted", time: Date.now() });
});

export default app;