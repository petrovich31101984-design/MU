import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Nomenclature from './components/Nomenclature';
import Report from './components/Report';
import Journal from './components/Journal';
import Chat from './components/Chat';
import Returns from './components/Returns';
import Notifications from './components/Notifications';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'nomenclature': return <Nomenclature />;
      case 'returns': return <Returns />;
      case 'chat': return <Chat />;
      case 'report': return <Report />;
      case 'journal': return <Journal />;
      case 'notifications': return <Notifications />;
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
