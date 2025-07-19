import { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useExpenses } from '@/hooks/useExpenses';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const { data: expenses, isLoading, isError } = useExpenses();

  const filteredExpenses = expenses?.filter(expense => 
    dayjs(expense.date).isSame(selectedDate, 'day')
  ) || [];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="h4" gutterBottom>Calendar View</Typography>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
        <Paper sx={{ flexShrink: 0 }}>
          <StaticDatePicker
            orientation="portrait"
            openTo="day"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </Paper>
        <Paper sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Expenses for {selectedDate ? selectedDate.format('MMMM D, YYYY') : 'selected date'}
          </Typography>
          {isLoading && <CircularProgress />}
          {isError && <Typography color="error">Could not load expenses.</Typography>}
          {!isLoading && !isError && (
            <List>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense, index) => (
                  <>
                    <ListItem key={expense.id}>
                      <ListItemText
                        primary={`${expense.category}: ${expense.description}`}
                        secondary={`$${expense.amount.toFixed(2)} - ${expense.paymentMode}`}
                      />
                    </ListItem>
                    {index < filteredExpenses.length - 1 && <Divider />}
                  </>
                ))
              ) : (
                <Typography sx={{ p: 2 }}>No expenses recorded for this day.</Typography>
              )}
            </List>
          )}
        </Paper>
      </Box>
    </LocalizationProvider>
  );
}