import { useState } from 'react';
import { Calendar, DollarSign, ToggleLeft, ToggleRight, Clock } from 'lucide-react';
import { recurringPayments } from '../data/mockData';

export default function RecurringPayments() {
  const [payments, setPayments] = useState(recurringPayments);
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');

  const togglePayment = (id: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const filteredPayments = payments.filter(p => {
    if (filter === 'active') return p.isActive;
    if (filter === 'paused') return !p.isActive;
    return true;
  });

  const totalMonthly = payments.filter(p => p.isActive).reduce((sum, p) => {
    if (p.frequency === 'monthly') return sum + p.amount;
    if (p.frequency === 'biweekly') return sum + (p.amount * 2);
    if (p.frequency === 'weekly') return sum + (p.amount * 4.33);
    if (p.frequency === 'yearly') return sum + (p.amount / 12);
    return sum;
  }, 0);

  const totalYearly = totalMonthly * 12;

  const upcomingPayments = payments
    .filter(p => p.isActive)
    .sort((a, b) => new Date(a.nextPayment).getTime() - new Date(b.nextPayment).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Recurring Payments</h2>
          <p className="text-slate-500 mt-1">Track and manage all your recurring subscriptions and bills</p>
        </div>
        <div className="flex items-center gap-2">
          {(['all', 'active', 'paused'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === f ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <DollarSign size={18} className="text-emerald-600" />
            </div>
            <span className="text-sm text-slate-500">Monthly Total</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">${totalMonthly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Calendar size={18} className="text-blue-600" />
            </div>
            <span className="text-sm text-slate-500">Yearly Total</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">${totalYearly.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Clock size={18} className="text-purple-600" />
            </div>
            <span className="text-sm text-slate-500">Active Subscriptions</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{payments.filter(p => p.isActive).length}</p>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
        <h3 className="font-semibold text-blue-800 mb-3">Upcoming Payments (Next 30 Days)</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {upcomingPayments.map(payment => (
            <div key={payment.id} className="bg-white/80 rounded-xl p-3">
              <p className="text-xs text-slate-500">{new Date(payment.nextPayment).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              <p className="text-sm font-medium text-slate-800 mt-1">{payment.name}</p>
              <p className="text-sm font-bold text-blue-700">${payment.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-slate-400 bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 font-medium">Service</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Frequency</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Next Payment</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-800">{payment.name}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-800">${payment.amount.toFixed(2)}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full capitalize">
                    {payment.frequency}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
                    {payment.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-600">
                    {new Date(payment.nextPayment).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    payment.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {payment.isActive ? 'Active' : 'Paused'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => togglePayment(payment.id)} className="text-slate-400 hover:text-emerald-500 transition-colors">
                    {payment.isActive ? (
                      <ToggleRight size={24} className="text-emerald-500" />
                    ) : (
                      <ToggleLeft size={24} />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Summary */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Spending by Category (Monthly)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(
            payments.filter(p => p.isActive).reduce((acc, p) => {
              const monthlyAmount = p.frequency === 'monthly' ? p.amount :
                p.frequency === 'biweekly' ? p.amount * 2 :
                p.frequency === 'weekly' ? p.amount * 4.33 :
                p.amount / 12;
              acc[p.category] = (acc[p.category] || 0) + monthlyAmount;
              return acc;
            }, {} as Record<string, number>)
          ).sort(([, a], [, b]) => b - a).map(([category, amount]) => (
            <div key={category} className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">{category}</p>
              <p className="text-lg font-bold text-slate-800 mt-1">${amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
