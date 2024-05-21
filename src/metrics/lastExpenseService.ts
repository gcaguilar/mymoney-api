import { Expense } from "@prisma/client";
import prisma from "../utils/prisma";
import findCategoryService from "./findCategoryService";
const LIMIT = 10;

async function getLastExpensesWithCategories() {
  const lastExpenses = await prisma.expense.findMany({
    take: LIMIT,
    orderBy: [
      {
        transactionDate: "desc",
      },
    ],
  });

  const lastExpensesWithCategories = await Promise.all(
    lastExpenses.map(async (expense: Expense) => {
      const category = await findCategoryService.findCategory(
        expense.categoryId
      );

      return {
        id: expense.id,
        name: expense.name,
        amount: expense.amount,
        date: expense.transactionDate,
        category: {
          id: category,
          name: category.name,
        },
      };
    })
  );

  return lastExpensesWithCategories;
}

const lastExpenseService = { getLastExpensesWithCategories };
export default lastExpenseService;
