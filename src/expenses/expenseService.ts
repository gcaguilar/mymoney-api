import { Expense } from "@prisma/client";
import prisma from "../utils/prisma";

async function getExpenseById(id: number) {
  return await prisma.expense.findFirstOrThrow({
    where: {
      id: id,
    },
  });
}

async function getExpenses(
  offset: number,
  latest: boolean
): Promise<Expense[]> {
  const order = latest ? "desc" : "asc";

  return await prisma.expense.findMany({
    include: {
      category: true,
    },
    orderBy: {
      transactionDate: order,
    },
    take: offset,
  });
}

async function addExpense(
  name: string,
  money: number,
  date: string,
  categoryId: number
) {
  console.log("Name", name);

  const { id } = await prisma.expense.create({
    data: {
      userId: "1",
      name: name,
      amount: money,
      transactionDate: date,
      category: {
        connect: { id: categoryId },
      },
    },
  });
  return { id };
}

async function deleteExpense(id: number) {
  return await prisma.expense.delete({
    where: {
      id: id,
    },
  });
}

async function updateExpense(
  id: number,
  expenseName: string,
  money: number,
  date: string,
  categoryid: number
) {
  return await prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      name: expenseName,
      amount: money,
      transactionDate: date,
      category: {
        connect: { id: categoryid },
      },
    },
  });
}

const expensesService = {
  getExpenses,
  getExpenseById,
  addExpense,
  deleteExpense,
  updateExpense,
};
export default expensesService;
