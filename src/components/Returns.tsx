import { useState } from 'react';
import { useStore } from '../store/useStore';
import { UNIT_LABELS, ReturnOperation } from '../types';
import { formatDate } from '../utils/dateFormat';

interface ReturnSheet {
  id: string;
  employeeId: string;
  date: string;
  items: ReturnOperation[];
}

export default function Returns() {
  const returns = useStore(s => s.returns);
  const employees = useStore(s => s.employees);
  const nomenclature = useStore(s => s.nomenclature);
  const correctReturn = useStore(s => s.correctReturn);

  const [filter, setFilter] = useState<'all' | 'pending' | 'corrected'>('all');
  const [correctingId, setCorrectingId] = useState<string | null>(null);
  const [newQuantity, setNewQuantity] = useState('');
  const [archivedSheets, setArchivedSheets] = useState<Set<string>>(new Set());

  const getEmployeeName = (id: string) => employees.find(e => e.id === id)?.fullName || id;
  const getNomenclatureName = (id: string) => nomenclature.find(n => n.id === id)?.name || id;
  const getNomenclatureUnit = (id: string) => nomenclature.find(n => n.id === id)?.unit;

  // Группируем возвраты по сотруднику и дате
  const groupReturns = (returnsList: ReturnOperation[]): ReturnSheet[] => {
    const groups: { [key: string]: ReturnSheet } = {};
    
    returnsList.forEach(ret => {
      const key = `${ret.employeeId}_${ret.date}`;
      if (!groups[key]) {
        groups[key] = {
          id: key,
          employeeId: ret.employeeId,
          date: ret.date,
          items: []
        };
      }
      groups[key].items.push(ret);
    });

    return Object.values(groups).sort((a, b) => b.date.localeCompare(a.date));
  };

  const filteredReturns = returns.filter(r => {
    if (filter === 'pending') return !r.corrected;
    if (filter === 'corrected') return r.corrected;
    return true;
  });

  const allSheets = groupReturns(filteredReturns);
  const sheets = allSheets.filter(sheet => !archivedSheets.has(sheet.id));

  const handleCorrect = (id: string) => {
    if (!newQuantity) return;
    correctReturn(id, Number(newQuantity), 'admin');
    setCorrectingId(null);
    setNewQuantity('');
  };

  const handleArchiveSheet = (sheetId: string) => {
    setArchivedSheets(prev => new Set(prev).add(sheetId));
  };

  const pendingCount = returns.filter(r => !r.corrected).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'all' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Все листы ({sheets.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Ожидают ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('corrected')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'corrected' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Скорректированные ({returns.filter(r => r.corrected).length})
          </button>
        </div>
      </div>

      {/* Return Sheets */}
      {sheets.map(sheet => {
        const hasUncorrected = sheet.items.some(item => !item.corrected);
        
        return (
          <div key={sheet.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Sheet Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Лист возврата от {formatDate(sheet.date)}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Сотрудник: <span className="font-medium">{getEmployeeName(sheet.employeeId)}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    hasUncorrected
                      ? 'text-amber-700'
                      : 'text-green-700'
                  }`}>
                    {hasUncorrected ? '⏳ Ожидает обработки' : '✅ Обработан'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {sheet.items.length} {sheet.items.length === 1 ? 'позиция' : 'позиций'}
                  </span>
                  <button
                    onClick={() => handleArchiveSheet(sheet.id)}
                    disabled={hasUncorrected}
                    className={`px-3 py-1.5 rounded-lg text-xs transition flex items-center gap-1 ${
                      hasUncorrected
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                    title={hasUncorrected ? 'Нельзя отправить в архив: лист ожидает обработки' : ''}
                  >
                    📦 Отправить в архив
                  </button>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="px-4 py-3 font-medium text-gray-600">Номенклатура</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Кол-во</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Причина возврата</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Статус</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Кем скорр.</th>
                    <th className="px-4 py-3 font-medium text-gray-600">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sheet.items.map(ret => {
                    const unit = getNomenclatureUnit(ret.nomenclatureId);
                    return (
                      <tr key={ret.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-700">
                          {getNomenclatureName(ret.nomenclatureId)}
                          {unit && <span className="text-xs text-gray-400 ml-1">({UNIT_LABELS[unit]})</span>}
                        </td>
                        <td className="px-4 py-3">
                          {correctingId === ret.id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                value={newQuantity}
                                onChange={e => setNewQuantity(e.target.value)}
                                className="w-16 px-2 py-1 border border-blue-300 rounded text-center"
                                autoFocus
                              />
                              <button
                                onClick={() => handleCorrect(ret.id)}
                                className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                              >
                                ✓
                              </button>
                              <button
                                onClick={() => { setCorrectingId(null); setNewQuantity(''); }}
                                className="p-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span className="font-medium text-gray-800">
                              {ret.corrected && ret.newQuantity !== undefined ? (
                                <>
                                  <span className="text-gray-400 line-through">{ret.quantity}</span>
                                  {' → '}
                                  <span className="text-green-700">{ret.newQuantity}</span>
                                </>
                              ) : ret.quantity}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          <span className={`text-sm ${
                            ret.reason === 'Вышел срок годности' ? 'text-red-700' :
                            ret.reason === 'Поломка оборудования' ? 'text-orange-700' :
                            ret.reason === 'Нарушение упаковки' ? 'text-yellow-700' :
                            'text-gray-700'
                          }`}>
                            {ret.reason || '—'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm ${
                            ret.corrected
                              ? 'text-green-700'
                              : 'text-amber-700'
                          }`}>
                            {ret.corrected ? 'Обработан' : 'Ожидает'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">
                          {ret.correctedBy === 'admin' ? 'Руководитель' :
                           ret.correctedBy === 'storekeeper' ? 'Кладовщик' : '—'}
                        </td>
                        <td className="px-4 py-3">
                          {!ret.corrected && correctingId !== ret.id && (
                            <button
                              onClick={() => { setCorrectingId(ret.id); setNewQuantity(String(ret.quantity)); }}
                              className="text-blue-700 text-sm hover:underline"
                            >
                              Корректировать
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {sheets.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="text-4xl mb-2">↩️</div>
          <p className="text-gray-500">Нет возвратов</p>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-800 text-sm mb-2">ℹ️ О возвратах</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Возвраты создаются сотрудниками при возврате лекарств на склад</li>
          <li>• Возвраты одного сотрудника за один день объединяются в один лист</li>
          <li>• После возврата остаток сотрудника увеличивается</li>
          <li>• Руководитель и кладовщик могут скорректировать количество возврата</li>
          <li>• Все корректировки записываются в журнал изменений</li>
        </ul>
      </div>
    </div>
  );
}
