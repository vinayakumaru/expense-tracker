import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';
import { ChatResponse } from '@/types/chat';
import { useSnackbar } from './useSnackbar';

export const useChat = () => {
  const { errorSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (payload: { query: string }) =>
      apiClient.post<ChatResponse>('/chat/transaction', payload).then((r) => r.data),
    onError: () => {
      errorSnackbar('Failed to get a response from the chat service.');
    },
  });
};