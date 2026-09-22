export default function Expenses() {
  // Тестовые данные для демонстрации
  const totalExpenseAmount = 385000; // Общая сумма расхода за месяц
  const totalExpenseSheets = 127; // Листов расхода за месяц

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

      {/* Раздел в разработке */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">Раздел в разработке</p>
      </div>
    </div>
  );
}
