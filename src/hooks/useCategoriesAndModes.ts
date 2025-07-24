import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';
import { Category } from '@/types/category';
import { Mode } from '@/types/mode';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.get<Category[]>('/categories').then((r) => r.data),
  });
};

export const useModes = () => {
  return useQuery({
    queryKey: ['modes'],
    queryFn: () => apiClient.get<Mode[]>('/modes').then((r) => r.data),
  });
};