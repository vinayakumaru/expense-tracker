import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpensesTable from '../components/ExpensesTable';
import ExpenseFormDialog from '../components/ExpenseFormDialog';
import { Expense } from '@/types/expense';

export default function ExpensesPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

  const handleOpenDialog = () => {
    setExpenseToEdit(null);
    setDialogOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setExpenseToEdit(expense);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setExpenseToEdit(null);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          My Expenses
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add Expense
        </Button>
      </Box>

      <ExpensesTable onEdit={handleEditExpense} />

      <ExpenseFormDialog 
        open={isDialogOpen}
        onClose={handleCloseDialog}
        expenseToEdit={expenseToEdit}
      />
    </Box>
  );
}