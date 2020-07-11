import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import promBundle from "express-prom-bundle";
import express from "express";

import errorHandler from "./middlewares/error"
import LogFactory from "./utils/logger";
import apiRouter from "./routes/index";

const app = express();
app.use(promBundle({ includeMethod: true }));
app.use(LogFactory.connect("express"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiRouter);

// Error handler
app.use((req, res, next) => next(createHttpError(404)));
app.use(errorHandler);

export default app;
