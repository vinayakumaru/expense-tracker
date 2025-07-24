import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpensesTable from '../components/ExpensesTable';
import ExpenseFormDialog from '../components/ExpenseFormDialog';
import DropdownFilter from '../components/DropDownFilter';
import { Expense } from '@/types/expense';

const years = [2023, 2024, 2025];
const months = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July'},
    { value: 7, label: 'August'},
    { value: 8, label: 'September'},
    { value: 9, label: 'October'},
    { value: 10, label: 'November'},
    { value: 11, label: 'December'},
];

export default function ExpensesPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

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
          FinTrack (My Expenses)
        </Typography>

        <DropdownFilter
          year={year}
          onYearChange={setYear}
          years={years}
          month={month}
          onMonthChange={setMonth}
          months={months.map(m => m.label)}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add Expense
        </Button>
      </Box>

      <ExpensesTable
        onEdit={handleEditExpense}
        year={year}
        month={month}
      />

      <ExpenseFormDialog 
        open={isDialogOpen}
        onClose={handleCloseDialog}
        expenseToEdit={expenseToEdit}
      />
    </Box>
  );
}