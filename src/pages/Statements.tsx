import { useState } from 'react';
import { Download, FileText, Building2, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { bankStatements, accounts } from '../data/mockData';

export default function Statements() {
  const [expandedStatement, setExpandedStatement] = useState<string | null>('bs-1');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('all');

  const bankAccounts = accounts.filter(a => a.type === 'checking' || a.type === 'savings');

  const filteredStatements = selectedInstitution === 'all'
    ? bankStatements
    : bankStatements.filter(s => s.institution === selectedInstitution);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Bank Statements</h2>
          <p className="text-slate-500 mt-1">View statements from all linked bank accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="all">All Institutions</option>
            <option value="Bank of America">Bank of America</option>
            <option value="SoFi">SoFi</option>
            <option value="Fidelity">Fidelity</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bankAccounts.map(account => (
          <div key={account.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                account.type === 'checking' ? 'bg-blue-100' : 'bg-emerald-100'
              }`}>
                <Building2 size={18} className={account.type === 'checking' ? 'text-blue-600' : 'text-emerald-600'} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{account.name}</p>
                <p className="text-xs text-slate-400">{account.institution}</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">
              ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {account.change24h >= 0 ? (
                <ArrowUpRight size={14} className="text-emerald-500" />
              ) : (
                <ArrowDownRight size={14} className="text-red-500" />
              )}
              <span className={`text-xs ${account.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {account.change24h >= 0 ? '+' : ''}${Math.abs(account.change24h).toFixed(2)} today
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Last sync: {new Date(account.lastUpdated).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Statements List */}
      <div className="space-y-4">
        {filteredStatements.map(statement => (
          <div key={statement.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Statement Header */}
            <button
              onClick={() => setExpandedStatement(expandedStatement === statement.id ? null : statement.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <FileText size={20} className="text-slate-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-800">{statement.institution}</p>
                  <p className="text-sm text-slate-400">
                    {statement.type} • {statement.accountNumber} • Statement Date: {statement.statementDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-slate-800">
                    ${statement.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-slate-400">{statement.transactions.length} transactions</p>
                </div>
                {expandedStatement === statement.id ? (
                  <ChevronUp size={20} className="text-slate-400" />
                ) : (
                  <ChevronDown size={20} className="text-slate-400" />
                )}
              </div>
            </button>

            {/* Expanded Transactions */}
            {expandedStatement === statement.id && (
              <div className="border-t border-slate-100">
                {statement.transactions.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-slate-400 bg-slate-50">
                        <th className="px-5 py-3 font-medium">Date</th>
                        <th className="px-5 py-3 font-medium">Description</th>
                        <th className="px-5 py-3 font-medium">Category</th>
                        <th className="px-5 py-3 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statement.transactions.map(tx => (
                        <tr key={tx.id} className="border-t border-slate-50 hover:bg-slate-50">
                          <td className="px-5 py-3 text-sm text-slate-500">{tx.date}</td>
                          <td className="px-5 py-3 text-sm font-medium text-slate-800">{tx.description}</td>
                          <td className="px-5 py-3">
                            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">{tx.category}</span>
                          </td>
                          <td className={`px-5 py-3 text-sm font-semibold text-right ${tx.amount < 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-slate-400">
                    <p>No transactions to display for this period.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Plaid Integration Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText size={16} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Data sourced via Plaid API</p>
            <p className="text-xs text-slate-500 mt-1">
              All bank data is fetched in real-time through Plaid's secure integration. 
              Data is encrypted end-to-end and synced automatically. Last sync: 2 minutes ago.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
