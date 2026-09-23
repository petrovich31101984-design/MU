import { useState } from 'react';
import { useStore } from '../store/useStore';
import { formatDateTime } from '../utils/dateFormat';

export default function Archive() {
  const employees = useStore(s => s.employees);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Архивные сотрудники
  const archivedEmployees = employees.filter(e => e.archived);

  // Фильтрация
  const filteredEmployees = archivedEmployees.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
                         emp.personalNumber.includes(search);
    return matchesSearch;
  });

  const getEmployeeName = (id: string) => {
    const emp = employees.find(e => e.id === id);
    return emp?.fullName || id;
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">📁 Архив</h2>
            <p className="text-sm text-gray-500 mt-1">
              Информация, отправленная в архив
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Поиск по ФИО или номеру..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
          <p className="text-sm text-gray-700 font-medium">Всего в архиве</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{archivedEmployees.length}</p>
          <p className="text-xs text-gray-500 mt-1">сотрудников</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <p className="text-sm text-blue-700 font-medium">Активных сотрудников</p>
          <p className="text-2xl font-bold text-blue-800 mt-1">{employees.filter(e => e.status === 'active' && !e.archived).length}</p>
          <p className="text-xs text-blue-600 mt-1">не в архиве</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
          <p className="text-sm text-amber-700 font-medium">Всего сотрудников</p>
          <p className="text-2xl font-bold text-amber-800 mt-1">{employees.length}</p>
          <p className="text-xs text-amber-600 mt-1">в системе</p>
        </div>
      </div>

      {/* Таблица архивных сотрудников */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Архивные сотрудники</h3>
        </div>
        <div className="overflow-x-auto">
          {filteredEmployees.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-sm">Архив пуст</p>
              <p className="text-xs mt-1">Сотрудники, отправленные в архив, будут отображаться здесь</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-600">№</th>
                  <th className="px-4 py-3 font-medium text-gray-600">ФИО</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-center">Статус</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Дата найма</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Последняя активность</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{emp.personalNumber}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{emp.fullName}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                        В архиве
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{emp.hireDate}</td>
                    <td className="px-4 py-3 text-gray-600">{emp.lastActivityDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Информация */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-800 text-sm mb-2">ℹ️ О разделе "Архив"</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• В архив попадают сотрудники, которые больше не работают в подразделении</li>
          <li>• Архивные сотрудники не отображаются в активных списках</li>
          <li>• Информация об архивных сотрудниках сохраняется для истории</li>
          <li>• Поиск работает по ФИО и персональному номеру</li>
        </ul>
      </div>
    </div>
  );
}
