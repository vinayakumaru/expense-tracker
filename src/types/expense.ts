export interface Expense {
    id: string;
    date: string; // ISO (YYYY-MM-DD)
    amount: number;
    category: string;
    description: string;
    paymentMode: string;
    amountToWallet?: number;
}