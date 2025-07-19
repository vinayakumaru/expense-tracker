import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';
import { Expense } from '@/types/expense';
import { useSnackbar } from './useSnackbar';

export const useExpenses = () => {
  return useQuery({ 
    queryKey: ['expenses'], 
    queryFn: () => apiClient.get<Expense[]>('/expenses').then((r) => r.data) 
  });
};

export const useAddExpense = () => {
  const qc = useQueryClient();
  const { successSnackbar, errorSnackbar } = useSnackbar();
  
  return useMutation({
    mutationFn: (payload: Omit<Expense, 'id'>) => apiClient.post<Expense>('/expenses', payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] });
      successSnackbar('Expense added successfully!');
    },
    onError: () => {
      errorSnackbar('Failed to add expense.');
    }
  });
};

export const useUpdateExpense = () => {
  const qc = useQueryClient();
  const { successSnackbar, errorSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (body: Partial<Expense> & { id: string }) => apiClient.put<Expense>(`/expenses/${body.id}`, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] });
      successSnackbar('Expense updated successfully!');
    },
    onError: () => {
      errorSnackbar('Failed to update expense.');
    }
  });
};

export const useDeleteExpense = () => {
  const qc = useQueryClient();
  const { successSnackbar, errorSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/expenses/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['expenses'] });
      successSnackbar('Expense deleted successfully!');
    },
    onError: () => {
      errorSnackbar('Failed to delete expense.');
    }
  });
};