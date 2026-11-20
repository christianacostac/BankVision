import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Zap,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  accounts,
  transactions,
  alerts,
  spendingByCategory,
  netWorthHistory,
  recurringPayments,
} from '../data/mockData';
import { useState } from 'react';

export default function Dashboard() {
  const [hideBalances, setHideBalances] = useState(false);
  const totalAssets = accounts.filter(a => a.balance > 0).reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = Math.abs(accounts.filter(a => a.balance < 0).reduce((sum, a) => sum + a.balance, 0));
  const netWorth = totalAssets - totalLiabilities;
  const monthlyRecurring = recurringPayments.filter(r => r.isActive).reduce((sum, r) => sum + r.amount, 0);
  const unreadAlerts = alerts.filter(a => !a.read);

  const formatCurrency = (value: number) => {
    if (hideBalances) return '••••••';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const pieData = spendingByCategory.map(s => ({
    name: s.category,
    value: s.amount,
    color: s.color,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Worth */}
        <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-xl">
              <DollarSign size={20} />
            </div>
            <button onClick={() => setHideBalances(!hideBalances)} className="p-1 hover:bg-white/10 rounded-lg">
              {hideBalances ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-sm text-white/80">Total Net Worth</p>
          <p className="text-3xl font-bold mt-1">{formatCurrency(netWorth)}</p>
          <div className="flex items-center gap-1 mt-2 text-sm text-white/80">
            <TrendingUp size={14} />
            <span>+$2,397.75 today</span>
          </div>
        </div>

        {/* Total Assets */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-xl">
              <ArrowUpRight size={20} className="text-blue-600" />
            </div>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-medium">+3.2%</span>
          </div>
          <p className="text-sm text-slate-500">Total Assets</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{formatCurrency(totalAssets)}</p>
          <p className="text-xs text-slate-400 mt-2">Across 6 accounts</p>
        </div>

        {/* Total Liabilities */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-50 rounded-xl">
              <ArrowDownRight size={20} className="text-red-600" />
            </div>
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full font-medium">-$89.50</span>
          </div>
          <p className="text-sm text-slate-500">Total Liabilities</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{formatCurrency(totalLiabilities)}</p>
          <p className="text-xs text-slate-400 mt-2">1 credit account</p>
        </div>

        {/* Monthly Recurring */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Zap size={20} className="text-purple-600" />
            </div>
            <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full font-medium">12 active</span>
          </div>
          <p className="text-sm text-slate-500">Monthly Recurring</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{formatCurrency(monthlyRecurring)}</p>
          <p className="text-xs text-slate-400 mt-2">Fixed expenses</p>
        </div>
      </div>

      {/* Alerts Section */}
      {unreadAlerts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-amber-600" />
            <h3 className="font-semibold text-amber-800">Active Alerts ({unreadAlerts.length})</h3>
          </div>
          <div className="space-y-2">
            {unreadAlerts.map(alert => (
              <div key={alert.id} className="flex items-start gap-3 p-2 bg-white/60 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  alert.type === 'warning' ? 'bg-amber-400' :
                  alert.type === 'danger' ? 'bg-red-400' :
                  alert.type === 'success' ? 'bg-emerald-400' : 'bg-blue-400'
                }`} />
                <p className="text-sm text-slate-700">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Net Worth Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-800">Net Worth Growth</h3>
              <p className="text-sm text-slate-400">Last 12 months</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <TrendingUp size={16} />
              <span>+49.8%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={netWorthHistory}>
              <defs>
                <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Net Worth']}
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
              <Area type="monotone" dataKey="netWorth" stroke="#10b981" strokeWidth={2} fill="url(#netWorthGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category Pie */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-2">Spending Breakdown</h3>
          <p className="text-sm text-slate-400 mb-4">This month</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`$${value}`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {pieData.slice(0, 6).map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-600 truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accounts Overview */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Linked Accounts</h3>
          <div className="space-y-3">
            {accounts.map(account => (
              <div key={account.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                    account.type === 'checking' ? 'bg-blue-100 text-blue-700' :
                    account.type === 'savings' ? 'bg-emerald-100 text-emerald-700' :
                    account.type === 'investment' ? 'bg-purple-100 text-purple-700' :
                    account.type === 'credit' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {account.institution.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{account.name}</p>
                    <p className="text-xs text-slate-400">{account.institution} • {account.mask}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${account.balance < 0 ? 'text-red-600' : 'text-slate-800'}`}>
                    {formatCurrency(account.balance)}
                  </p>
                  <p className={`text-xs flex items-center gap-0.5 justify-end ${account.change24h >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {account.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {formatCurrency(Math.abs(account.change24h))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget vs Actual */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Budget vs Actual</h3>
          <div className="space-y-4">
            {spendingByCategory.map(item => {
              const percentage = (item.amount / item.budget) * 100;
              const isOver = percentage > 100;
              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">{item.category}</span>
                    <span className={`text-xs font-medium ${isOver ? 'text-red-600' : 'text-slate-500'}`}>
                      ${item.amount} / ${item.budget}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${isOver ? 'bg-red-400' : 'bg-emerald-400'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 8).map(tx => (
                <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="py-3 text-sm text-slate-500">{tx.date}</td>
                  <td className="py-3 text-sm font-medium text-slate-800">{tx.description}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`py-3 text-sm font-semibold text-right ${tx.amount < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {tx.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(tx.amount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Idle Money Detection */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={18} className="text-indigo-600" />
          <h3 className="font-semibold text-indigo-800">Idle Money Detection</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Emergency Fund Excess</p>
            <p className="text-xl font-bold text-indigo-700">$1,200</p>
            <p className="text-xs text-slate-400 mt-1">Could earn 4.5% APY in investments</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Checking Account Buffer</p>
            <p className="text-xl font-bold text-indigo-700">$1,832</p>
            <p className="text-xs text-slate-400 mt-1">Above recommended $3,000 buffer</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Potential Monthly Earnings</p>
            <p className="text-xl font-bold text-emerald-700">$54</p>
            <p className="text-xs text-slate-400 mt-1">If excess moved to HYSA/investments</p>
          </div>
        </div>
      </div>
    </div>
  );
}
