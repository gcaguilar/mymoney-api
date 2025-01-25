import { CategoryDto, CategoryWithAssociatedNamesDto } from "./CategoryDTO";

export type ExpenseDTO = {
  id: number;
  name: string;
  amount: number;
  transactionDate: Date;
  category: CategoryDto;
};

export type ExpenseMinimalDTO = {
  id: number;
  name: string;
  amount: number;
  transactionDate: Date;
  category: number;
};

export type ExpenseWithDetailedCategoryDTO = {
  id: number;
  name: string;
  amount: number;
  transactionDate: string;
  category: CategoryWithAssociatedNamesDto;
};