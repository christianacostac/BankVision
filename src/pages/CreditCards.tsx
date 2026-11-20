import { CreditCard as CreditCardIcon, AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { accounts, transactions } from '../data/mockData';

export default function CreditCards() {
  const creditAccounts = accounts.filter(a => a.type === 'credit');
  const creditTransactions = transactions.filter(t => t.accountId === 'acc-5');

  const monthlySpending = [
    { month: 'Aug', amount: 890 },
    { month: 'Sep', amount: 1120 },
    { month: 'Oct', amount: 980 },
    { month: 'Nov', amount: 1250 },
    { month: 'Dec', amount: 1480 },
    { month: 'Jan', amount: 1245 },
  ];

  const categoryBreakdown = [
    { category: 'Groceries', amount: 320, percentage: 26 },
    { category: 'Restaurants', amount: 312, percentage: 25 },
    { category: 'Shopping', amount: 280, percentage: 23 },
    { category: 'Entertainment', amount: 125, percentage: 10 },
    { category: 'Transportation', amount: 108, percentage: 9 },
    { category: 'Software', amount: 85, percentage: 7 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Credit Cards</h2>
        <p className="text-slate-500 mt-1">Monitor your credit card spending and utilization</p>
      </div>

      {/* Credit Card Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creditAccounts.map(card => {
          const creditLimit = 3000;
          const utilization = (Math.abs(card.balance) / creditLimit) * 100;
          return (
            <div key={card.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <CreditCardIcon size={20} />
                  <span className="text-sm text-slate-300">{card.institution}</span>
                </div>
                <span className="text-xs text-slate-400">{card.mask}</span>
              </div>
              <div className="mb-6">
                <p className="text-sm text-slate-400">Current Balance</p>
                <p className="text-3xl font-bold">${Math.abs(card.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Credit Limit</span>
                  <span className="text-white font-medium">${creditLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Utilization</span>
                  <span className={`font-medium ${utilization > 30 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {utilization.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${utilization > 30 ? 'bg-red-400' : 'bg-emerald-400'}`}
                    style={{ width: `${utilization}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Available: ${(creditLimit - Math.abs(card.balance)).toLocaleString()}</span>
                  <span>Due: Feb 15</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Alerts Card */}
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-red-600" />
              <h3 className="font-semibold text-red-800">High Utilization Alert</h3>
            </div>
            <p className="text-sm text-red-700">
              Your credit card utilization is at 41.5%. This is above the recommended 30% threshold. 
              Consider paying down your balance to improve your credit score.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={18} className="text-amber-600" />
              <h3 className="font-semibold text-amber-800">Spending Trend</h3>
            </div>
            <p className="text-sm text-amber-700">
              Your credit card spending has increased 18% compared to last month. 
              Restaurant and shopping categories are driving the increase.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={18} className="text-emerald-600" />
              <h3 className="font-semibold text-emerald-800">Rewards Earned</h3>
            </div>
            <p className="text-sm text-emerald-700">
              You've earned $24.90 in cashback rewards this month. 
              At this rate, you'll earn $298.80 annually.
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Spending Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-2">Monthly Credit Card Spending</h3>
        <p className="text-sm text-slate-400 mb-6">Last 6 months</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlySpending}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(value: number) => [`$${value}`, 'Spending']} contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Spending by Category</h3>
          <div className="space-y-3">
            {categoryBreakdown.map(item => (
              <div key={item.category} className="flex items-center gap-3">
                <div className="w-20 text-sm text-slate-600">{item.category}</div>
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-400 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="w-16 text-right text-sm font-medium text-slate-700">${item.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Credit Card Transactions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {creditTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{tx.description}</p>
                  <p className="text-xs text-slate-400">{tx.date} • {tx.category}</p>
                </div>
                <p className="text-sm font-semibold text-red-600">-${Math.abs(tx.amount).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
