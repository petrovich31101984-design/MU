import { useStore } from '../store/useStore';
import { STATUS_LABELS, STATUS_COLORS, UNIT_LABELS } from '../types';

export default function Dashboard() {
  const employees = useStore(s => s.employees);
  const nomenclature = useStore(s => s.nomenclature);
  const notifications = useStore(s => s.notifications);
  const getCurrentPrice = useStore(s => s.getCurrentPrice);
  const getEmployeeStock = useStore(s => s.getEmployeeStock);

  const activeEmployees = employees.filter(e => e.status === 'active');
  const unreadNotifications = notifications.filter(n => !n.read);

  // Общий остаток на подразделение
  let totalStockValue = 0;
  let totalStockItems = 0;
  activeEmployees.forEach(emp => {
    nomenclature.forEach(nom => {
      const stock = getEmployeeStock(emp.id, nom.id);
      if (stock > 0) {
        totalStockItems += stock;
        totalStockValue += stock * getCurrentPrice(nom.id);
      }
    });
  });

  // Сводка по сотрудникам
  const employeeSummary = activeEmployees.map(emp => {
    const income = useStore.getState().getEmployeeIncome(emp.id, '2024-01');
    const expense = useStore.getState().getEmployeeExpenseTotal(emp.id, '2024-01');
    const patients = useStore.getState().getEmployeePatients(emp.id).length;
    const balance = income - expense;
    return { emp, income, expense, balance, patients };
  });

  const totalIncome = employeeSummary.reduce((s, e) => s + e.income, 0);
  const totalExpense = employeeSummary.reduce((s, e) => s + e.expense, 0);
  const overexpenseCount = employeeSummary.filter(e => e.expense > e.income).length;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Сотрудников активно</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{activeEmployees.length}</p>
              <p className="text-xs text-gray-400 mt-1">из {employees.length} всего</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Общий приход</p>
              <p className="text-2xl font-bold text-green-700 mt-1">{totalIncome.toLocaleString('ru')} ₽</p>
              <p className="text-xs text-gray-400 mt-1">за январь 2024</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-xl">📥</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Общий расход</p>
              <p className="text-2xl font-bold text-orange-700 mt-1">{totalExpense.toLocaleString('ru')} ₽</p>
              <p className="text-xs text-gray-400 mt-1">за январь 2024</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">📤</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Остаток на подразделение</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">{totalStockValue.toLocaleString('ru')} ₽</p>
              <p className="text-xs text-gray-400 mt-1">{totalStockItems.toLocaleString('ru')} позиций</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">📦</div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {overexpenseCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-semibold text-red-800 flex items-center gap-2">
            ⚠️ Перерасход у {overexpenseCount} сотрудник(ов)
          </h3>
          <div className="mt-2 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
            {employeeSummary.filter(e => e.expense > e.income).map(e => (
              <div key={e.emp.id} className="bg-white rounded-lg p-3 border border-red-100">
                <p className="font-medium text-sm text-gray-800">{e.emp.fullName}</p>
                <p className="text-xs text-red-600 mt-1">
                  Перерасход: {(e.expense - e.income).toLocaleString('ru')} ₽
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Unread notifications */}
      {unreadNotifications.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-800 flex items-center gap-2">
            🔔 Непрочитанные уведомления ({unreadNotifications.length})
          </h3>
          <div className="mt-2 space-y-2">
            {unreadNotifications.slice(0, 3).map(n => (
              <div key={n.id} className="bg-white rounded-lg p-3 border border-amber-100 flex items-center gap-3">
                <span className="text-lg">
                  {n.type === 'overexpense' ? '🚨' : n.type === 'inactivity' ? '⏰' : n.type === 'return' ? '↩️' : n.type === 'message' ? '💬' : 'ℹ️'}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">Сводка по сотрудникам</h3>
          <span className="text-sm text-gray-500">{activeEmployees.length} активных</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Сотрудник</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Статус</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Приход (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Расход (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Баланс (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Пациенты</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employeeSummary.map(row => (
                <tr key={row.emp.id} className={`hover:bg-gray-50 ${row.balance < 0 ? 'bg-red-50' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-800">{row.emp.fullName}</div>
                    <div className="text-xs text-gray-500">№{row.emp.personalNumber}</div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[row.emp.status]}`}>
                      {STATUS_LABELS[row.emp.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-green-700 font-medium">
                    {row.income.toLocaleString('ru')}
                  </td>
                  <td className="px-4 py-3 text-right text-orange-700 font-medium">
                    {row.expense.toLocaleString('ru')}
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${row.balance < 0 ? 'text-red-600' : 'text-blue-700'}`}>
                    {row.balance >= 0 ? '+' : ''}{row.balance.toLocaleString('ru')}
                  </td>
                  <td className="px-4 py-3 text-center font-medium text-gray-700">
                    {row.patients}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-bold">
                <td className="px-4 py-3 text-gray-800">ИТОГО</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right text-green-700">{totalIncome.toLocaleString('ru')}</td>
                <td className="px-4 py-3 text-right text-orange-700">{totalExpense.toLocaleString('ru')}</td>
                <td className="px-4 py-3 text-right text-blue-700">{(totalIncome - totalExpense).toLocaleString('ru')}</td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {employeeSummary.reduce((s, e) => s + e.patients, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Status breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Статусы сотрудников</h3>
          <div className="space-y-2">
            {(['active', 'vacation', 'inactive', 'blocked', 'fired'] as const).map(status => {
              const count = employees.filter(e => e.status === status).length;
              if (count === 0) return null;
              return (
                <div key={status} className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[status]}`}>
                    {STATUS_LABELS[status]}
                  </span>
                  <span className="font-medium text-gray-700">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Топ-5 по пациентам</h3>
          <div className="space-y-2">
            {employeeSummary
              .sort((a, b) => b.patients - a.patients)
              .slice(0, 5)
              .map((row, i) => (
                <div key={row.emp.id} className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-gray-700 truncate">{row.emp.fullName}</span>
                  <span className="text-sm font-medium text-gray-800">{row.patients}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
