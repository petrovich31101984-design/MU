export default function Dashboard() {
  const currentMonth = new Date().toLocaleDateString('ru-RU', { month: 'long' });
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 capitalize">
        {currentMonth} {currentYear}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
          <div className="pl-2">
            <p className="text-sm text-gray-500">Приход</p>
            <p className="text-2xl font-bold text-green-700 mt-1">0 ₽</p>
            <p className="text-xs text-gray-400 mt-1">за предыдущий месяц</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
          <div className="pl-2">
            <p className="text-sm text-gray-500">Расход</p>
            <p className="text-2xl font-bold text-red-700 mt-1">0 ₽</p>
            <p className="text-xs text-gray-400 mt-1">за предыдущий месяц</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
          <div className="pl-2">
            <p className="text-sm text-gray-500">Остаток</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">0 ₽</p>
            <p className="text-xs text-gray-400 mt-1">на подразделение</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-700"></div>
          <div className="pl-2">
            <p className="text-sm text-gray-500">Сотрудников активно</p>
            <p className="text-2xl font-bold text-amber-700 mt-1">0</p>
            <p className="text-xs text-gray-400 mt-1">из 0 всего</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Сообщения</h3>
          <p className="text-gray-500 text-sm">Нет сообщений</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Уведомления</h3>
          <p className="text-gray-500 text-sm">Нет уведомлений</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Сотрудники — общая сводка</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-sm">Нет данных</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">💊</div>
            <div className="text-sm font-medium">Номенклатура</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium">Сотрудники</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">📄</div>
            <div className="text-sm font-medium">Отчеты</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="text-2xl mb-2">📁</div>
            <div className="text-sm font-medium">Архив</div>
          </button>
        </div>
      </div>
    </div>
  );
}
