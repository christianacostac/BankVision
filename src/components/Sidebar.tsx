import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Repeat,
  TrendingUp,
  PiggyBank,
  Bell,
  Shield,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { alerts } from '../data/mockData';

interface SidebarProps {
  currentPage: string;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/statements', label: 'Bank Statements', icon: Wallet },
  { path: '/credit-cards', label: 'Credit Cards', icon: CreditCard },
  { path: '/recurring', label: 'Recurring Payments', icon: Repeat },
  { path: '/growth', label: 'Growth Projections', icon: TrendingUp },
  { path: '/savings', label: 'Savings Tips', icon: PiggyBank },
];

export default function Sidebar({ currentPage }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const unreadAlerts = alerts.filter(a => !a.read).length;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg shadow-lg"
      >
        {collapsed ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-slate-900 text-white transition-all duration-300 z-40 ${
          collapsed ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">BankVision</h1>
                <p className="text-xs text-slate-400">Finance Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight size={16} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Alerts badge */}
          <div className="p-4 border-t border-slate-700">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <div className="relative">
                <Bell size={20} />
                {unreadAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                    {unreadAlerts}
                  </span>
                )}
              </div>
              <span className="font-medium">Alerts</span>
            </Link>
          </div>

          {/* Security indicator */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-2 px-4 py-2">
              <Shield size={16} className="text-emerald-400" />
              <span className="text-xs text-slate-400">JWT Secured • Encrypted</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
