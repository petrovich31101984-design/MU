import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { formatDateTime } from '../utils/dateFormat';

export default function ChatStorekeeper() {
  const employees = useStore(s => s.employees);
  const messages = useStore(s => s.messages);
  const addMessage = useStore(s => s.addMessage);
  const markMessageRead = useStore(s => s.markMessageRead);

  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Получаем список диалогов
  const dialogPartners = [...new Set(
    messages
      .filter(m => m.fromId === 'storekeeper' || m.toId === 'storekeeper')
      .map(m => m.fromId === 'storekeeper' ? m.toId : m.fromId)
  )];

  // Все возможные собеседники (руководитель + все сотрудники)
  const allPossiblePartners = ['admin', ...employees.map(e => e.id)];

  const getChatMessages = (partnerId: string) => {
    return messages
      .filter(m =>
        (m.fromId === 'storekeeper' && m.toId === partnerId) ||
        (m.fromId === partnerId && m.toId === 'storekeeper')
      )
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const getUnreadCount = (partnerId: string) => {
    return messages.filter(m => m.fromId === partnerId && m.toId === 'storekeeper' && !m.read).length;
  };

  const getPartnerName = (partnerId: string) => {
    if (partnerId === 'admin') return '👨‍💼 Руководитель';
    const emp = employees.find(e => e.id === partnerId);
    return emp?.fullName || partnerId;
  };

  // При выборе чата — помечаем все сообщения от собеседника как прочитанные
  useEffect(() => {
    if (selectedChat) {
      const unreadMessages = messages.filter(
        m => m.fromId === selectedChat && m.toId === 'storekeeper' && !m.read
      );
      unreadMessages.forEach(msg => {
        markMessageRead(msg.id);
      });
    }
  }, [selectedChat, messages, markMessageRead]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedChat) return;
    addMessage({
      fromId: 'storekeeper',
      toId: selectedChat,
      text: newMessage.trim(),
      read: false,
    });
    setNewMessage('');
  };

  const handleSelectNewChat = (partnerId: string) => {
    setSelectedChat(partnerId);
  };

  const selectedMessages = selectedChat ? getChatMessages(selectedChat) : [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-12rem)]">
      <div className="flex h-full">
        {/* Dialog List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">Диалоги</h3>
          </div>

          {/* Существующие диалоги */}
          <div className="flex-1 overflow-auto">
            {dialogPartners.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <div className="text-3xl mb-2">📭</div>
                <p className="text-sm">Нет диалогов</p>
                <p className="text-xs mt-1">Выберите собеседника ниже</p>
              </div>
            ) : (
              dialogPartners.map(partnerId => {
                const chatMsgs = getChatMessages(partnerId);
                const lastMsg = chatMsgs[chatMsgs.length - 1];
                const unread = getUnreadCount(partnerId);
                return (
                  <button
                    key={partnerId}
                    onClick={() => setSelectedChat(partnerId)}
                    className={`w-full p-3 text-left border-b border-gray-100 hover:bg-gray-50 transition ${
                      selectedChat === partnerId ? 'bg-green-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                        {partnerId === 'admin' ? '👨‍💼' : '👨‍⚕️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm text-gray-800 truncate">
                            {getPartnerName(partnerId)}
                          </span>
                          {unread > 0 && (
                            <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {unread}
                            </span>
                          )}
                        </div>
                        {lastMsg && (
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {lastMsg.fromId === 'storekeeper' ? 'Вы: ' : ''}{lastMsg.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}

            {/* Новые диалоги */}
            <div className="border-t border-gray-200 p-3">
              <p className="text-xs text-gray-500 mb-2">Новый диалог:</p>
              {allPossiblePartners.filter(p => !dialogPartners.includes(p)).map(partnerId => (
                <button
                  key={partnerId}
                  onClick={() => handleSelectNewChat(partnerId)}
                  className="w-full p-2 text-left hover:bg-green-50 rounded text-sm text-gray-700"
                >
                  {getPartnerName(partnerId)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-800">{getPartnerName(selectedChat)}</h3>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto p-4 space-y-3 bg-gray-50">
                {selectedMessages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">💬</div>
                      <p className="text-sm">Начните диалог</p>
                    </div>
                  </div>
                ) : (
                  selectedMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.fromId === 'storekeeper' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-xl px-4 py-2 ${
                          msg.fromId === 'storekeeper'
                            ? 'bg-green-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.fromId === 'storekeeper' ? 'text-green-200' : 'text-gray-400'}`}>
                          {formatDateTime(msg.date)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Введите сообщение..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">💬</div>
                <p>Выберите диалог</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
