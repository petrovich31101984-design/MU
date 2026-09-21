import { useState } from 'react';
import { useStore } from '../store/useStore';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const notifications = useStore(s => s.notifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: '📊' },
    { id: 'employees', label: 'Сотрудники', icon: '👥' },
    { id: 'nomenclature', label: 'Номенклатура', icon: '💊' },
    { id: 'returns', label: 'Возвраты', icon: '↩️' },
    { id: 'chat', label: 'Сообщения', icon: '💬' },
    { id: 'report', label: 'Отчёт за месяц', icon: '📄' },
    { id: 'journal', label: 'Журнал изменений', icon: '📜' },
    { id: 'notifications', label: 'Уведомления', icon: '🔔', badge: unreadCount },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💊</span>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-gray-800 text-sm">Учёт лекарств</h1>
                <p className="text-xs text-gray-500">Руководитель</p>
              </div>
            )}
          </div>
        </div>
        <nav className="flex-1 p-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all text-left ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <>
                  <span className="text-sm flex-1">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 text-sm"
          >
            {sidebarOpen ? '◀ Свернуть' : '▶'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {menuItems.find(m => m.id === currentPage)?.label || 'Дашборд'}
            </h2>
            <p className="text-xs text-gray-500">Январь 2024</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('notifications')}
              className="relative p-2 rounded-lg hover:bg-gray-100"
            >
              <span className="text-xl">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">👨‍💼</div>
              <div className="text-sm">
                <div className="font-medium text-gray-800">Руководитель</div>
                <div className="text-xs text-gray-500">admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
