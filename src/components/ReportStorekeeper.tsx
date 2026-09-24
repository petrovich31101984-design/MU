import { useStore } from '../store/useStore';

export default function ReportStorekeeper() {
  const nomenclature = useStore(s => s.nomenclature);
  const employees = useStore(s => s.employees);
  const income = useStore(s => s.income);
  const returns = useStore(s => s.returns);
  const getCurrentPrice = useStore(s => s.getCurrentPrice);
  const getEmployeeStock = useStore(s => s.getEmployeeStock);

  const activeEmployees = employees.filter(e => e.status === 'active');

  // Определяем предыдущий месяц
  const currentDate = new Date();
  const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const previousMonthPeriod = `${previousMonth.getFullYear()}-${String(previousMonth.getMonth() + 1).padStart(2, '0')}`;
  const previousMonthLabel = previousMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  // Приход за предыдущий месяц
  const previousMonthIncome = income
    .filter(i => i.period === previousMonthPeriod)
    .reduce((s, i) => s + i.amount, 0);

  // Общая статистика
  const totalReturns = returns.length;

  // Остатки у сотрудников
  const totalEmployeeStock = activeEmployees.reduce((sum, emp) => {
    const empStock = nomenclature.reduce((empSum, nom) => {
      const stock = getEmployeeStock(emp.id, nom.id);
      return empSum + stock * getCurrentPrice(nom.id);
    }, 0);
    return sum + empStock;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Отчёты</h2>
          <p className="text-sm text-gray-500 mt-1">Сводная информация по складу</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
          <p className="text-sm text-green-700 font-medium">Общий приход</p>
          <p className="text-xs text-green-600">(за предыдущий месяц)</p>
          <p className="text-2xl font-bold text-green-800 mt-1">{previousMonthIncome.toLocaleString('ru')} ₽</p>
          <p className="text-xs text-green-600 mt-1">{previousMonthLabel}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
          <p className="text-sm text-purple-700 font-medium">Возвратов</p>
          <p className="text-2xl font-bold text-purple-800 mt-1">{totalReturns}</p>
          <p className="text-xs text-purple-600 mt-1">за всё время</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <p className="text-sm text-blue-700 font-medium">Остатки у сотрудников</p>
          <p className="text-2xl font-bold text-blue-800 mt-1">{totalEmployeeStock.toLocaleString('ru')} ₽</p>
          <p className="text-xs text-blue-600 mt-1">общая стоимость</p>
        </div>
      </div>

      {/* Сводка по сотрудникам */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Сводка по сотрудникам</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Сотрудник</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">
                  <div>Приходы (₽)</div>
                  <div className="text-xs font-normal text-gray-400">за {previousMonthLabel}</div>
                </th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Возвратов</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Остатки (₽)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeEmployees.map(emp => {
                const empIncome = income.filter(i => i.employeeId === emp.id && i.period === previousMonthPeriod).reduce((s, i) => s + i.amount, 0);
                const empReturns = returns.filter(r => r.employeeId === emp.id).length;
                const empStock = nomenclature.reduce((sum, nom) => {
                  const stock = getEmployeeStock(emp.id, nom.id);
                  return sum + stock * getCurrentPrice(nom.id);
                }, 0);

                return (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{emp.fullName}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-medium">{empIncome.toLocaleString('ru')}</td>
                    <td className="px-4 py-3 text-center text-purple-700 font-medium">{empReturns}</td>
                    <td className="px-4 py-3 text-right text-blue-700 font-bold">{empStock.toLocaleString('ru')}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-green-50 font-bold border-t-2 border-green-200">
                <td className="px-4 py-3">ИТОГО</td>
                <td className="px-4 py-3 text-right text-green-700">{previousMonthIncome.toLocaleString('ru')}</td>
                <td className="px-4 py-3 text-center text-purple-700">{totalReturns}</td>
                <td className="px-4 py-3 text-right text-blue-700">{totalEmployeeStock.toLocaleString('ru')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Информация */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Примечание:</span> Отчёт содержит сводную информацию по всем операциям. 
          Для детализации используйте соответствующие разделы (Приходы, Возвраты, Остатки).
        </p>
      </div>
    </div>
  );
}
