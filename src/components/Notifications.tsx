import { useStore } from '../store/useStore';

export default function Notifications() {
  const notifications = useStore(s => s.notifications);
  const markNotificationRead = useStore(s => s.markNotificationRead);
  const markAllNotificationsRead = useStore(s => s.markAllNotificationsRead);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'overexpense': return '🚨';
      case 'inactivity': return '⏰';
      case 'return': return '↩️';
      case 'message': return '💬';
      case 'report': return '📄';
      case 'price_change': return '💰';
      default: return 'ℹ️';
    }
  };

  const getUrgencyColor = (type: string) => {
    switch (type) {
      case 'overexpense': return 'border-red-200 bg-red-50';
      case 'inactivity': return 'border-amber-200 bg-amber-50';
      case 'return': return 'border-blue-200 bg-blue-50';
      case 'message': return 'border-purple-200 bg-purple-50';
      case 'report': return 'border-green-200 bg-green-50';
      case 'price_change': return 'border-gray-200 bg-gray-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const sorted = [...notifications].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Уведомления</h2>
          <p className="text-sm text-gray-500">{unreadCount} непрочитанных</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 font-medium"
          >
            Прочитать все
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {sorted.map(notification => (
          <div
            key={notification.id}
            onClick={() => !notification.read && markNotificationRead(notification.id)}
            className={`bg-white rounded-xl shadow-sm border p-4 transition-all cursor-pointer hover:shadow-md ${
              notification.read ? 'border-gray-200 opacity-75' : getUrgencyColor(notification.type)
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0">{getIcon(notification.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold text-sm ${notification.read ? 'text-gray-600' : 'text-gray-800'}`}>
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                <p className="text-xs text-gray-400 mt-2">{notification.date.replace('T', ' ')}</p>
              </div>
              <div className="flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  notification.type === 'overexpense' ? 'bg-red-100 text-red-700' :
                  notification.type === 'inactivity' ? 'bg-amber-100 text-amber-700' :
                  notification.type === 'return' ? 'bg-blue-100 text-blue-700' :
                  notification.type === 'message' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {notification.type === 'overexpense' ? 'Перерасход' :
                   notification.type === 'inactivity' ? 'Неактивность' :
                   notification.type === 'return' ? 'Возврат' :
                   notification.type === 'message' ? 'Сообщение' :
                   notification.type === 'report' ? 'Отчёт' :
                   notification.type === 'price_change' ? 'Изменение цены' : 'Инфо'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-4xl mb-2">🔔</div>
          <p className="text-gray-500">Нет уведомлений</p>
        </div>
      )}
    </div>
  );
}
