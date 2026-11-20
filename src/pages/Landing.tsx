import { Link } from 'react-router-dom';
import {
  Shield,
  TrendingUp,
  Bell,
  Lock,
  BarChart3,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Zap,
  Eye,
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">BankVision</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-800">Features</a>
            <a href="#security" className="text-sm text-slate-600 hover:text-slate-800">Security</a>
            <a href="#about" className="text-sm text-slate-600 hover:text-slate-800">About</a>
          </div>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Launch Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-sm text-emerald-700 mb-6">
                <Zap size={14} />
                <span>Powered by Plaid Integration</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Your Finances,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500"> All in One Place</span>
              </h1>
              <p className="text-lg text-slate-500 mt-6 leading-relaxed">
                Track your net worth, monitor spending, get alerts on overspending, detect idle money, 
                and project your financial growth — all secured with enterprise-grade encryption.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                >
                  View Dashboard
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="#features"
                  className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-12">
                <div>
                  <p className="text-2xl font-bold text-slate-800">7+</p>
                  <p className="text-sm text-slate-400">Linked Accounts</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <p className="text-2xl font-bold text-slate-800">$77.9K</p>
                  <p className="text-sm text-slate-400">Net Worth Tracked</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <p className="text-2xl font-bold text-slate-800">Real-time</p>
                  <p className="text-sm text-slate-400">Data Sync</p>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
                <div className="space-y-4">
                  {/* Mini Dashboard Preview */}
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-slate-600">Net Worth</span>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+3.2%</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-800">$77,906.83</p>
                    <div className="mt-3 h-16 flex items-end gap-1">
                      {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                      <p className="text-xs text-slate-400">Assets</p>
                      <p className="text-lg font-bold text-slate-800">$79,152</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                      <p className="text-xs text-slate-400">Liabilities</p>
                      <p className="text-lg font-bold text-red-600">$1,245</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell size={14} className="text-amber-500" />
                      <span className="text-xs font-medium text-slate-600">Alert: Idle Money Detected</span>
                    </div>
                    <p className="text-xs text-slate-400">$1,200 in emergency fund could earn more in investments</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg border border-slate-100">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-emerald-500" />
                  <span className="text-xs font-medium text-slate-600">256-bit Encrypted</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-slate-100">
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-blue-500" />
                  <span className="text-xs font-medium text-slate-600">Live Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Everything You Need to Master Your Finances</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              Built for people who want complete visibility into their financial life — from daily spending to long-term wealth building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wallet, title: 'Multi-Account Aggregation', desc: 'Connect Bank of America, SoFi, Fidelity, and more. See all accounts in one dashboard.', color: 'bg-blue-100 text-blue-600' },
              { icon: BarChart3, title: 'Net Worth Tracking', desc: 'Real-time calculation of assets minus liabilities. Watch your wealth grow over time.', color: 'bg-emerald-100 text-emerald-600' },
              { icon: Bell, title: 'Smart Alerts', desc: 'Get notified via email when you overspend, when idle money is detected, or when bills are due.', color: 'bg-amber-100 text-amber-600' },
              { icon: TrendingUp, title: 'Growth Projections', desc: 'See how your money will grow in 10 years with conservative, moderate, and aggressive scenarios.', color: 'bg-purple-100 text-purple-600' },
              { icon: Zap, title: 'Idle Money Detection', desc: 'Automatically flag accounts with excess money that could be earning more elsewhere.', color: 'bg-red-100 text-red-600' },
              { icon: Lock, title: 'Bank & CC Statements', desc: 'View statements from all banks and credit cards. Track recurring payments and find savings.', color: 'bg-indigo-100 text-indigo-600' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.color} mb-4`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">Security First</h2>
              <p className="text-slate-500 mt-3">
                Your financial data is sensitive. That's why BankVision is built with enterprise-grade security from the ground up.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'JWT token authentication — no session cookies',
                  'HTTP-only encrypted requests for all API calls',
                  'AES-256 encryption for all sensitive fields',
                  'Comprehensive audit logs for all actions',
                  'Sensitive data hidden in all log outputs',
                  'No financial data stored in browser cookies',
                  'Plaid-level security for bank integrations',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Lock size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold">End-to-End Encryption</p>
                    <p className="text-sm text-slate-400">All data encrypted in transit and at rest</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Shield size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold">JWT Authentication</p>
                    <p className="text-sm text-slate-400">Secure token-based auth, no cookies</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Eye size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Audit Logging</p>
                    <p className="text-sm text-slate-400">Every action tracked, sensitive data masked</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Zap size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Plaid Integration</p>
                    <p className="text-sm text-slate-400">Bank-grade security for data access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800">Built by Christian</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            I'm a 23-year-old Software Engineer passionate about investing and financial literacy. 
            BankVision was born from my own need to track finances across multiple platforms — 
            from Bank of America to Fidelity, from crypto to credit cards. I wanted one place 
            to see it all, get alerts when I'm overspending, and understand how my money will grow.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-slate-400">Tech Stack</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">React</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">Spring Boot</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">PostgreSQL</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">Plaid</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold">Ready to Take Control?</h2>
          <p className="text-white/80 mt-3 max-w-xl mx-auto">
            Launch the dashboard to see your complete financial picture with live data from all your accounts.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-semibold mt-8 hover:bg-slate-50 transition-colors shadow-lg"
          >
            Open Dashboard
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-500" />
            <span className="text-sm text-slate-500">BankVision © 2026</span>
          </div>
          <p className="text-xs text-slate-400">Secured with JWT • Encrypted • Plaid Powered</p>
        </div>
      </footer>
    </div>
  );
}
