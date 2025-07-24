import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, MenuItem } from '@mui/material';
import { Expense } from '@/types/expense';
import { useAddExpense, useUpdateExpense } from '@/hooks/useExpenses';
import { useCategories, useModes } from '@/hooks/useCategoriesAndModes';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const expenseSchema = yup.object({
  date: yup.string().required('Date is required'),
  amount: yup.number().typeError('Amount must be a number').positive('Amount must be positive').required('Amount is required'),
  categoryId: yup.number().required('Category is required').nullable(),
  description: yup.string().required('Description is required'),
  modeId: yup.number().required('Payment mode is required').nullable(),
});

interface ExpenseFormDialogProps {
  open: boolean;
  onClose: () => void;
  expenseToEdit?: Expense | null;
}

type FormValues = Omit<Expense, 'id' | 'category' | 'mode' | 'savingsAmount'>;

export default function ExpenseFormDialog({ open, onClose, expenseToEdit }: ExpenseFormDialogProps) {
  const addExpense = useAddExpense();
  const updateExpense = useUpdateExpense();
  const { data: categories = [] } = useCategories();
  const { data: modes = [] } = useModes();

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(expenseSchema),
  });

  useEffect(() => {
    if (open) {
      const defaultValues : FormValues = {
        date: expenseToEdit?.date ? dayjs(expenseToEdit.date).format('YYYY-MM-DDTHH:mm') : dayjs().format('YYYY-MM-DDTHH:mm'),
        amount: expenseToEdit?.amount || 0,
        categoryId: expenseToEdit?.category?.id || null,
        description: expenseToEdit?.description || '',
        modeId: expenseToEdit?.mode?.id || null,
      };
      reset(defaultValues);
    }
  }, [open, expenseToEdit, reset]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      date: dayjs(data.date).toISOString(),
    };

    if (expenseToEdit) {
      updateExpense.mutate({ ...payload, id: expenseToEdit.id }, {
        onSuccess: handleClose,
      });
    } else {
      addExpense.mutate(payload, {
        onSuccess: handleClose,
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{expenseToEdit ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} pt={1}>
            <Controller
              name="date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} type="datetime-local" label="Date" error={!!error} helperText={error?.message} InputLabelProps={{ shrink: true }} />
              )}
            />
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} type="number" label="Amount" error={!!error} helperText={error?.message} />
              )}
            />
            <Controller
              name="categoryId"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} select label="Category" error={!!error} helperText={error?.message}>
                  {categories.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                  ))}
                </TextField>
              )}
            />
             <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} label="Description" error={!!error} helperText={error?.message} />
              )}
            />
            <Controller
              name="modeId"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} select label="Payment Mode" error={!!error} helperText={error?.message}>
                   {modes.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}