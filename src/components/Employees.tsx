import { useState } from 'react';
import { useStore } from '../store/useStore';
import { EmployeeStatus, STATUS_LABELS, STATUS_COLORS, UNIT_LABELS, Employee } from '../types';

export default function Employees() {
  const employees = useStore(s => s.employees);
  const updateEmployeeStatus = useStore(s => s.updateEmployeeStatus);
  const addEmployee = useStore(s => s.addEmployee);
  const addIncome = useStore(s => s.addIncome);
  const addInitialStock = useStore(s => s.addInitialStock);
  const nomenclature = useStore(s => s.nomenclature);
  const getCurrentPrice = useStore(s => s.getCurrentPrice);
  const getEmployeeStock = useStore(s => s.getEmployeeStock);
  const getEmployeePatients = useStore(s => s.getEmployeePatients);
  const getEmployeeIncome = useStore(s => s.getEmployeeIncome);
  const getEmployeeExpenseTotal = useStore(s => s.getEmployeeExpenseTotal);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  // Form states
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpNumber, setNewEmpNumber] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeShifts, setIncomeShifts] = useState('');

  const filtered = employees.filter(e => {
    const matchesSearch = e.fullName.toLowerCase().includes(search.toLowerCase()) ||
      e.personalNumber.includes(search);
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddEmployee = () => {
    if (!newEmpName || !newEmpNumber) return;
    addEmployee({
      personalNumber: newEmpNumber,
      fullName: newEmpName,
      status: 'active',
      hireDate: new Date().toISOString().slice(0, 10),
      lastActivityDate: new Date().toISOString().slice(0, 10),
    });
    setNewEmpName('');
    setNewEmpNumber('');
    setShowAddModal(false);
  };

  const handleAddIncome = () => {
    if (!selectedEmployee || !incomeAmount) return;
    addIncome({
      employeeId: selectedEmployee.id,
      amount: Number(incomeAmount),
      period: '2024-01',
      shifts: Number(incomeShifts) || 0,
      date: new Date().toISOString().slice(0, 10),
      createdBy: 'admin',
    });
    setIncomeAmount('');
    setIncomeShifts('');
    setShowIncomeModal(false);
  };

  if (selectedEmployee) {
    const emp = selectedEmployee;
    const patients = getEmployeePatients(emp.id);
    const income = getEmployeeIncome(emp.id, '2024-01');
    const expense = getEmployeeExpenseTotal(emp.id, '2024-01');
    const balance = income - expense;

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedEmployee(null)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          ← Назад к списку
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{emp.fullName}</h2>
              <p className="text-sm text-gray-500 mt-1">Персональный номер: {emp.personalNumber}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[emp.status]}`}>
                  {STATUS_LABELS[emp.status]}
                </span>
                <span className="text-xs text-gray-500">Принят: {emp.hireDate}</span>
                <span className="text-xs text-gray-500">Последняя активность: {emp.lastActivityDate}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {emp.status === 'active' && (
                <>
                  <button
                    onClick={() => { updateEmployeeStatus(emp.id, 'vacation'); setSelectedEmployee({ ...emp, status: 'vacation' }); }}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                  >
                    Отпуск
                  </button>
                  <button
                    onClick={() => { updateEmployeeStatus(emp.id, 'blocked'); setSelectedEmployee({ ...emp, status: 'blocked' }); }}
                    className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-sm hover:bg-orange-200"
                  >
                    Заблокировать
                  </button>
                  <button
                    onClick={() => { updateEmployeeStatus(emp.id, 'fired'); setSelectedEmployee({ ...emp, status: 'fired' }); }}
                    className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                  >
                    Уволить
                  </button>
                </>
              )}
              {emp.status !== 'active' && emp.status !== 'fired' && (
                <button
                  onClick={() => { updateEmployeeStatus(emp.id, 'active'); setSelectedEmployee({ ...emp, status: 'active' }); }}
                  className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                >
                  Активировать
                </button>
              )}
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Приход</p>
            <p className="text-xl font-bold text-green-700">{income.toLocaleString('ru')} ₽</p>
            <button onClick={() => setShowIncomeModal(true)} className="text-xs text-blue-600 mt-1 hover:underline">+ Добавить</button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Расход</p>
            <p className="text-xl font-bold text-orange-700">{expense.toLocaleString('ru')} ₽</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Баланс</p>
            <p className={`text-xl font-bold ${balance < 0 ? 'text-red-600' : 'text-blue-700'}`}>
              {balance >= 0 ? '+' : ''}{balance.toLocaleString('ru')} ₽
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Пациентов</p>
            <p className="text-xl font-bold text-purple-700">{patients.length}</p>
          </div>
        </div>

        {/* Stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Остатки на руках (шт. и ₽)</h3>
            <button
              onClick={() => setShowStockModal(true)}
              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
            >
              Внести остатки
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-2 font-medium text-gray-600">Наименование</th>
                  <th className="px-4 py-2 font-medium text-gray-600 text-center">Категория</th>
                  <th className="px-4 py-2 font-medium text-gray-600 text-center">Остаток (шт.)</th>
                  <th className="px-4 py-2 font-medium text-gray-600 text-right">Цена (₽)</th>
                  <th className="px-4 py-2 font-medium text-gray-600 text-right">Сумма (₽)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {nomenclature.map(nom => {
                  const stock = getEmployeeStock(emp.id, nom.id);
                  const price = getCurrentPrice(nom.id);
                  if (stock <= 0) return null;
                  return (
                    <tr key={nom.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{nom.name} <span className="text-xs text-gray-400">({UNIT_LABELS[nom.unit]})</span></td>
                      <td className="px-4 py-2 text-center text-xs text-gray-500">
                        {nom.category === 'medicine' ? '💊' : nom.category === 'equipment' ? '🔧' : '📦'}
                      </td>
                      <td className="px-4 py-2 text-center font-medium">{stock}</td>
                      <td className="px-4 py-2 text-right text-gray-600">{price}</td>
                      <td className="px-4 py-2 text-right font-medium text-blue-700">{(stock * price).toLocaleString('ru')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Patients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Пациенты ({patients.length})</h3>
          </div>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left sticky top-0">
                  <th className="px-4 py-2 font-medium text-gray-600">ФИО</th>
                  <th className="px-4 py-2 font-medium text-gray-600">Дата рождения</th>
                  <th className="px-4 py-2 font-medium text-gray-600">Дата вызова</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {patients.slice(0, 20).map(p => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{p.fullName}</td>
                    <td className="px-4 py-2 text-gray-600">{p.birthDate}</td>
                    <td className="px-4 py-2 text-gray-600">{p.visitDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Income Modal */}
        {showIncomeModal && (
          <Modal onClose={() => setShowIncomeModal(false)} title="Добавить приход">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Сумма прихода (₽)</label>
                <input
                  type="number"
                  value={incomeAmount}
                  onChange={e => setIncomeAmount(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="150000"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Количество смен</label>
                <input
                  type="number"
                  value={incomeShifts}
                  onChange={e => setIncomeShifts(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="20"
                />
              </div>
              <button
                onClick={handleAddIncome}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Сохранить
              </button>
            </div>
          </Modal>
        )}

        {/* Stock Modal */}
        {showStockModal && (
          <StockModal
            onClose={() => setShowStockModal(false)}
            employeeId={emp.id}
            onSave={(nomenclatureId, quantity) => {
              addInitialStock({
                employeeId: emp.id,
                nomenclatureId,
                quantity,
                date: new Date().toISOString().slice(0, 10),
                createdBy: 'admin',
              });
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Поиск по ФИО или номеру..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Все статусы</option>
          <option value="active">Активен</option>
          <option value="inactive">Неактивен</option>
          <option value="vacation">Отпуск</option>
          <option value="blocked">Заблокирован</option>
          <option value="fired">Уволен</option>
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Добавить сотрудника
        </button>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">№</th>
                <th className="px-4 py-3 font-medium text-gray-600">ФИО</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Статус</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Приход (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Расход (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Баланс (₽)</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Пациенты</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(emp => {
                const income = getEmployeeIncome(emp.id, '2024-01');
                const expense = getEmployeeExpenseTotal(emp.id, '2024-01');
                const patients = getEmployeePatients(emp.id).length;
                const balance = income - expense;
                return (
                  <tr key={emp.id} className={`hover:bg-gray-50 ${balance < 0 ? 'bg-red-50' : ''}`}>
                    <td className="px-4 py-3 text-gray-500">{emp.personalNumber}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedEmployee(emp)}
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline text-left"
                      >
                        {emp.fullName}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full border ${STATUS_COLORS[emp.status]}`}>
                        {STATUS_LABELS[emp.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-green-700">{income.toLocaleString('ru')}</td>
                    <td className="px-4 py-3 text-right text-orange-700">{expense.toLocaleString('ru')}</td>
                    <td className={`px-4 py-3 text-right font-bold ${balance < 0 ? 'text-red-600' : 'text-blue-700'}`}>
                      {balance >= 0 ? '+' : ''}{balance.toLocaleString('ru')}
                    </td>
                    <td className="px-4 py-3 text-center">{patients}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedEmployee(emp)}
                          className="p-1 rounded hover:bg-gray-100 text-gray-500"
                          title="Подробнее"
                        >
                          👁️
                        </button>
                        {emp.status === 'active' && (
                          <button
                            onClick={() => updateEmployeeStatus(emp.id, 'blocked')}
                            className="p-1 rounded hover:bg-gray-100 text-gray-500"
                            title="Заблокировать"
                          >
                            🔒
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)} title="Добавить сотрудника">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">ФИО</label>
              <input
                type="text"
                value={newEmpName}
                onChange={e => setNewEmpName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Иванов Иван Иванович"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Персональный номер</label>
              <input
                type="text"
                value={newEmpNumber}
                onChange={e => setNewEmpNumber(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="1031"
              />
            </div>
            <button
              onClick={handleAddEmployee}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Добавить
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function StockModal({ onClose, employeeId, onSave }: {
  onClose: () => void;
  employeeId: string;
  onSave: (nomenclatureId: string, quantity: number) => void;
}) {
  const nomenclature = useStore(s => s.nomenclature);
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Внести начальные остатки</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
        <div className="space-y-2 max-h-96 overflow-auto">
          {nomenclature.map(nom => (
            <div key={nom.id} className="flex items-center gap-3">
              <span className="flex-1 text-sm text-gray-700">{nom.name} ({UNIT_LABELS[nom.unit]})</span>
              <input
                type="number"
                min="0"
                value={quantities[nom.id] || ''}
                onChange={e => setQuantities({ ...quantities, [nom.id]: e.target.value })}
                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="0"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Отмена
          </button>
          <button
            onClick={() => {
              Object.entries(quantities).forEach(([nomId, qty]) => {
                if (Number(qty) > 0) onSave(nomId, Number(qty));
              });
              onClose();
            }}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
