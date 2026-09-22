import { useState } from 'react';

export default function Expenses() {
  // Тестовые данные для демонстрации
  const totalExpenseAmount = 385000; // Общая сумма расхода за месяц
  const totalExpenseSheets = 127; // Листов расхода за месяц

  // Тестовые данные листов расхода (10 пациентов)
  const [expenseSheets, setExpenseSheets] = useState([
    {
      id: 1,
      date: '15.08.26',
      employee: 'Иванов Иван Иванович',
      patient: 'Петров Петр Петрович',
      birthDate: '12.05.1985',
      visitCategory: 'Экстренный вызов',
      therapyName: 'Обезболивающая терапия',
      therapyCost: 6300,
      items: [
        { name: 'Анальгин 50% 2мл', type: 'Лекарство', quantity: 2, unitPrice: 45, sum: 90 },
        { name: 'Дексаметазон 4мг/мл', type: 'Лекарство', quantity: 1, unitPrice: 85, sum: 85 },
        { name: 'Шприц 5мл', type: 'Расходник', quantity: 3, unitPrice: 12, sum: 36 },
        { name: 'Салфетки спиртовые', type: 'Расходник', quantity: 5, unitPrice: 5, sum: 25 },
      ]
    },
    {
      id: 2,
      date: '14.08.26',
      employee: 'Сидорова Анна Михайловна',
      patient: 'Козлов Алексей Сергеевич',
      birthDate: '23.09.1978',
      visitCategory: 'Плановый вызов',
      therapyName: 'Сердечно-сосудистая терапия',
      therapyCost: 8500,
      items: [
        { name: 'Нитроглицерин 0.5мг', type: 'Лекарство', quantity: 3, unitPrice: 25, sum: 75 },
        { name: 'Магния сульфат 25% 5мл', type: 'Лекарство', quantity: 2, unitPrice: 55, sum: 110 },
        { name: 'Шприц 10мл', type: 'Расходник', quantity: 4, unitPrice: 15, sum: 60 },
      ]
    },
    {
      id: 3,
      date: '13.08.26',
      employee: 'Морозова Елена Владимировна',
      patient: 'Смирнова Ольга Ивановна',
      birthDate: '05.03.1992',
      visitCategory: 'Экстренный вызов',
      therapyName: 'Противовоспалительная терапия',
      therapyCost: 12400,
      items: [
        { name: 'Преднизолон 30мг/мл', type: 'Лекарство', quantity: 2, unitPrice: 120, sum: 240 },
        { name: 'Кеторол 30мг/мл', type: 'Лекарство', quantity: 3, unitPrice: 120, sum: 360 },
        { name: 'Натрия хлорид 0.9% 400мл', type: 'Лекарство', quantity: 1, unitPrice: 65, sum: 65 },
        { name: 'Система для в/в вливания', type: 'Расходник', quantity: 1, unitPrice: 45, sum: 45 },
      ]
    },
    {
      id: 4,
      date: '12.08.26',
      employee: 'Иванов Иван Иванович',
      patient: 'Волков Дмитрий Андреевич',
      birthDate: '17.11.1965',
      visitCategory: 'Повторный вызов',
      therapyName: 'Дыхательная терапия',
      therapyCost: 15800,
      items: [
        { name: 'Эуфиллин 2.4% 5мл', type: 'Лекарство', quantity: 2, unitPrice: 75, sum: 150 },
        { name: 'Сальбутамол 100мкг', type: 'Лекарство', quantity: 1, unitPrice: 250, sum: 250 },
        { name: 'Преднизолон 30мг/мл', type: 'Лекарство', quantity: 1, unitPrice: 120, sum: 120 },
        { name: 'Маска кислородная', type: 'Расходник', quantity: 1, unitPrice: 35, sum: 35 },
      ]
    },
    {
      id: 5,
      date: '11.08.26',
      employee: 'Сидорова Анна Михайловна',
      patient: 'Новикова Мария Петровна',
      birthDate: '28.07.1988',
      visitCategory: 'Экстренный вызов',
      therapyName: 'Неотложная помощь',
      therapyCost: 18200,
      items: [
        { name: 'Адреналин 0.1% 1мл', type: 'Лекарство', quantity: 2, unitPrice: 180, sum: 360 },
        { name: 'Дексаметазон 4мг/мл', type: 'Лекарство', quantity: 2, unitPrice: 85, sum: 170 },
        { name: 'Фуросемид 10мг/мл', type: 'Лекарство', quantity: 1, unitPrice: 35, sum: 35 },
        { name: 'Катетер венозный 18G', type: 'Расходник', quantity: 1, unitPrice: 85, sum: 85 },
      ]
    },
    {
      id: 6,
      date: '10.08.26',
      employee: 'Морозова Елена Владимировна',
      patient: 'Федоров Сергей Николаевич',
      birthDate: '09.02.1975',
      visitCategory: 'Плановый вызов',
      therapyName: 'Неврологическая терапия',
      therapyCost: 9800,
      items: [
        { name: 'Диазепам 0.5% 2мл', type: 'Лекарство', quantity: 1, unitPrice: 85, sum: 85 },
        { name: 'Магния сульфат 25% 5мл', type: 'Лекарство', quantity: 2, unitPrice: 55, sum: 110 },
        { name: 'Шприц 5мл', type: 'Расходник', quantity: 4, unitPrice: 12, sum: 48 },
      ]
    },
    {
      id: 7,
      date: '09.08.26',
      employee: 'Иванов Иван Иванович',
      patient: 'Кузнецова Татьяна Викторовна',
      birthDate: '14.12.1982',
      visitCategory: 'Экстренный вызов',
      therapyName: 'Антигистаминная терапия',
      therapyCost: 7600,
      items: [
        { name: 'Димедрол 1% 1мл', type: 'Лекарство', quantity: 2, unitPrice: 55, sum: 110 },
        { name: 'Преднизолон 30мг/мл', type: 'Лекарство', quantity: 1, unitPrice: 120, sum: 120 },
        { name: 'Натрия хлорид 0.9% 400мл', type: 'Лекарство', quantity: 1, unitPrice: 65, sum: 65 },
      ]
    },
    {
      id: 8,
      date: '08.08.26',
      employee: 'Сидорова Анна Михайловна',
      patient: 'Попов Андрей Михайлович',
      birthDate: '30.06.1970',
      visitCategory: 'Повторный вызов',
      therapyName: 'Кардиологическая терапия',
      therapyCost: 22100,
      items: [
        { name: 'Нитроглицерин 0.5мг', type: 'Лекарство', quantity: 5, unitPrice: 25, sum: 125 },
        { name: 'Адреналин 0.1% 1мл', type: 'Лекарство', quantity: 1, unitPrice: 180, sum: 180 },
        { name: 'Магния сульфат 25% 5мл', type: 'Лекарство', quantity: 3, unitPrice: 55, sum: 165 },
        { name: 'Катетер венозный 20G', type: 'Расходник', quantity: 2, unitPrice: 85, sum: 170 },
        { name: 'Система для в/в вливания', type: 'Расходник', quantity: 2, unitPrice: 45, sum: 90 },
      ]
    },
    {
      id: 9,
      date: '07.08.26',
      employee: 'Морозова Елена Владимировна',
      patient: 'Соколова Ирина Дмитриевна',
      birthDate: '21.04.1995',
      visitCategory: 'Плановый вызов',
      therapyName: 'Жаропонижающая терапия',
      therapyCost: 6800,
      items: [
        { name: 'Анальгин 50% 2мл', type: 'Лекарство', quantity: 3, unitPrice: 45, sum: 135 },
        { name: 'Димедрол 1% 1мл', type: 'Лекарство', quantity: 1, unitPrice: 55, sum: 55 },
        { name: 'Шприц 5мл', type: 'Расходник', quantity: 4, unitPrice: 12, sum: 48 },
      ]
    },
    {
      id: 10,
      date: '06.08.26',
      employee: 'Иванов Иван Иванович',
      patient: 'Лебедев Виктор Петрович',
      birthDate: '08.10.1968',
      visitCategory: 'Экстренный вызов',
      therapyName: 'Реанимационная терапия',
      therapyCost: 25550,
      items: [
        { name: 'Адреналин 0.1% 1мл', type: 'Лекарство', quantity: 3, unitPrice: 180, sum: 540 },
        { name: 'Дексаметазон 4мг/мл', type: 'Лекарство', quantity: 2, unitPrice: 85, sum: 170 },
        { name: 'Преднизолон 30мг/мл', type: 'Лекарство', quantity: 2, unitPrice: 120, sum: 240 },
        { name: 'Фуросемид 10мг/мл', type: 'Лекарство', quantity: 2, unitPrice: 35, sum: 70 },
        { name: 'Натрия хлорид 0.9% 400мл', type: 'Лекарство', quantity: 2, unitPrice: 65, sum: 130 },
        { name: 'Катетер венозный 18G', type: 'Расходник', quantity: 2, unitPrice: 85, sum: 170 },
        { name: 'Система для в/в вливания', type: 'Расходник', quantity: 2, unitPrice: 45, sum: 90 },
      ]
    }
  ]);

  const [selectedSheetId, setSelectedSheetId] = useState(1);
  const expenseSheet = expenseSheets.find(s => s.id === selectedSheetId) || expenseSheets[0];

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(expenseSheet);

  const totalSum = expenseSheet.items.reduce((sum, item) => sum + item.sum, 0);
  
  const handleExportExcel = () => {
    alert('Экспорт в Excel (демо-функция)\nВ реальном приложении здесь будет генерация XLSX через SheetJS');
  };

  const handleEdit = () => {
    setEditData(expenseSheet);
    setIsEditing(true);
  };

  const handleSave = () => {
    setExpenseSheets(expenseSheets.map(sheet => 
      sheet.id === selectedSheetId ? { ...editData, id: selectedSheetId } : sheet
    ));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Функция для форматирования ФИО в инициалы
  const formatPatientName = (fullName: string) => {
    const parts = fullName.split(' ');
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
    }
    return fullName;
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

      {/* Селектор листов расхода */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Выберите лист расхода:</label>
        <select
          value={selectedSheetId}
          onChange={(e) => setSelectedSheetId(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {expenseSheets.map(sheet => (
            <option key={sheet.id} value={sheet.id}>
              {sheet.date} - {sheet.patient} ({sheet.therapyName})
            </option>
          ))}
        </select>
      </div>

      {/* Лист расхода */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Шапка листа расхода */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Лист расхода</h3>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center gap-2"
                >
                  ✏️ Редактировать данные
                </button>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm font-medium"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    Сохранить
                  </button>
                </>
              )}
              <button
                onClick={handleExportExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
              >
                📊 Скачать в Excel
              </button>
            </div>
          </div>

          {!isEditing ? (
            // Режим просмотра
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
                <span className="text-sm font-medium text-gray-800">{formatPatientName(expenseSheet.patient)}</span>
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
          ) : (
            // Режим редактирования
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Дата создания:</label>
                <input
                  type="text"
                  value={editData.date}
                  onChange={(e) => setEditData({...editData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Сотрудник:</label>
                <input
                  type="text"
                  value={editData.employee}
                  onChange={(e) => setEditData({...editData, employee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Пациент:</label>
                <input
                  type="text"
                  value={editData.patient}
                  onChange={(e) => setEditData({...editData, patient: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Дата рождения:</label>
                <input
                  type="text"
                  value={editData.birthDate}
                  onChange={(e) => setEditData({...editData, birthDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Категория выезда:</label>
                <input
                  type="text"
                  value={editData.visitCategory}
                  onChange={(e) => setEditData({...editData, visitCategory: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Название терапии:</label>
                <input
                  type="text"
                  value={editData.therapyName}
                  onChange={(e) => setEditData({...editData, therapyName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Стоимость терапии (₽):</label>
                <input
                  type="number"
                  value={editData.therapyCost}
                  onChange={(e) => setEditData({...editData, therapyCost: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-end">
                <div className="w-full">
                  <label className="block text-xs text-gray-500 mb-1">Итого по препаратам:</label>
                  <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-bold text-blue-600">
                    {totalSum.toLocaleString('ru')} ₽
                  </div>
                </div>
              </div>
            </div>
          )}
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
