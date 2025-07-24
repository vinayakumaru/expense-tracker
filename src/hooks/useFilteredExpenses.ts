import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';
import { Expense } from '@/types/expense';

export const useFilteredExpenses = (year: number, month: number) => {
  return useQuery({
    queryKey: ['expenses', year, month],
    queryFn: () =>
      apiClient
        .get<Expense[]>('/expenses/by-month', {
          params: { year, month: month + 1 },
        })
        .then((r) => r.data),
  });
};