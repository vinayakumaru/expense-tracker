import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpensesTable from '../components/ExpensesTable';
import ExpenseFormDialog from '../components/ExpenseFormDialog';
import DropdownFilter from '../components/DropDownFilter';
import { Expense } from '@/types/expense';

const years = [2020, 2021, 2022, 2023, 2024, 2025];
const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July'},
    { value: 8, label: 'August'},
    { value: 8, label: 'September'},
    { value: 10, label: 'October'},
    { value: 11, label: 'November'},
    { value: 12, label: 'December'},
];

export default function ExpensesPage() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [year, setYear] = useState(2025);
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