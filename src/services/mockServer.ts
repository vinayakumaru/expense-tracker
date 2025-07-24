import MockAdapter from 'axios-mock-adapter';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { apiClient } from './apiClient';
import { Expense } from '@/types/expense';

const mock = new MockAdapter(apiClient, { delayResponse: 350 });

/* ------------------------------------------------------------------ */
/* seed                                                               */
const seedExpenses: Expense[] = [
  { id: nanoid(), date: dayjs().subtract(0, 'day').format('YYYY-MM-DD'), amount: 25.5, category: 'Food', description: 'Lunch with colleagues', paymentMode: 'Credit Card' },
  { id: nanoid(), date: dayjs().subtract(1, 'day').format('YYYY-MM-DD'), amount: 42,   category: 'Transport', description: 'Gasoline for car',  paymentMode: 'Debit Card' },
  { id: nanoid(), date: dayjs().subtract(3, 'day').format('YYYY-MM-DD'), amount: 119,  category: 'Shopping', description: 'Weekly groceries', paymentMode: 'Cash' },
  { id: nanoid(), date: dayjs().subtract(5, 'day').format('YYYY-MM-DD'), amount: 75, category: 'Entertainment', description: 'Movie tickets', paymentMode: 'Credit Card' },
  { id: nanoid(), date: dayjs().subtract(10, 'day').format('YYYY-MM-DD'), amount: 250, category: 'Utilities', description: 'Electricity bill', paymentMode: 'Online Banking' },
];

let EXPENSES = [...seedExpenses];

/* ------------------------------------------------------------------ */
/* -------- AUTH -------- */
mock.onPost('/auth/login').reply(({ data }) => {
  const { email } = JSON.parse(data);
  // demo accepts any credentials
  const accessToken = `demo-token-${Date.now()}`;
  return [200, { accessToken, user: { id: 'user-1', name: 'Demo User', email } }];
});

/* -------- EXPENSES CRUD -------- */
mock.onGet('/expenses').reply(200, EXPENSES);

mock.onPost('/expenses').reply(({ data }) => {
  const payload = JSON.parse(data);
  const created: Expense = { ...payload, id: nanoid() };
  EXPENSES.unshift(created);
  return [201, created];
});

mock.onPut(/\/expenses\/\w+/).reply(({ url, data }) => {
  const id = url!.split('/').pop();
  const index = EXPENSES.findIndex((e) => e.id === id);
  if (index === -1) return [404, { message: 'Expense not found' }];

  EXPENSES[index] = { ...EXPENSES[index], ...JSON.parse(data) };
  return [200, EXPENSES[index]];
});

mock.onDelete(/\/expenses\/\w+/).reply(({ url }) => {
  const id = url!.split('/').pop();
  EXPENSES = EXPENSES.filter((e) => e.id !== id);
  return [204];
});

/* -------- CHAT -------- */
mock.onPost('/chat/transaction').reply(({ data }) => {
  const { query } = JSON.parse(data);

  if (query.toLowerCase().includes('top 5')) {
    const topExpenses = [...EXPENSES]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map(e => ({ name: e.description, value: e.amount }));

    return [200, {
      text: 'Here are your top 5 expenses:',
      data: topExpenses,
      graphType: 'bar',
    }];
  }

  if (query.toLowerCase().includes('food')) {
    const foodExpenses = EXPENSES.filter(e => e.category === 'Food');
    const total = foodExpenses.reduce((sum, e) => sum + e.amount, 0);

    return [200, {
      text: `You have spent a total of $${total.toFixed(2)} on food.`,
      data: foodExpenses.map(e => ({ name: e.description, value: e.amount })),
      graphType: 'bar',
    }];
  }

  if (query.toLowerCase().includes('category')) {
    const categoryTotals = EXPENSES.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }));

    return [200, {
      text: 'Here is a breakdown of your expenses by category:',
      data: pieData,
      graphType: 'pie',
    }];
  }

  return [200, {
    text: "I'm sorry, I can only provide information about top expenses and food spending at the moment.",
  }];
});