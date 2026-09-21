import { useState } from 'react';
import { useStore } from '../store/useStore';
import { STATUS_LABELS, STATUS_COLORS } from '../types';

export default function Report() {
  const employees = useStore(s => s.employees);
  const getEmployeeIncome = useStore(s => s.getEmployeeIncome);
  const getEmployeeExpenseTotal = useStore(s => s.getEmployeeExpenseTotal);
  const getEmployeePatients = useStore(s => s.getEmployeePatients);
  const getCurrentPrice = useStore(s => s.getCurrentPrice);
  const getEmployeeStock = useStore(s => s.getEmployeeStock);
  const nomenclature = useStore(s => s.nomenclature);

  const [period, setPeriod] = useState('2024-01');

  const activeEmployees = employees.filter(e => e.status === 'active' || e.status === 'vacation');

  const reportData = activeEmployees.map(emp => {
    const income = getEmployeeIncome(emp.id, period);
    const expense = getEmployeeExpenseTotal(emp.id, period);
    const patients = getEmployeePatients(emp.id).filter(p => p.visitDate.startsWith(period)).length;

    // Остаток в рублях
    let stockValue = 0;
    nomenclature.forEach(nom => {
      const stock = getEmployeeStock(emp.id, nom.id);
      if (stock > 0) stockValue += stock * getCurrentPrice(nom.id);
    });

    return { emp, income, expense, patients, stockValue };
  });

  const totalIncome = reportData.reduce((s, r) => s + r.income, 0);
  const totalExpense = reportData.reduce((s, r) => s + r.expense, 0);
  const totalStock = reportData.reduce((s, r) => s + r.stockValue, 0);
  const totalPatients = reportData.reduce((s, r) => s + r.patients, 0);

  const handleExportPDF = () => {
    alert('Экспорт в PDF (демо-функция)\nВ реальном приложении здесь будет генерация PDF через jsPDF');
  };

  const handleExportExcel = () => {
    alert('Экспорт в Excel (демо-функция)\nВ реальном приложении здесь будет генерация XLSX через SheetJS');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Отчёт за месяц</h2>
            <p className="text-sm text-gray-500 mt-1">
              Период: {period === '2024-01' ? 'Январь 2024' : period}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="2024-01">Январь 2024</option>
              <option value="2023-12">Декабрь 2023</option>
              <option value="2023-11">Ноябрь 2023</option>
            </select>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium flex items-center gap-2"
            >
              📄 PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium flex items-center gap-2"
            >
              📊 Excel
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
          <p className="text-sm text-green-700 font-medium">Общий приход</p>
          <p className="text-2xl font-bold text-green-800 mt-1">{totalIncome.toLocaleString('ru')} ₽</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
          <p className="text-sm text-orange-700 font-medium">Общий расход</p>
          <p className="text-2xl font-bold text-orange-800 mt-1">{totalExpense.toLocaleString('ru')} ₽</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
          <p className="text-sm text-blue-700 font-medium">Остаток на подразделение</p>
          <p className="text-2xl font-bold text-blue-800 mt-1">{totalStock.toLocaleString('ru')} ₽</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
          <p className="text-sm text-purple-700 font-medium">Всего пациентов</p>
          <p className="text-2xl font-bold text-purple-800 mt-1">{totalPatients}</p>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Детализация по сотрудникам</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">№</th>
                <th className="px-4 py-3 font-medium text-gray-600">ФИО сотрудника</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Статус</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Кол-во вызовов</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Приход (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Расход (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Остаток (₽)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportData.map(row => {
                const balance = row.income - row.expense;
                return (
                  <tr key={row.emp.id} className={`hover:bg-gray-50 ${balance < 0 ? 'bg-red-50' : ''}`}>
                    <td className="px-4 py-3 text-gray-500">{row.emp.personalNumber}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{row.emp.fullName}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[row.emp.status]}`}>
                        {STATUS_LABELS[row.emp.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-gray-700">{row.patients}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-medium">{row.income.toLocaleString('ru')}</td>
                    <td className="px-4 py-3 text-right text-orange-700 font-medium">{row.expense.toLocaleString('ru')}</td>
                    <td className={`px-4 py-3 text-right font-bold ${row.stockValue > 0 ? 'text-blue-700' : 'text-gray-400'}`}>
                      {row.stockValue.toLocaleString('ru')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-bold border-t-2 border-blue-200">
                <td className="px-4 py-3" colSpan={3}>ИТОГО на подразделение</td>
                <td className="px-4 py-3 text-center text-gray-800">{totalPatients}</td>
                <td className="px-4 py-3 text-right text-green-700">{totalIncome.toLocaleString('ru')}</td>
                <td className="px-4 py-3 text-right text-orange-700">{totalExpense.toLocaleString('ru')}</td>
                <td className="px-4 py-3 text-right text-blue-700">{totalStock.toLocaleString('ru')}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <h4 className="font-semibold text-amber-800 text-sm mb-2">ℹ️ Примечания к отчёту</h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Остаток (₽) рассчитан с учётом актуальных цен на номенклатуру</li>
          <li>• Отчёт формируется автоматически 5-го числа каждого месяца</li>
          <li>• Красным выделены строки с перерасходом (расход &gt; приход)</li>
          <li>• Экспорт доступен в форматах PDF и Excel</li>
        </ul>
      </div>
    </div>
  );
}
