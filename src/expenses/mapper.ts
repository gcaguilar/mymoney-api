import { ExpenseDTO, ExpenseMinimalDTO } from "../dto/ExpenseDTO";
import {
  CategoryDto,
  CategoryWithAssociatedNamesDto,
} from "../dto/CategoryDTO";
import { Category, ExpenseCategoryMapping, Expense } from "@prisma/client";

export function mapExpenseToDTO(expense: Expense): ExpenseDTO {
  return {
    id: expense.id,
    name: expense.name,
    amount: expense.amount,
    transactionDate: expense.transactionDate,
    category: {
      id: expense.category.id,
      name: expense.category.name,
    },
  };
}

export function mapExpenseToMinimalDTO(
  expense: ExpenseWithCategory
): ExpenseMinimalDTO {
  return {
    id: expense.id,
    name: expense.name,
    amount: expense.amount,
    transactionDate: expense.transactionDate,
    category: expense.category.id,
  };
}

export function mapCategoryToDTO(category: Category): CategoryDto {
  return {
    id: category.id,
    name: category.name,
  };
}

export function mapCategoryToDTOWithKeywords(
  category: Category,
  expenseCategoryMapping: ExpenseCategoryMapping[]
): CategoryWithAssociatedNamesDto {
  return {
    id: category.id,
    name: category.name,
    associatedNames: expenseCategoryMapping.map((item) => ({
      id: item.id,
      name: item.expenseNames,
    })),
  };
}
