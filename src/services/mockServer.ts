import MockAdapter from 'axios-mock-adapter';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { apiClient } from './apiClient';
import { Expense } from '@/types/expense';

const mock = new MockAdapter(apiClient, { delayResponse: 350 });

/* ------------------------------------------------------------------ */
/* seed                                                               */
const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Utilities'];
const paymentModes = ['Credit Card', 'Debit Card', 'Cash', 'Online Banking'];
const descriptions = [
    'Lunch with colleagues', 'Gasoline for car', 'Weekly groceries', 'Movie tickets', 'Electricity bill',
    'Dinner at restaurant', 'Train ticket', 'New shoes', 'Concert', 'Water bill',
    'Breakfast', 'Taxi fare', 'Clothes', 'Museum visit', 'Internet bill'
];

// Pre-generated static amounts for each expense (5 per month, 12 months)
const staticAmounts2025: number[][] = [
    [45.23, 120.50, 33.10, 78.99, 56.75], // January
    [67.80, 150.00, 29.99, 88.20, 42.50], // February
    [110.00, 60.45, 25.30, 99.99, 70.10], // March
    [55.00, 130.75, 40.20, 85.60, 60.00], // April
    [75.25, 140.00, 38.50, 92.80, 50.30], // May
    [80.00, 120.10, 45.60, 77.90, 65.00], // June
    [95.50, 110.00, 32.40, 89.99, 58.20], // July
];

function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateStaticExpenses2025(): Expense[] {
    const expenses: Expense[] = [];
    for (let month = 1; month <= staticAmounts2025.length; month++) {
        for (let i = 0; i < 5; i++) {
            const amount = staticAmounts2025[month - 1][i];
            expenses.push({
                id: nanoid(),
                date: dayjs(`2025-${month.toString().padStart(2, '0')}-${(i + 1) * 5}`).format('YYYY-MM-DD'),
                amount,
                category: getRandom(categories),
                description: getRandom(descriptions),
                paymentMode: getRandom(paymentModes),
                amountToWallet: computeValueToAddToWallet(amount),
            });
        }
    }
    return expenses;
}

const seedExpenses: Expense[] = generateStaticExpenses2025();

let EXPENSES = [...seedExpenses];

function computeValueToAddToWallet(amount: number) {
    amount = Math.abs(amount);
    if(amount % 10 === 0) {
        return 0;
    }
    let nextRoundedValue = (parseInt((amount / 10).toString()) + 1) * 10;
    return nextRoundedValue - amount;   
}

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
  payload.amountToWallet = computeValueToAddToWallet(payload.amount);
  const created: Expense = { ...payload, id: nanoid() };
  EXPENSES.unshift(created);
  return [201, created];
});

mock.onPut(/\/expenses\/\w+/).reply(({ url, data }) => {
  const id = url!.split('/').pop();
  const index = EXPENSES.findIndex((e) => e.id === id);
  if (index === -1) return [404, { message: 'Expense not found' }];
  const updatedData = { ...JSON.parse(data), amountToWallet: computeValueToAddToWallet(JSON.parse(data).amount) };
  EXPENSES[index] = { ...EXPENSES[index], ...updatedData };
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