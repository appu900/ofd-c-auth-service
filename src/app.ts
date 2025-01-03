import express, { Request, Response, NextFunction } from "express";
import logger from "./config/logger";
import createHttpError, { HttpError } from "http-errors";

const app = express();

app.get("/", (req, res, next) => {
  res.send("Authservice pinged");
});

// global error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    errors: [
      {
        type: err.name,
        msg: err.message,
        path: "",
        location: "",
      },
    ],
  });
});

export default app;
