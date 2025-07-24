import { Category } from './category';
import { Mode } from './mode';

export interface Expense {
  id: number;
  date: string;
  amount: number;
  description: string;
  savingsAmount: number;

  category: Category | null;
  mode: Mode | null;

  categoryId?: number | null;
  modeId?: number | null;
}