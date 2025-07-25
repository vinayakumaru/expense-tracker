import { useMemo } from 'react';
import { Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';
import { useExpenses } from '@/hooks/useExpenses';
import SummaryCard from '@/components/SummaryCard';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import NumbersIcon from '@mui/icons-material/Numbers';
import WalletIcon from '@mui/icons-material/Wallet';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export default function DashboardPage() {
  const { data: expenses, isLoading, isError } = useExpenses();

  const stats = useMemo(() => {
    if (!expenses) return null;

    const today = dayjs().format('YYYY-MM-DD');
    const thisMonth = dayjs().format('YYYY-MM');

    const todaysSpend = expenses
      .filter(e => dayjs(e.date).format('YYYY-MM-DD') === today)
      .reduce((acc, e) => acc + e.amount, 0);

    const thisMonthSpend = expenses
      .filter(e => dayjs(e.date).format('YYYY-MM') === thisMonth)
      .reduce((acc, e) => acc + e.amount, 0);

    const categoryTotals = expenses.reduce((acc, e) => {
      const categoryName = e.category?.name || 'Uncategorized';
      acc[categoryName] = (acc[categoryName] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0] || ['N/A', 0];

    const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));

    const dailySpend = Array.from({ length: 30 }, (_, i) => {
      const date = dayjs().subtract(i, 'day');
      const total = expenses
        .filter(e => dayjs(e.date).isSame(date, 'day'))
        .reduce((sum, e) => sum + e.amount, 0);
      return { date: date.format('MMM D'), total };
    }).reverse();

    return {
      todaysSpend,
      thisMonthSpend,
      topCategory: topCategory[0],
      totalCount: expenses.length,
      pieData,
      dailySpend,
      totalAmountInWallet: expenses.reduce((acc, e) => acc + (e.savingsAmount || 0), 0),
    };
  }, [expenses]);

  if (isLoading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (isError) return <Typography color="error">Failed to load dashboard data.</Typography>;
  if (!stats) return null;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={2.4}>
          <SummaryCard
            title="Today's Spend"
            value={`₹${stats.todaysSpend.toFixed(2)}`}
            icon={<TodayIcon />}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <SummaryCard
            title="This Month"
            value={`₹${stats.thisMonthSpend.toFixed(2)}`}
            icon={<CalendarMonthIcon />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <SummaryCard
            title="Top Category"
            value={stats.topCategory}
            icon={<CategoryIcon />}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <SummaryCard
            title="Total Expenses"
            value={stats.totalCount}
            icon={<NumbersIcon />}
            color="error.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2.4}>
          <SummaryCard
            title="My Coin Nest"
            value={`₹${stats.totalAmountInWallet.toFixed(2)}`}
            icon={<WalletIcon />}
            color="primary.main"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" gutterBottom>Daily Spend (Last 30 Days)</Typography>
            <ResponsiveContainer>
              <LineChart data={stats.dailySpend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
                <Legend
                  wrapperStyle={{ marginBottom: '10px' }}
                />
                <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" gutterBottom>Spend by Category</Typography>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={stats.pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {stats.pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
                <Legend
                  wrapperStyle={{ marginBottom: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}