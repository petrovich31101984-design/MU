import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ReturnOperation } from '../types';

export default function ReturnsStorekeeper() {
  const returns = useStore(s => s.returns);
  const employees = useStore(s => s.employees);
  const nomenclature = useStore(s => s.nomenclature);
  const addReturn = useStore(s => s.addReturn);
  const updateReturn = useStore(s => s.updateReturn);

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedNomenclature, setSelectedNomenclature] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');

  const getEmployeeName = (id: string) => {
    const emp = employees.find(e => e.id === id);
    return emp?.fullName || id;
  };

  const formatEmployeeName = (fullName: string) => {
    const parts = fullName.split(' ');
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
    }
    return fullName;
  };

  const getNomenclatureName = (id: string) => nomenclature.find(n => n.id === id)?.name || id;

  const handleOpenModal = () => {
    setShowModal(true);
    setSelectedEmployee('');
    setSelectedNomenclature('');
    setQuantity('');
    setReason('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (!selectedEmployee || !selectedNomenclature || !quantity) return;

    addReturn({
      employeeId: selectedEmployee,
      nomenclatureId: selectedNomenclature,
      quantity: Number(quantity),
      date: new Date().toISOString().slice(0, 10),
      corrected: false,
      reason: reason || undefined,
    });

    handleCloseModal();
  };

  const handleConfirm = (ret: ReturnOperation) => {
    updateReturn(ret.id, { confirmed: true }, 'storekeeper');
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Возвраты</h2>
            <p className="text-sm text-gray-500 mt-1">Управление возвратами номенклатуры</p>
          </div>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
          >
            ➕ Создать возврат
          </button>
        </div>
      </div>

      {/* Таблица возвратов */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Дата</th>
                <th className="px-4 py-3 font-medium text-gray-600">Сотрудник</th>
                <th className="px-4 py-3 font-medium text-gray-600">Номенклатура</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Кол-во</th>
                <th className="px-4 py-3 font-medium text-gray-600">Причина</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Статус</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {returns.map(ret => (
                <tr key={ret.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">{ret.date}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{formatEmployeeName(getEmployeeName(ret.employeeId))}</td>
                  <td className="px-4 py-3 text-gray-700">{getNomenclatureName(ret.nomenclatureId)}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{ret.quantity}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{ret.reason || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ret.confirmed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {ret.confirmed ? 'Подтвержден' : 'Ожидает'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {!ret.confirmed && (
                      <button
                        onClick={() => handleConfirm(ret)}
                        className="text-green-600 hover:text-green-800 text-xs"
                      >
                        ✅ Подтвердить
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Новый возврат</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сотрудник</label>
                  <select
                    value={selectedEmployee}
                    onChange={e => setSelectedEmployee(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Выберите сотрудника</option>
                    {employees.filter(e => e.status === 'active').map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.fullName}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Номенклатура</label>
                  <select
                    value={selectedNomenclature}
                    onChange={e => setSelectedNomenclature(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Выберите номенклатуру</option>
                    {nomenclature.filter(n => n.active).map(nom => (
                      <option key={nom.id} value={nom.id}>{nom.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Количество</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Введите количество"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Причина (необязательно)</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    placeholder="Укажите причину возврата"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Создать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
