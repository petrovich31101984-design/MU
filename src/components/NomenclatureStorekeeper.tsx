import { useState } from 'react';
import { useStore } from '../store/useStore';
import { NomenclatureItem, Category, Unit } from '../types';

const CATEGORY_LABELS: Record<Category, string> = {
  medicine: 'Лекарство',
  medicine_pku: 'Лекарство ПКУ',
  equipment: 'Оборудование',
  consumable: 'Расходник',
};

const UNIT_LABELS: Record<Unit, string> = {
  ampoule: 'амп.',
  tablet: 'таб.',
  flacon: 'фл.',
  piece: 'шт.',
};

export default function NomenclatureStorekeeper() {
  const nomenclature = useStore(s => s.nomenclature);
  const addNomenclature = useStore(s => s.addNomenclature);
  const updateNomenclature = useStore(s => s.updateNomenclature);
  const removeNomenclature = useStore(s => s.removeNomenclature);
  const getCurrentPrice = useStore(s => s.getCurrentPrice);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'medicine' as Category,
    unit: 'ampoule' as Unit,
    active: true,
    packageQuantity: 0,
    pricePerPackage: 0,
  });

  const handleOpenModal = (item?: NomenclatureItem) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        name: item.name,
        category: item.category,
        unit: item.unit,
        active: item.active,
        packageQuantity: item.packageQuantity || 0,
        pricePerPackage: item.pricePerPackage || 0,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        category: 'medicine',
        unit: 'ampoule',
        active: true,
        packageQuantity: 0,
        pricePerPackage: 0,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name) return;

    if (editingId) {
      updateNomenclature(editingId, formData);
    } else {
      addNomenclature(formData);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm('Удалить позицию номенклатуры?')) {
      removeNomenclature(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Номенклатура</h2>
            <p className="text-sm text-gray-500 mt-1">Управление препаратами и материалами</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
          >
            ➕ Добавить позицию
          </button>
        </div>
      </div>

      {/* Таблица номенклатуры */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Название</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Категория</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Ед. изм.</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Текущая цена</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Статус</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {nomenclature.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">{UNIT_LABELS[item.unit]}</td>
                  <td className="px-4 py-3 text-right text-green-700 font-medium">
                    {getCurrentPrice(item.id).toLocaleString('ru')} ₽
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.active ? 'Активна' : 'Неактивна'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        ✏️ Ред.
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        🗑️ Удал.
                      </button>
                    </div>
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
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {editingId ? 'Редактировать позицию' : 'Новая позиция'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Введите название"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="medicine">Лекарство</option>
                    <option value="medicine_pku">Лекарство ПКУ</option>
                    <option value="equipment">Оборудование</option>
                    <option value="consumable">Расходник</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Единица измерения</label>
                  <select
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value as Unit })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="ampoule">амп.</option>
                    <option value="tablet">таб.</option>
                    <option value="flacon">фл.</option>
                    <option value="piece">шт.</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={formData.active}
                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="active" className="text-sm text-gray-700">Активна</label>
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
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
