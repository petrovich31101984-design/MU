import { useState } from 'react';
import Layout from './components/Layout';
import LayoutStorekeeper from './components/LayoutStorekeeper';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Nomenclature from './components/Nomenclature';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Report from './components/Report';
import Journal from './components/Journal';
import Chat from './components/Chat';
import Returns from './components/Returns';
import Archive from './components/Archive';
import DashboardStorekeeper from './components/DashboardStorekeeper';
import NomenclatureStorekeeper from './components/NomenclatureStorekeeper';
import IncomeStorekeeper from './components/IncomeStorekeeper';
import StockStorekeeper from './components/StockStorekeeper';
import ReturnsStorekeeper from './components/ReturnsStorekeeper';
import ChatStorekeeper from './components/ChatStorekeeper';
import ReportStorekeeper from './components/ReportStorekeeper';

type UserRole = 'admin' | 'storekeeper';

function App() {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage('dashboard'); // Сброс на главную при смене роли
  };

  const renderPage = () => {
    if (userRole === 'admin') {
      // Приложение руководителя
      switch (currentPage) {
        case 'dashboard': return <Dashboard onNavigate={setCurrentPage} />;
        case 'employees': return <Employees />;
        case 'nomenclature': return <Nomenclature />;
        case 'income': return <Income />;
        case 'expenses': return <Expenses />;
        case 'returns': return <Returns />;
        case 'chat': return <Chat />;
        case 'report': return <Report />;
        case 'journal': return <Journal />;
        case 'archive': return <Archive />;
        default: return <Dashboard />;
      }
    } else {
      // Приложение кладовщика
      switch (currentPage) {
        case 'dashboard': return <DashboardStorekeeper onNavigate={setCurrentPage} />;
        case 'nomenclature': return <NomenclatureStorekeeper />;
        case 'income': return <IncomeStorekeeper />;
        case 'stock': return <StockStorekeeper />;
        case 'returns': return <ReturnsStorekeeper />;
        case 'chat': return <ChatStorekeeper />;
        case 'report': return <ReportStorekeeper />;
        default: return <DashboardStorekeeper />;
      }
    }
  };

  const LayoutComponent = userRole === 'admin' ? Layout : LayoutStorekeeper;

  return (
    <>
      {/* Переключатель ролей */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Роль:</span>
          <button
            onClick={() => handleRoleChange('admin')}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              userRole === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👨‍💼 Руководитель
          </button>
          <button
            onClick={() => handleRoleChange('storekeeper')}
            className={`px-3 py-1 rounded text-sm font-medium transition ${
              userRole === 'storekeeper'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📦 Кладовщик
          </button>
        </div>
      </div>

      <LayoutComponent currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </LayoutComponent>
    </>
  );
}

export default App;
