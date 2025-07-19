import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // tree-shakable plugin
import { Expense } from '@/types/expense';

export const exportCSV = (expenses: Expense[]) => {
  const data = expenses.map(({ id, ...rest }) => rest);
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
    head: [['Date', 'Category', 'Description', 'Amount ($)', 'Payment Mode']],
    body: expenses.map((e) => [e.date, e.category, e.description, e.amount.toFixed(2), e.paymentMode]),
    startY: 20,
    didDrawPage: (data) => {
        doc.setFontSize(20);
        doc.text('Expense Report', data.settings.margin.left, 15);
    },
  });
  doc.save(`expenses_${Date.now()}.pdf`);
};