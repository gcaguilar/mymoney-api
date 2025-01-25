import prisma from "../utils/prisma";

async function getExpenseById(id: number) {
  return await prisma.expense.findFirstOrThrow({
    where: {
      id: id,
      userId: "1",
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

async function getExpenses(
  offset: number,
  latest: boolean
) {
  const order = latest ? "desc" : "asc";

  return await prisma.expense.findMany({
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
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
  title: string,
  money: number,
  transactionDate: string,
  categoryid: number
) {
  return await prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      name: title,
      amount: money,
      transactionDate: transactionDate,
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
