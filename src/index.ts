import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import expenseController from "./expenses/expenseController";
import categoryController from "./categories/categoryController";
import keywordController from "./keywords/keywordController";
import metricController from "./metrics/metricController";


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.post("/api/login", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/api/expenses", (req: Request, res: Response) => {
  return expenseController.getExpenses(req, res);
});

app.post("/api/expenses", (req: Request, res: Response) => {
  return expenseController.addExpense(req, res);
});

app.get("/api/expenses/:id", (req: Request, res: Response) => {
  return expenseController.getExpenseById(req, res);
});

app.put("/api/expenses/:id", (req: Request, res: Response) => {
  return expenseController.updateExpense(req, res);
});

app.delete("/api/expenses/:id", (req: Request, res: Response) => {
  return expenseController.deleteExpense(req, res);
});

app.get("/api/categories", async (req: Request, res: Response) => {
  return await categoryController.getAll(req, res);
});

app.post("/api/categories", async (req: Request, res: Response) => {
  return await categoryController.addCategory(req, res);
});

app.get("/api/categories/:id", (req: Request, res: Response) => {
  return categoryController.getById(req, res);
});

app.put("/api/categories/:id", (req: Request, res: Response) => {
  return categoryController.update(req, res);
});

app.delete("/api/categories/:id", (req: Request, res: Response) => {
  return categoryController.remove(req, res);
});

app.get("/api/metrics", (req: Request, res: Response) => {
  return metricController.getMetrics(res);
});

app.get("/api/keywords", (req: Request, res: Response) => {
  return keywordController.getKeywords(req, res);
});

app.put("/api/keywords/:id", (req: Request, res: Response) => {
  return keywordController.getKeywordById(req, res);
});

app.post("/api/keywords", (req: Request, res: Response) => {
  return keywordController.addKeyword(req, res);
});

app.delete("/api/keywords/:id", (req: Request, res: Response) => {
  return keywordController.deleteKeyword(req, res);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
