
import { format } from "date-fns";
import prisma from "../utils/prisma";
import findCategoryService from "./findCategoryService";

async function getSumExpenseByMonth() {
  const sumatory = await prisma.expense.groupBy({
    by: ["categoryId", "transactionDate"],
    _sum: {
      amount: true,
    },
    orderBy: {
      transactionDate: "asc",
    },
  });

  const sumatoryFormated = await Promise.all(
    sumatory.map(async (entry) => {
      const category = await findCategoryService.findCategory(entry.categoryId);

      return {
        date: format(new Date(entry.transactionDate), "yyyy-MM"),
        categoryName: category.name,
        totalAmount: entry._sum.amount,
      };
    })
  );
  return sumatoryFormated;
}

async function getSumExpenseByCategory() {
  const sumatory = await prisma.expense.groupBy({
    by: ["categoryId"],
    _sum: {
      amount: true,
    },
    orderBy: {
      categoryId: "asc",
    },
  });

  const sumatoryFormated = await Promise.all(
    sumatory.map(async (entry) => {
      const category = await findCategoryService.findCategory(entry.categoryId);

      return {
        name: category.name,
        value: entry._sum.amount,
      };
    })
  );

  return sumatoryFormated;
}

const sumatoryService = { getSumExpenseByMonth, getSumExpenseByCategory };
export default sumatoryService;
