import { useState } from 'react';
import { useStore } from '../store/useStore';
import { STATUS_LABELS, STATUS_COLORS } from '../types';
import { formatDate } from '../utils/dateFormat';

export default function Income() {
  const employees = useStore(s => s.employees);
  const income = useStore(s => s.income);
  const addIncome = useStore(s => s.addIncome);

  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [shifts, setShifts] = useState('');
  const [period, setPeriod] = useState('2026-09');

  const activeEmployees = employees.filter(e => e.status !== 'fired');

  const handleAdd = () => {
    if (!selectedEmployee || !amount) return;
    addIncome({
      employeeId: selectedEmployee,
      amount: Number(amount),
      period,
      shifts: Number(shifts) || 0,
      date: new Date().toISOString().slice(0, 10),
      createdBy: 'admin',
    });
    setAmount('');
    setShifts('');
    setSelectedEmployee('');
  };

  const periodIncome = income.filter(i => i.period === period);

  return (
    <div className="space-y-6">
      {/* Форма добавления */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Добавить приход сотруднику</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-600 block mb-1">Сотрудник</label>
            <select
              value={selectedEmployee}
              onChange={e => setSelectedEmployee(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите сотрудника</option>
              {activeEmployees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.fullName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Период</label>
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="2026-09">Сентябрь 2026</option>
              <option value="2026-08">Август 2026</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600 block mb-1">Сумма (₽)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="150000"
            />
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Добавить приход
        </button>
      </div>

      {/* Таблица приходов */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Приходы за период: {period === '2026-09' ? 'Сентябрь 2026' : period === '2026-08' ? 'Август 2026' : period}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Сотрудник</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Статус</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Сумма (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600">Дата</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {periodIncome.map(inc => {
                const emp = employees.find(e => e.id === inc.employeeId);
                if (!emp) return null;
                return (
                  <tr key={inc.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{emp.fullName}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[emp.status]}`}>
                        {STATUS_LABELS[emp.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-700 font-medium">
                      {inc.amount.toLocaleString('ru')}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(inc.date)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-3" colSpan={2}>ИТОГО</td>
                <td className="px-4 py-3 text-right text-green-700">
                  {periodIncome.reduce((s, i) => s + i.amount, 0).toLocaleString('ru')}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
