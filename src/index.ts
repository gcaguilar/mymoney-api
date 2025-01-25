import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import expenseRoutes from "./routes/expense.routes";
import categoryRoutes from "./routes/categories.routes";
import keywordsRoutes from "./routes/keywords.routes";
import errorHandler from "./middlewares/error.middlewares";
import winston from "winston";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

app.use(express.json());
app.use(cors());
app.use("/api", expenseRoutes);
app.use("/api", categoryRoutes);
app.use("/api", keywordsRoutes);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
});
