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