// Mock data simulating Plaid API integration results

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: 'checking' | 'savings' | 'investment' | 'credit' | 'crypto';
  balance: number;
  lastUpdated: string;
  mask: string;
  change24h: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  accountId: string;
  type: 'debit' | 'credit';
}

export interface RecurringPayment {
  id: string;
  name: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  nextPayment: string;
  category: string;
  accountId: string;
  isActive: boolean;
}

export interface BankStatement {
  id: string;
  institution: string;
  accountNumber: string;
  type: string;
  balance: number;
  statementDate: string;
  transactions: Transaction[];
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  message: string;
  timestamp: string;
  read: boolean;
}

export const accounts: Account[] = [
  {
    id: 'acc-1',
    name: 'Primary Checking',
    institution: 'Bank of America',
    type: 'checking',
    balance: 4832.50,
    lastUpdated: '2026-01-15T10:30:00Z',
    mask: '****4521',
    change24h: -125.00,
  },
  {
    id: 'acc-2',
    name: 'High-Yield Savings',
    institution: 'SoFi',
    type: 'savings',
    balance: 12450.00,
    lastUpdated: '2026-01-15T09:15:00Z',
    mask: '****7832',
    change24h: 1.71,
  },
  {
    id: 'acc-3',
    name: 'Brokerage Account',
    institution: 'Fidelity',
    type: 'investment',
    balance: 34200.00,
    lastUpdated: '2026-01-15T16:00:00Z',
    mask: '****9012',
    change24h: 485.30,
  },
  {
    id: 'acc-4',
    name: 'Roth IRA',
    institution: 'Fidelity',
    type: 'investment',
    balance: 18750.00,
    lastUpdated: '2026-01-15T16:00:00Z',
    mask: '****3456',
    change24h: 212.45,
  },
  {
    id: 'acc-5',
    name: 'Rewards Credit Card',
    institution: 'Bank of America',
    type: 'credit',
    balance: -1245.67,
    lastUpdated: '2026-01-15T12:00:00Z',
    mask: '****6789',
    change24h: -89.50,
  },
  {
    id: 'acc-6',
    name: 'Crypto Portfolio',
    institution: 'Coinbase',
    type: 'crypto',
    balance: 8920.00,
    lastUpdated: '2026-01-15T15:45:00Z',
    mask: '****2345',
    change24h: -156.20,
  },
  {
    id: 'acc-7',
    name: 'Emergency Fund',
    institution: 'SoFi',
    type: 'savings',
    balance: 5000.00,
    lastUpdated: '2026-01-15T09:15:00Z',
    mask: '****1234',
    change24h: 0.68,
  },
];

