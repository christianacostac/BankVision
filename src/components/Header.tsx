import { Bell, Search, User } from 'lucide-react';
import { alerts } from '../data/mockData';
import { useState } from 'react';

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadAlerts = alerts.filter(a => !a.read);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions, accounts..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Bell size={20} className="text-slate-600" />
              {unreadAlerts.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>

            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {alerts.slice(0, 4).map((alert) => (
                    <div key={alert.id} className="p-3 border-b border-slate-50 hover:bg-slate-50">
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 ${
                            alert.type === 'warning' ? 'bg-amber-400' :
                            alert.type === 'danger' ? 'bg-red-400' :
                            alert.type === 'success' ? 'bg-emerald-400' : 'bg-blue-400'
                          }`}
                        />
                        <div>
                          <p className="text-sm text-slate-700">{alert.message}</p>
                          <p className="text-xs text-slate-400 mt-1">
                            {new Date(alert.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-800">Christian</p>
              <p className="text-xs text-slate-400">Software Engineer</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
