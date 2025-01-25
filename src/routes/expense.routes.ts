import express from "express";
import expenseController from "../expenses/expenseController";

const router = express.Router();

router.get("/expenses/", expenseController.getExpenses);
router.get("/expenses/:id", expenseController.getExpenseById);
router.post("/expenses", expenseController.addExpense);
router.put("/expenses/:id", expenseController.updateExpense);
router.delete("/expenses:id", expenseController.deleteExpense);

export default router;