export const transactions: Transaction[] = [
  { id: 't-1', date: '2026-01-15', description: 'Whole Foods Market', amount: -87.32, category: 'Groceries', accountId: 'acc-5', type: 'debit' },
  { id: 't-2', date: '2026-01-15', description: 'Direct Deposit - Employer', amount: 3250.00, category: 'Income', accountId: 'acc-1', type: 'credit' },
  { id: 't-3', date: '2026-01-14', description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', accountId: 'acc-5', type: 'debit' },
  { id: 't-4', date: '2026-01-14', description: 'Shell Gas Station', amount: -52.40, category: 'Transportation', accountId: 'acc-5', type: 'debit' },
  { id: 't-5', date: '2026-01-14', description: 'Chipotle', amount: -14.25, category: 'Restaurants', accountId: 'acc-5', type: 'debit' },
  { id: 't-6', date: '2026-01-13', description: 'Amazon.com', amount: -45.99, category: 'Shopping', accountId: 'acc-5', type: 'debit' },
  { id: 't-7', date: '2026-01-13', description: 'Transfer to Fidelity', amount: -500.00, category: 'Investment', accountId: 'acc-1', type: 'debit' },
  { id: 't-8', date: '2026-01-13', description: 'Dividend Payment - VOO', amount: 42.50, category: 'Investment Income', accountId: 'acc-3', type: 'credit' },
  { id: 't-9', date: '2026-01-12', description: 'Spotify Premium', amount: -10.99, category: 'Entertainment', accountId: 'acc-5', type: 'debit' },
  { id: 't-10', date: '2026-01-12', description: 'Target', amount: -67.83, category: 'Shopping', accountId: 'acc-5', type: 'debit' },
  { id: 't-11', date: '2026-01-11', description: 'Disc Golf Pro Shop', amount: -34.99, category: 'Recreation', accountId: 'acc-5', type: 'debit' },
  { id: 't-12', date: '2026-01-11', description: 'Uber', amount: -18.50, category: 'Transportation', accountId: 'acc-5', type: 'debit' },
  { id: 't-13', date: '2026-01-10', description: 'Electric Bill - Duke Energy', amount: -124.50, category: 'Utilities', accountId: 'acc-1', type: 'debit' },
  { id: 't-14', date: '2026-01-10', description: 'Gym Membership', amount: -49.99, category: 'Health & Fitness', accountId: 'acc-1', type: 'debit' },
  { id: 't-15', date: '2026-01-09', description: 'Freelance Payment', amount: 750.00, category: 'Income', accountId: 'acc-1', type: 'credit' },
];

export const recurringPayments: RecurringPayment[] = [
  { id: 'rp-1', name: 'Rent', amount: 1450.00, frequency: 'monthly', nextPayment: '2026-02-01', category: 'Housing', accountId: 'acc-1', isActive: true },
  { id: 'rp-2', name: 'Car Insurance', amount: 125.00, frequency: 'monthly', nextPayment: '2026-02-05', category: 'Insurance', accountId: 'acc-1', isActive: true },
  { id: 'rp-3', name: 'Netflix', amount: 15.99, frequency: 'monthly', nextPayment: '2026-02-14', category: 'Entertainment', accountId: 'acc-5', isActive: true },
  { id: 'rp-4', name: 'Spotify Premium', amount: 10.99, frequency: 'monthly', nextPayment: '2026-02-12', category: 'Entertainment', accountId: 'acc-5', isActive: true },
  { id: 'rp-5', name: 'Gym Membership', amount: 49.99, frequency: 'monthly', nextPayment: '2026-02-10', category: 'Health & Fitness', accountId: 'acc-1', isActive: true },
  { id: 'rp-6', name: 'Internet - AT&T', amount: 79.99, frequency: 'monthly', nextPayment: '2026-02-08', category: 'Utilities', accountId: 'acc-1', isActive: true },
  { id: 'rp-7', name: 'Phone Plan', amount: 65.00, frequency: 'monthly', nextPayment: '2026-02-03', category: 'Utilities', accountId: 'acc-1', isActive: true },
  { id: 'rp-8', name: 'Student Loan', amount: 285.00, frequency: 'monthly', nextPayment: '2026-02-15', category: 'Debt', accountId: 'acc-1', isActive: true },
  { id: 'rp-9', name: 'Fidelity Auto-Invest', amount: 500.00, frequency: 'biweekly', nextPayment: '2026-01-27', category: 'Investment', accountId: 'acc-1', isActive: true },
  { id: 'rp-10', name: 'AWS Cloud Hosting', amount: 24.99, frequency: 'monthly', nextPayment: '2026-02-01', category: 'Software', accountId: 'acc-5', isActive: true },
  { id: 'rp-11', name: 'ChatGPT Plus', amount: 20.00, frequency: 'monthly', nextPayment: '2026-02-09', category: 'Software', accountId: 'acc-5', isActive: true },
  { id: 'rp-12', name: 'Disc World Magazine', amount: 8.99, frequency: 'monthly', nextPayment: '2026-02-01', category: 'Recreation', accountId: 'acc-5', isActive: true },
];

export const alerts: Alert[] = [
  { id: 'a-1', type: 'warning', message: 'Your checking account balance is lower than usual. Consider transferring from savings.', timestamp: '2026-01-15T10:30:00Z', read: false },
  { id: 'a-2', type: 'info', message: 'You have $5,000 in your emergency fund - this exceeds your 3-month target by $1,200.', timestamp: '2026-01-15T09:00:00Z', read: false },
  { id: 'a-3', type: 'success', message: 'Your Fidelity portfolio gained $485.30 in the last 24 hours!', timestamp: '2026-01-15T16:00:00Z', read: false },
  { id: 'a-4', type: 'danger', message: 'Credit card utilization at 42%. Consider paying down balance to below 30%.', timestamp: '2026-01-14T12:00:00Z', read: true },
  { id: 'a-5', type: 'warning', message: 'Restaurant spending is 23% higher than last month ($312 vs $254).', timestamp: '2026-01-13T08:00:00Z', read: true },
  { id: 'a-6', type: 'info', message: 'Auto-transfer of $500 to Fidelity scheduled for Jan 27.', timestamp: '2026-01-12T10:00:00Z', read: true },
];

export const spendingByCategory = [
  { category: 'Housing', amount: 1450, budget: 1500, color: '#6366f1' },
  { category: 'Food & Dining', amount: 485, budget: 500, color: '#f59e0b' },
  { category: 'Transportation', amount: 210, budget: 300, color: '#10b981' },
  { category: 'Entertainment', amount: 125, budget: 150, color: '#8b5cf6' },
  { category: 'Shopping', amount: 280, budget: 200, color: '#ef4444' },
  { category: 'Utilities', amount: 270, budget: 300, color: '#06b6d4' },
  { category: 'Health & Fitness', amount: 50, budget: 75, color: '#ec4899' },
  { category: 'Recreation', amount: 44, budget: 100, color: '#84cc16' },
  { category: 'Software & Subscriptions', amount: 54, budget: 60, color: '#f97316' },
  { category: 'Investments', amount: 1000, budget: 1000, color: '#14b8a6' },
];

export const netWorthHistory = [
  { month: 'Feb 2025', netWorth: 52000 },
  { month: 'Mar 2025', netWorth: 54200 },
  { month: 'Apr 2025', netWorth: 55800 },
  { month: 'May 2025', netWorth: 57100 },
  { month: 'Jun 2025', netWorth: 58900 },
  { month: 'Jul 2025', netWorth: 60200 },
  { month: 'Aug 2025', netWorth: 61500 },
  { month: 'Sep 2025', netWorth: 63800 },
  { month: 'Oct 2025', netWorth: 65200 },
  { month: 'Nov 2025', netWorth: 67400 },
  { month: 'Dec 2025', netWorth: 70100 },
  { month: 'Jan 2026', netWorth: 77906 },
];

export const growthProjections = {
  conservative: [
    { year: '2026', value: 82000 },
    { year: '2027', value: 87500 },
    { year: '2028', value: 93200 },
    { year: '2029', value: 99500 },
    { year: '2030', value: 106000 },
    { year: '2031', value: 113000 },
    { year: '2032', value: 120500 },
    { year: '2033', value: 128500 },
    { year: '2034', value: 137000 },
    { year: '2035', value: 146000 },
    { year: '2036', value: 155500 },
  ],
  moderate: [
    { year: '2026', value: 85000 },
    { year: '2027', value: 94000 },
    { year: '2028', value: 105000 },
    { year: '2029', value: 118000 },
    { year: '2030', value: 133000 },
    { year: '2031', value: 150000 },
    { year: '2032', value: 170000 },
    { year: '2033', value: 193000 },
    { year: '2034', value: 219000 },
    { year: '2035', value: 248000 },
    { year: '2036', value: 281000 },
  ],
  aggressive: [
    { year: '2026', value: 90000 },
    { year: '2027', value: 108000 },
    { year: '2028', value: 132000 },
    { year: '2029', value: 161000 },
    { year: '2030', value: 196000 },
    { year: '2031', value: 239000 },
    { year: '2032', value: 291000 },
    { year: '2033', value: 354000 },
    { year: '2034', value: 430000 },
    { year: '2035', value: 523000 },
    { year: '2036', value: 636000 },
  ],
};

export const savingsOpportunities = [
  {
    id: 's-1',
    title: 'Reduce Restaurant Spending',
    description: 'You spent $312 on restaurants this month vs $254 last month. Cutting back 20% could save ~$62/month.',
    potentialSavings: 62,
    category: 'Restaurants',
    difficulty: 'Easy',
  },
  {
    id: 's-2',
    title: 'Move Excess Emergency Fund',
    description: 'Your emergency fund has $1,200 more than needed. Move to high-yield investment for better returns.',
    potentialSavings: 54,
    category: 'Savings',
    difficulty: 'Easy',
  },
  {
    id: 's-3',
    title: 'Optimize Subscription Bundle',
    description: 'Consider bundling streaming services. You have Netflix + Spotify separately.',
    potentialSavings: 8,
    category: 'Entertainment',
    difficulty: 'Easy',
  },
  {
    id: 's-4',
    title: 'Refinance Student Loan',
    description: 'Current rates are lower. Refinancing could save $45/month on your student loan.',
    potentialSavings: 45,
    category: 'Debt',
    difficulty: 'Medium',
  },
  {
    id: 's-5',
    title: 'Reduce Shopping Expenses',
    description: 'Shopping is 40% over budget this month. Setting up alerts could help.',
    potentialSavings: 80,
    category: 'Shopping',
    difficulty: 'Medium',
  },
  {
    id: 's-6',
    title: 'Disc Golf Budget',
    description: 'You\'ve spent $35 on disc golf this month. Setting a monthly limit of $25 saves $10.',
    potentialSavings: 10,
    category: 'Recreation',
    difficulty: 'Easy',
  },
];

export const bankStatements: BankStatement[] = [
  {
    id: 'bs-1',
    institution: 'Bank of America',
    accountNumber: '****4521',
    type: 'Checking',
    balance: 4832.50,
    statementDate: '2026-01-15',
    transactions: transactions.filter(t => t.accountId === 'acc-1' || t.accountId === 'acc-5'),
  },
  {
    id: 'bs-2',
    institution: 'SoFi',
    accountNumber: '****7832',
    type: 'High-Yield Savings',
    balance: 12450.00,
    statementDate: '2026-01-15',
    transactions: [],
  },
  {
    id: 'bs-3',
    institution: 'Fidelity',
    accountNumber: '****9012',
    type: 'Brokerage',
    balance: 34200.00,
    statementDate: '2026-01-15',
    transactions: transactions.filter(t => t.accountId === 'acc-3' || t.accountId === 'acc-4'),
  },
];
