import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, MenuItem } from '@mui/material';
import { Expense } from '@/types/expense';
import { useAddExpense, useUpdateExpense } from '@/hooks/useExpenses';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const expenseSchema = yup.object({
  date: yup.string().required('Date is required'),
  amount: yup.number().typeError('Amount must be a number').positive('Amount must be positive').required('Amount is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  paymentMode: yup.string().required('Payment mode is required'),
});

const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities', 'Health', 'Other'];
const paymentModes = ['Credit Card', 'Debit Card', 'Cash', 'Online Banking'];

interface ExpenseFormDialogProps {
  open: boolean;
  onClose: () => void;
  expenseToEdit?: Expense | null;
}

type FormValues = Omit<Expense, 'id'>;

export default function ExpenseFormDialog({ open, onClose, expenseToEdit }: ExpenseFormDialogProps) {
  const addExpense = useAddExpense();
  const updateExpense = useUpdateExpense();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(expenseSchema),
  });
  
  useEffect(() => {
    if (open) {
      const defaultValues: FormValues = {
        date: expenseToEdit?.date || dayjs().format('YYYY-MM-DD'),
        amount: expenseToEdit?.amount || 0,
        category: expenseToEdit?.category || '',
        description: expenseToEdit?.description || '',
        paymentMode: expenseToEdit?.paymentMode || '',
      };
      reset(defaultValues);
    }
  }, [open, expenseToEdit, reset]);

  const handleClose = () => {
    onClose();
  };
  
  const onSubmit = (data: FormValues) => {
    if (expenseToEdit) {
      updateExpense.mutate({ ...data, id: expenseToEdit.id }, {
        onSuccess: handleClose,
      });
    } else {
      addExpense.mutate(data, {
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
                <TextField {...field} type="date" label="Date" error={!!error} helperText={error?.message} InputLabelProps={{ shrink: true }} />
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
              name="category"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} select label="Category" error={!!error} helperText={error?.message}>
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
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
              name="paymentMode"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField {...field} select label="Payment Mode" error={!!error} helperText={error?.message}>
                   {paymentModes.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
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