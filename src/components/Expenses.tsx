export default function Expenses() {
  // Тестовые данные для демонстрации
  const totalExpenseAmount = 385000; // Общая сумма расхода за месяц
  const totalExpenseSheets = 127; // Листов расхода за месяц

  // Тестовые данные листа расхода
  const expenseSheet = {
    date: '15.08.26',
    employee: 'Иванов Иван Иванович',
    patient: 'Петров Петр Петрович',
    birthDate: '12.05.1985',
    visitCategory: 'Экстренный вызов',
    therapyName: 'Обезболивающая терапия',
    therapyCost: 2500,
    items: [
      { name: 'Анальгин 50% 2мл', type: 'Лекарство', quantity: 2, unitPrice: 45, sum: 90 },
      { name: 'Дексаметазон 4мг/мл', type: 'Лекарство', quantity: 1, unitPrice: 85, sum: 85 },
      { name: 'Шприц 5мл', type: 'Расходник', quantity: 3, unitPrice: 12, sum: 36 },
      { name: 'Салфетки спиртовые', type: 'Расходник', quantity: 5, unitPrice: 5, sum: 25 },
    ]
  };

  const totalSum = expenseSheet.items.reduce((sum, item) => sum + item.sum, 0);

  const handleExportExcel = () => {
    alert('Экспорт в Excel (демо-функция)\nВ реальном приложении здесь будет генерация XLSX через SheetJS');
  };

  return (
    <div className="space-y-6">
      {/* Карточки KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Общая сумма расхода за месяц */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
          <div className="pl-2">
            <p className="text-sm text-gray-500">Общая сумма расхода за месяц</p>
            <p className="text-2xl font-bold text-red-700 mt-1">{totalExpenseAmount.toLocaleString('ru')} ₽</p>
            <p className="text-xs text-gray-400 mt-1">за август 2026</p>
          </div>
        </div>

        {/* Листов расхода за месяц */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
          <div className="pl-2">
            <p className="text-sm text-gray-500">Листов расхода за месяц</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">{totalExpenseSheets}</p>
            <p className="text-xs text-gray-400 mt-1">за август 2026</p>
          </div>
        </div>
      </div>

      {/* Лист расхода */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Шапка листа расхода */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Лист расхода</h3>
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
            >
              📊 Скачать в Excel
            </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Дата создания:</span>
              <span className="text-sm font-medium text-gray-800">{expenseSheet.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Сотрудник:</span>
              <span className="text-sm font-medium text-gray-800">{expenseSheet.employee}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Пациент:</span>
              <span className="text-sm font-medium text-gray-800">Петров П.П.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Дата рождения:</span>
              <span className="text-sm font-medium text-gray-800">{expenseSheet.birthDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Категория выезда:</span>
              <span className="text-sm font-medium text-gray-800">{expenseSheet.visitCategory}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Название терапии:</span>
              <span className="text-sm font-medium text-gray-800">{expenseSheet.therapyName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Стоимость терапии:</span>
              <span className="text-sm font-bold text-green-600">
                {expenseSheet.therapyCost.toLocaleString('ru')} ₽ 
                <span className="text-xs font-normal text-gray-500 ml-1">
                  ({(expenseSheet.therapyCost * 0.06).toLocaleString('ru')} ₽)
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Итого по препаратам:</span>
              <span className="text-sm font-bold text-blue-600">{totalSum.toLocaleString('ru')} ₽</span>
            </div>
          </div>
        </div>

        {/* Содержимое листа расхода */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Препараты и материалы</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-medium text-gray-600">Название</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-center">Тип</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-center">Кол-во</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-right">Цена за единицу (₽)</th>
                  <th className="px-4 py-3 font-medium text-gray-600 text-right">Сумма (₽)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {expenseSheet.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.type === 'Лекарство' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">{item.quantity}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{item.unitPrice}</td>
                    <td className="px-4 py-3 text-right font-medium text-orange-700">{item.sum}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-bold">
                  <td className="px-4 py-3" colSpan={4}>ИТОГО</td>
                  <td className="px-4 py-3 text-right text-red-700">{totalSum.toLocaleString('ru')} ₽</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
