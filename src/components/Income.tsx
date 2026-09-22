import { useStore } from '../store/useStore';
import { STATUS_LABELS, STATUS_COLORS } from '../types';
import { formatDate } from '../utils/dateFormat';

export default function Income() {
  const employees = useStore(s => s.employees);
  const income = useStore(s => s.income);

  // Прошедший месяц - август 2026
  const period = '2026-08';
  const periodIncome = income.filter(i => i.period === period);
  const totalIncome = periodIncome.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Приход на подразделение за прошедший месяц */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Приход на подразделение за прошедший месяц</h3>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Август 2026</p>
              <p className="text-3xl font-bold text-green-700">{totalIncome.toLocaleString('ru')} ₽</p>
              <p className="text-sm text-gray-500 mt-2">Общая сумма приходов всех сотрудников</p>
            </div>
            <div className="text-6xl opacity-20">💰</div>
          </div>
        </div>
      </div>

      {/* Таблица приходов */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Приходы за период: Август 2026</h3>
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
                  {totalIncome.toLocaleString('ru')}
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
