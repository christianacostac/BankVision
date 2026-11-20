import { PiggyBank, TrendingUp, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import { savingsOpportunities, spendingByCategory } from '../data/mockData';

export default function Savings() {
  const totalPotentialSavings = savingsOpportunities.reduce((sum, s) => sum + s.potentialSavings, 0);
  const yearlySavings = totalPotentialSavings * 12;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Savings Opportunities</h2>
        <p className="text-slate-500 mt-1">Personalized recommendations to optimize your spending and save more</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <PiggyBank size={20} />
            <span className="text-sm text-white/80">Monthly Savings Potential</span>
          </div>
          <p className="text-3xl font-bold">${totalPotentialSavings}</p>
          <p className="text-sm text-white/70 mt-1">Per month from identified opportunities</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={20} className="text-emerald-600" />
            <span className="text-sm text-slate-500">Annual Savings Potential</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">${yearlySavings.toLocaleString()}</p>
          <p className="text-sm text-slate-400 mt-1">If all recommendations are followed</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={20} className="text-amber-500" />
            <span className="text-sm text-slate-500">Opportunities Found</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{savingsOpportunities.length}</p>
          <p className="text-sm text-slate-400 mt-1">Areas where you can save</p>
        </div>
      </div>

      {/* Budget Compliance */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Budget Compliance</h3>
        <div className="space-y-4">
          {spendingByCategory.map(item => {
            const percentage = (item.amount / item.budget) * 100;
            const isOver = percentage > 100;
            const isClose = percentage > 80 && !isOver;
            return (
              <div key={item.category} className="flex items-center gap-4">
                <div className="w-32 text-sm text-slate-600 font-medium">{item.category}</div>
                <div className="flex-1">
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOver ? 'bg-red-400' : isClose ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                    {isOver && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <AlertCircle size={12} className="text-red-600" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-24 text-right">
                  <span className={`text-sm font-medium ${isOver ? 'text-red-600' : 'text-slate-600'}`}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-28 text-right text-sm text-slate-500">
                  ${item.amount} / ${item.budget}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Savings Recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Personalized Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savingsOpportunities.map(opp => (
            <div key={opp.id} className="border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    opp.difficulty === 'Easy' ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}>
                    {opp.difficulty === 'Easy' ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <AlertCircle size={16} className="text-amber-600" />
                    )}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    opp.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {opp.difficulty}
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
                  {opp.category}
                </span>
              </div>
              <h4 className="font-semibold text-slate-800 mb-2">{opp.title}</h4>
              <p className="text-sm text-slate-500 mb-3">{opp.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <PiggyBank size={14} className="text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-600">${opp.potentialSavings}/mo</span>
                </div>
                <button className="text-xs px-3 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium">
                  Take Action
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Savings Goals Tracker */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
        <h3 className="font-semibold text-indigo-800 mb-4">Savings Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-sm font-medium text-slate-700">Vacation Fund</p>
            <p className="text-xs text-slate-400 mt-1">Target: $3,000 by June 2026</p>
            <div className="w-full h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">$1,950 / $3,000 (65%)</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-sm font-medium text-slate-700">New Laptop</p>
            <p className="text-xs text-slate-400 mt-1">Target: $2,000 by March 2026</p>
            <div className="w-full h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">$1,700 / $2,000 (85%)</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4">
            <p className="text-sm font-medium text-slate-700">Investment Buffer</p>
            <p className="text-xs text-slate-400 mt-1">Target: $5,000 by Dec 2026</p>
            <div className="w-full h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">$2,000 / $5,000 (40%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
