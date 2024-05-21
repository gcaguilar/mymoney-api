export default interface ExpenseCategory {
  id: number;
  name: string;
  amount: Number;
  date: string;
  category: {
    id: number;
    name: string;
  };
}
