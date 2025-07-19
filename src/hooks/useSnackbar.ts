import { useSnackbar as useNotistack, VariantType } from 'notistack';

export const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistack();

  const showSnackbar = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };

  return {
    successSnackbar: (message: string) => showSnackbar(message, 'success'),
    errorSnackbar: (message: string) => showSnackbar(message, 'error'),
    warningSnackbar: (message: string) => showSnackbar(message, 'warning'),
    infoSnackbar: (message: string) => showSnackbar(message, 'info'),
  };
};