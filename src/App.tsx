import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Statements from './pages/Statements';
import CreditCards from './pages/CreditCards';
import RecurringPayments from './pages/RecurringPayments';
import Growth from './pages/Growth';
import Savings from './pages/Savings';
import Landing from './pages/Landing';

function DashboardLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentPage={location.pathname} />
      <div className="lg:ml-64">
        <Header />
        <main className="min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statements" element={<Statements />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/recurring" element={<RecurringPayments />} />
            <Route path="/growth" element={<Growth />} />
            <Route path="/savings" element={<Savings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
