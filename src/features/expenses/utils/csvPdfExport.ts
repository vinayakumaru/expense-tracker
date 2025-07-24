import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Expense } from '@/types/expense';

export const exportCSV = (expenses: Expense[]) => {
  const data = expenses.map(e => ({
    date: e.date,
    category: e.category?.name ?? 'N/A',
    description: e.description,
    amount: e.amount,
    savingsAmount: e.savingsAmount,
    payment_mode: e.mode?.name ?? 'N/A',
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `expenses_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportPDF = (expenses: Expense[]) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['Date', 'Category', 'Description', 'Amount (₹)', 'Coin Nest (₹)', 'Payment Mode']],
    body: expenses.map((e) => [
      e.date,
      e.category?.name ?? 'N/A',
      e.description,
      e.amount.toFixed(2),
      e.savingsAmount.toFixed(2),
      e.mode?.name ?? 'N/A',
    ]),
    startY: 20,
    didDrawPage: (data) => {
      doc.setFontSize(20);
      doc.text('Expense Report', data.settings.margin.left, 15);
    },
  });
  doc.save(`expenses_${Date.now()}.pdf`);
};