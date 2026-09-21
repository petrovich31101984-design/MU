import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Nomenclature from './components/Nomenclature';
import Income from './components/Income';
import Expenses from './components/Expenses';
import Report from './components/Report';
import Journal from './components/Journal';
import Chat from './components/Chat';
import Returns from './components/Returns';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'nomenclature': return <Nomenclature />;
      case 'income': return <Income />;
      case 'expenses': return <Expenses />;
      case 'returns': return <Returns />;
      case 'chat': return <Chat />;
      case 'report': return <Report />;
      case 'journal': return <Journal />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
