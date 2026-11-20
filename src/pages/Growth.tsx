import { useState } from 'react';
import { TrendingUp, Target, Calculator } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { growthProjections, netWorthHistory } from '../data/mockData';

export default function Growth() {
  const [scenario, setScenario] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate');
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [returnRate, setReturnRate] = useState(scenario === 'conservative' ? 6 : scenario === 'moderate' ? 9 : 13);

  const scenarios = {
    conservative: { label: 'Conservative', rate: '5-7%', color: '#6366f1', description: 'Bonds, CDs, and stable investments' },
    moderate: { label: 'Moderate', rate: '8-10%', color: '#10b981', description: 'Balanced portfolio (60/40 stocks/bonds)' },
    aggressive: { label: 'Aggressive', rate: '12-15%', color: '#f59e0b', description: 'Growth stocks, crypto, and emerging markets' },
  };

  const currentData = growthProjections[scenario];

  // Calculate custom projection
  const calculateProjection = (principal: number, monthly: number, rate: number, years: number) => {
    const projections = [];
    const monthlyRate = rate / 100 / 12;
    let balance = principal;
    const startYear = 2026;

    for (let i = 0; i <= years; i++) {
      projections.push({
        year: String(startYear + i),
        value: Math.round(balance),
        contributions: Math.round(principal + monthly * 12 * i),
      });
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + monthly;
      }
    }
    return projections;
  };

  const customProjection = calculateProjection(77906, monthlyContribution, returnRate, 10);

  const chartData = currentData.map((item, index) => ({
    year: item.year,
    [scenarios[scenario].label]: item.value,
    contributions: customProjection[index]?.contributions || 0,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Growth Projections</h2>
        <p className="text-slate-500 mt-1">See how your money can grow over the next 10 years</p>
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.entries(scenarios) as [string, typeof scenarios.conservative][]).map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              setScenario(key as typeof scenario);
              setReturnRate(key === 'conservative' ? 6 : key === 'moderate' ? 9 : 13);
            }}
            className={`p-5 rounded-2xl border-2 text-left transition-all ${
              scenario === key
                ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/10'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: value.color }} />
              <span className="font-semibold text-slate-800">{value.label}</span>
            </div>
            <p className="text-sm text-slate-500">{value.description}</p>
            <p className="text-lg font-bold mt-2" style={{ color: value.color }}>{value.rate} annual return</p>
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-slate-800">10-Year Growth Projection</h3>
            <p className="text-sm text-slate-400">
              {scenarios[scenario].label} scenario • Starting from ${netWorthHistory[netWorthHistory.length - 1].netWorth.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Projected 2036 Value</p>
            <p className="text-xl font-bold text-emerald-600">
              ${currentData[currentData.length - 1].value.toLocaleString()}
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={currentData}>
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={scenarios[scenario].color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={scenarios[scenario].color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Projected Value']}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={scenarios[scenario].color}
              strokeWidth={2}
              fill="url(#growthGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Calculator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calculator size={20} className="text-indigo-600" />
          <h3 className="font-semibold text-slate-800">Custom Growth Calculator</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Monthly Contribution</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-600 mb-1 block">Expected Annual Return (%)</label>
              <input
                type="number"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                step="0.5"
                min="1"
                max="30"
              />
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500">With ${monthlyContribution}/month at {returnRate}% return</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">
                ${customProjection[customProjection.length - 1]?.value.toLocaleString()}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Projected value in 10 years
              </p>
            </div>
          </div>

          <div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={customProjection}>
                <defs>
                  <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name === 'value' ? 'Total' : 'Contributions']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#customGradient)" name="Total Value" />
                <Area type="monotone" dataKey="contributions" stroke="#94a3b8" strokeWidth={1} fill="none" strokeDasharray="5 5" name="Contributions Only" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* What-If Scenarios */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target size={20} className="text-amber-600" />
          <h3 className="font-semibold text-slate-800">What-If Scenarios</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="text-sm font-medium text-amber-800">Cut Dining by 30%</p>
            <p className="text-xs text-amber-600 mt-1">Save $94/month → Invest at 9%</p>
            <p className="text-xl font-bold text-amber-800 mt-2">+$17,800</p>
            <p className="text-xs text-amber-500">Extra in 10 years</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <p className="text-sm font-medium text-emerald-800">Increase 401k by 2%</p>
            <p className="text-xs text-emerald-600 mt-1">Save $130/month → Tax-advantaged</p>
            <p className="text-xl font-bold text-emerald-800 mt-2">+$24,600</p>
            <p className="text-xs text-emerald-500">Extra in 10 years</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm font-medium text-blue-800">Refinance Student Loan</p>
            <p className="text-xs text-blue-600 mt-1">Save $45/month → Invest difference</p>
            <p className="text-xl font-bold text-blue-800 mt-2">+$8,500</p>
            <p className="text-xs text-blue-500">Extra in 10 years</p>
          </div>
        </div>
      </div>

      {/* All Scenarios Comparison */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">All Scenarios Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={growthProjections.conservative.map((item, i) => ({
            year: item.year,
            Conservative: item.value,
            Moderate: growthProjections.moderate[i].value,
            Aggressive: growthProjections.aggressive[i].value,
          }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
            />
            <Legend />
            <Area type="monotone" dataKey="Conservative" stroke="#6366f1" fill="none" strokeWidth={2} />
            <Area type="monotone" dataKey="Moderate" stroke="#10b981" fill="none" strokeWidth={2} />
            <Area type="monotone" dataKey="Aggressive" stroke="#f59e0b" fill="none" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
