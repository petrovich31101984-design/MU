import { useState } from 'react';
import { useStore } from '../store/useStore';
import { CATEGORY_LABELS, UNIT_LABELS, Category, Unit } from '../types';

export default function Nomenclature() {
  const nomenclature = useStore(s => s.nomenclature);
  const priceHistory = useStore(s => s.priceHistory);
  const updatePrice = useStore(s => s.updatePrice);
  const addNomenclature = useStore(s => s.addNomenclature);
  const getCurrentPrice = useStore(s => s.getCurrentPrice);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState('');
  const [showHistory, setShowHistory] = useState<string | null>(null);

  // New item form
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('medicine');
  const [newUnit, setNewUnit] = useState<Unit>('ampoule');
  const [newItemPrice, setNewItemPrice] = useState('');

  const filtered = nomenclature.filter(n => {
    const matchesSearch = n.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || n.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    if (!newName) return;
    addNomenclature({
      name: newName,
      category: newCategory,
      unit: newUnit,
      active: true,
    });
    setNewName('');
    setShowAddModal(false);
  };

  const handleUpdatePrice = (nomenclatureId: string) => {
    if (!newPrice) return;
    updatePrice(nomenclatureId, Number(newPrice), 'admin');
    setNewPrice('');
    setEditingPrice(null);
  };

  const totalValue = nomenclature.reduce((sum, n) => sum + getCurrentPrice(n.id), 0);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Все категории</option>
          <option value="medicine">💊 Лекарства</option>
          <option value="equipment">🔧 Оборудование</option>
          <option value="consumable">📦 Расходные материалы</option>
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Добавить позицию
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Всего позиций</p>
          <p className="text-2xl font-bold text-gray-800">{nomenclature.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Лекарств</p>
          <p className="text-2xl font-bold text-purple-700">{nomenclature.filter(n => n.category === 'medicine').length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Изменений цен</p>
          <p className="text-2xl font-bold text-amber-700">{priceHistory.length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Наименование</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Категория</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Ед. изм.</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Текущая цена (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(nom => {
                const price = getCurrentPrice(nom.id);
                return (
                  <tr key={nom.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{nom.name}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        nom.category === 'medicine' ? 'bg-purple-100 text-purple-700' :
                        nom.category === 'equipment' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {CATEGORY_LABELS[nom.category]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">{UNIT_LABELS[nom.unit]}</td>
                    <td className="px-4 py-3 text-right">
                      {editingPrice === nom.id ? (
                        <div className="flex items-center gap-2 justify-end">
                          <input
                            type="number"
                            value={newPrice}
                            onChange={e => setNewPrice(e.target.value)}
                            className="w-24 px-2 py-1 border border-blue-300 rounded text-right focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                          <button
                            onClick={() => handleUpdatePrice(nom.id)}
                            className="p-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => { setEditingPrice(null); setNewPrice(''); }}
                            className="p-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <span className="font-medium text-gray-800">{price.toLocaleString('ru')}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => { setEditingPrice(nom.id); setNewPrice(String(price)); }}
                          className="p-1 rounded hover:bg-gray-100 text-gray-500"
                          title="Изменить цену"
                        >
                          💰
                        </button>
                        <button
                          onClick={() => setShowHistory(showHistory === nom.id ? null : nom.id)}
                          className="p-1 rounded hover:bg-gray-100 text-gray-500"
                          title="История цен"
                        >
                          📊
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price History */}
      {showHistory && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">
              История цен: {nomenclature.find(n => n.id === showHistory)?.name}
            </h3>
            <button onClick={() => setShowHistory(null)} className="text-gray-400 hover:text-gray-600">×</button>
          </div>
          <div className="space-y-2">
            {priceHistory
              .filter(p => p.nomenclatureId === showHistory)
              .sort((a, b) => b.changeDate.localeCompare(a.changeDate))
              .map(p => (
                <div key={p.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500 w-24">{p.changeDate}</span>
                  <span className="font-medium text-gray-800">{p.price} ₽</span>
                  <span className="text-xs text-gray-400 ml-auto">изменил: {p.changedBy}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Добавить позицию</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Наименование</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Название препарата или оборудования"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Категория</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as Category)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="medicine">💊 Лекарство</option>
                  <option value="equipment">🔧 Оборудование</option>
                  <option value="consumable">📦 Расходный материал</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Единица измерения</label>
                <select
                  value={newUnit}
                  onChange={e => setNewUnit(e.target.value as Unit)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ampoule">Ампулы</option>
                  <option value="tablet">Таблетки</option>
                  <option value="flacon">Флаконы</option>
                  <option value="piece">Штуки</option>
                </select>
              </div>
              <button
                onClick={handleAddItem}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
