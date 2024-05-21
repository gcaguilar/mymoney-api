import { Request, Response } from "express";
import handleResponse from "../utils/handlePromise";
import expenseService from "./expenseService";

const getExpenses = async (req: Request, res: Response) => {
  const offset = req.query.offset ? Number(req.query.offset) : 10;
  const latest = req.query.latest === "true" || false;

  const expenses = await expenseService.getExpenses(offset, latest);
  const data = expenses.map((expense) => {
    const { updatedAt, createdAt, categoryId, userId, ...rest } = expense;
    return { ...rest };
  });

  return res.json({ data });
};

const getExpenseById = async (req: Request, res: Response) => {
  if (!req.body.id) {
    return res.json({ status: 400 });
  }

  return await handleResponse(expenseService.getExpenseById(req.body.id), res);
};

const addExpense = async (req: Request, res: Response) => {
  if (!req) {
    return res.json({ status: 400 });
  }

  const { title, amount, date, category } = req.body.data;
  const money = Number.parseInt(amount) * 100;

  return await handleResponse(
    expenseService.addExpense(title, money, date, category),
    res
  );
};

const deleteExpense = async (req: Request, res: Response) => {
  if (!req.body.id) {
    return res.json({ status: 400 });
  }

  return await handleResponse(expenseService.deleteExpense(req.body.id), res);
};

const updateExpense = async (req: Request, res: Response) => {
  if (!req) {
    return res.json({ status: 500 });
  }

  const { id, name, amount, date, category } = req.body.data;

  if (!id || !{ name } || !{ amount } || !{ date } || !{ category }) {
    return res.json({ status: 400 });
  }
  const money = Number.parseInt(amount) * 100;

  return await handleResponse(
    expenseService.updateExpense(id, name, money, date, category),
    res
  );
};

const expenseController = {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
};
export default expenseController;
