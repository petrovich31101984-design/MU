import { useState } from 'react';
import { useStore } from '../store/useStore';
import { STATUS_LABELS, STATUS_COLORS, UNIT_LABELS } from '../types';

export default function Expenses() {
  const employees = useStore(s => s.employees);
  const expenses = useStore(s => s.expenses);
  const nomenclature = useStore(s => s.nomenclature);
  const patients = useStore(s => s.patients);
  const getCurrentPrice = useStore(s => s.getCurrentPrice);

  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');
  const [period, setPeriod] = useState('2024-01');

  const activeEmployees = employees.filter(e => e.status !== 'fired');

  const filteredExpenses = expenses.filter(exp => {
    const matchesEmployee = selectedEmployee === 'all' || exp.employeeId === selectedEmployee;
    const matchesPeriod = exp.visitDate.startsWith(period);
    return matchesEmployee && matchesPeriod;
  });

  // Группировка по сотрудникам
  const byEmployee: Record<string, { count: number; total: number; items: number }> = {};
  filteredExpenses.forEach(exp => {
    if (!byEmployee[exp.employeeId]) {
      byEmployee[exp.employeeId] = { count: 0, total: 0, items: 0 };
    }
    byEmployee[exp.employeeId].count++;
    byEmployee[exp.employeeId].total += getCurrentPrice(exp.nomenclatureId) * exp.quantity;
    byEmployee[exp.employeeId].items += exp.quantity;
  });

  const totalAmount = filteredExpenses.reduce((s, e) => s + getCurrentPrice(e.nomenclatureId) * e.quantity, 0);
  const totalItems = filteredExpenses.reduce((s, e) => s + e.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
        <select
          value={selectedEmployee}
          onChange={e => setSelectedEmployee(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Все сотрудники</option>
          {activeEmployees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.fullName}</option>
          ))}
        </select>
        <select
          value={period}
          onChange={e => setPeriod(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="2024-01">Январь 2024</option>
          <option value="2023-12">Декабрь 2023</option>
          <option value="2023-11">Ноябрь 2023</option>
        </select>
        <div className="flex-1"></div>
        <div className="text-sm text-gray-500 self-center">
          Операций: <span className="font-medium text-gray-800">{filteredExpenses.length}</span>
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Всего операций расхода</p>
          <p className="text-2xl font-bold text-orange-700">{filteredExpenses.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Общий расход (₽)</p>
          <p className="text-2xl font-bold text-orange-700">{totalAmount.toLocaleString('ru')}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Единиц израсходовано</p>
          <p className="text-2xl font-bold text-orange-700">{totalItems.toLocaleString('ru')}</p>
        </div>
      </div>

      {/* Сводка по сотрудникам */}
      {selectedEmployee === 'all' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Сводка по сотрудникам</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-600">Сотрудник</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-center">Статус</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-center">Операций</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-center">Единиц</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-right">Сумма (₽)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.entries(byEmployee).map(([empId, data]) => {
                  const emp = employees.find(e => e.id === empId);
                  if (!emp) return null;
                  return (
                    <tr key={empId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{emp.fullName}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[emp.status]}`}>
                          {STATUS_LABELS[emp.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">{data.count}</td>
                      <td className="px-4 py-3 text-center">{data.items}</td>
                      <td className="px-4 py-3 text-right text-orange-700 font-medium">
                        {data.total.toLocaleString('ru')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Детализация */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Детализация расходов</h3>
        </div>
        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left sticky top-0">
                <th className="px-4 py-3 font-medium text-gray-600">Дата</th>
                <th className="px-4 py-3 font-medium text-gray-600">Сотрудник</th>
                <th className="px-4 py-3 font-medium text-gray-600">Пациент</th>
                <th className="px-4 py-3 font-medium text-gray-600">Номенклатура</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Кол-во</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Цена (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Сумма (₽)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredExpenses.slice(0, 50).map(exp => {
                const emp = employees.find(e => e.id === exp.employeeId);
                const pat = patients.find(p => p.id === exp.patientId);
                const nom = nomenclature.find(n => n.id === exp.nomenclatureId);
                const price = getCurrentPrice(exp.nomenclatureId);
                return (
                  <tr key={exp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{exp.visitDate}</td>
                    <td className="px-4 py-3 text-gray-800">{emp?.fullName || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{pat?.fullName || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {nom?.name || '—'}
                      {nom && <span className="text-xs text-gray-400 ml-1">({UNIT_LABELS[nom.unit]})</span>}
                    </td>
                    <td className="px-4 py-3 text-center font-medium">{exp.quantity}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{price}</td>
                    <td className="px-4 py-3 text-right text-orange-700 font-medium">
                      {(price * exp.quantity).toLocaleString('ru')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
