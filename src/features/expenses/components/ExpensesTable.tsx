import { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Box, Typography, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { Expense } from '@/types/expense';
import { useExpenses, useDeleteExpense } from '@/hooks/useExpenses';

interface ExpensesTableProps {
  onEdit: (expense: Expense) => void;
  year: number;
  month: number;
}

export default function ExpensesTable({ onEdit, year, month}: ExpensesTableProps) {
  const { data: expenses = [], isLoading, isError } = useExpenses();
  const deleteExpense = useDeleteExpense();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (isError) return <Typography color="error">Failed to load expenses.</Typography>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="expenses table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Coin Nest</TableCell>
              <TableCell>Payment Mode</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses
              .filter(
                (row) =>
                  dayjs(row.date).year() === year &&
                  dayjs(row.date).month() === month
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell>{dayjs(row.date).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">{`$${row.amount.toFixed(2)}`}</TableCell>
                  <TableCell align="right">{`₹${row.amountToWallet?.toFixed(2) ?? '-'}`}</TableCell>
                  <TableCell>{row.paymentMode}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => onEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => deleteExpense.mutate(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={expenses
              .filter(
                (row) =>
                  dayjs(row.date).year() === year &&
                  dayjs(row.date).month() === month
              ).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}