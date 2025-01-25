import { Request, Response } from "express";
import handleAsync from "../utils/handleAsync";
import expenseService from "./expenseService";
import { mapExpenseToDTO, mapExpenseToMinimalDTO } from "./mapper";

export const getExpenses = handleAsync(async (req: Request, res: Response) => {
  const offset = req.query.offset ? Number(req.query.offset) : 10;
  const latest = req.query.latest === "true";

  const expenses = await expenseService.getExpenses(offset, latest);
  const data = expenses.map((expense) => mapExpenseToDTO(expense));

  return res.json({ data });
});

export const getExpenseById = handleAsync(
  async (req: Request, res: Response) => {
    if (!req.params.id) {
      throw new CustomError("ID is required", 400);
    }
    const minimal = req.query.minimal || false;

    const expense = await expenseService.getExpenseById(Number(req.params.id));
    const mappedExpense = minimal
      ? mapExpenseToMinimalDTO(expense)
      : mapExpenseToDTO(expense);

    return res.json({
      data: [mappedExpense],
    });
  }
);

const addExpense = handleAsync(async (req: Request, res: Response) => {
  if (!req) {
    return res.json({ status: 400 });
  }

  const { title, amount, transactionDate, category } = req.body.data;

  if (!title || !amount || !transactionDate || !category) {
    return res.json({ status: 500 });
  }

  const money = Number.parseInt(amount) * 100;

  return await expenseService.addExpense(
    title,
    money,
    transactionDate,
    category
  );
});

const deleteExpense = handleAsync(async (req: Request, res: Response) => {
  if (!req.body.id) {
    return res.json({ status: 400 });
  }

  await expenseService.deleteExpense(req.body.id);

  return res.json({ status: 200 });
});

const updateExpense = handleAsync(async (req: Request, res: Response) => {
  if (!req.body.data) {
    console.log(400);
    return res.json({ status: 400 });
  }

  const { id, title, amount, transactionDate, category } = req.body.data;

  if (!id || !title || !category || !amount || !transactionDate) {
    console.log(400);
    return res.json({ status: 500 });
  }

  const money = Number(amount); // Assuming amount is already in the correct format

  await expenseService.updateExpense(
    id,
    title,
    money,
    transactionDate,
    category
  );

  return res.json({ status: 200 });
});

const expenseController = {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
};
export default expenseController;
