import { useStore } from '../store/useStore';

export default function Stock() {
  const employees = useStore(s => s.employees);
  const nomenclature = useStore(s => s.nomenclature);
  const getEmployeeStock = useStore(s => s.getEmployeeStock);
  const getCurrentPrice = useStore(s => s.getCurrentPrice);

  const activeEmployees = employees.filter(e => e.status === 'active');

  const formatEmployeeName = (fullName: string) => {
    const parts = fullName.split(' ');
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
    }
    return fullName;
  };

  const formatUnit = (unit: string) => {
    const unitMap: Record<string, string> = {
      'ampoule': 'амп.',
      'tablet': 'таб.',
      'flacon': 'фл.',
      'piece': 'шт.'
    };
    return unitMap[unit] || unit;
  };

  // Сортировка номенклатуры: ПКУ лекарства вверху
  const sortedNomenclature = [...nomenclature].sort((a, b) => {
    if (a.category === 'medicine_pku' && b.category !== 'medicine_pku') return -1;
    if (a.category !== 'medicine_pku' && b.category === 'medicine_pku') return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Остатки</h2>
          <p className="text-sm text-gray-500 mt-1">Просмотр остатков номенклатуры у сотрудников</p>
        </div>
      </div>

      {/* Таблица остатков */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-4 py-3 font-medium text-gray-600">Номенклатура</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Ед. изм.</th>
                <th className="px-4 py-3 font-medium text-gray-600 text-right">Цена</th>
                {activeEmployees.map(emp => (
                  <th key={emp.id} className="px-4 py-3 font-medium text-gray-600 text-center">
                    {formatEmployeeName(emp.fullName)}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium text-gray-600 text-center">Итого</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedNomenclature.map(nom => {
                let totalQty = 0;
                let totalValue = 0;
                const price = getCurrentPrice(nom.id);

                return (
                  <tr key={nom.id} className={`hover:bg-gray-50 ${nom.category === 'medicine_pku' ? 'bg-indigo-50' : ''}`}>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {nom.name}
                      {nom.category === 'medicine_pku' && (
                        <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">ПКУ</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">{formatUnit(nom.unit)}</td>
                    <td className="px-4 py-3 text-right text-green-700 font-medium">{price.toLocaleString('ru')} ₽</td>
                    {activeEmployees.map(emp => {
                      const stock = getEmployeeStock(emp.id, nom.id);
                      totalQty += stock;
                      totalValue += stock * price;

                      return (
                        <td key={emp.id} className="px-4 py-3 text-center">
                          {stock > 0 ? (
                            <span className="font-medium text-blue-700">{stock}</span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-center font-bold text-purple-700">
                      {totalQty > 0 ? totalQty : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-bold">
                <td className="px-4 py-3" colSpan={3}>ИТОГО по сотрудникам</td>
                {activeEmployees.map(emp => {
                  const empTotal = sortedNomenclature.reduce((sum, nom) => {
                    const stock = getEmployeeStock(emp.id, nom.id);
                    return sum + stock * getCurrentPrice(nom.id);
                  }, 0);

                  return (
                    <td key={emp.id} className="px-4 py-3 text-center text-blue-700">
                      {empTotal.toLocaleString('ru')} ₽
                    </td>
                  );
                })}
                <td className="px-4 py-3 text-center text-blue-700">
                  {activeEmployees.reduce((sum, emp) => {
                    const empTotal = sortedNomenclature.reduce((s, nom) => {
                      const stock = getEmployeeStock(emp.id, nom.id);
                      return s + stock * getCurrentPrice(nom.id);
                    }, 0);
                    return sum + empTotal;
                  }, 0).toLocaleString('ru')} ₽
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Информация */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-700">
          <span className="font-semibold">Примечание:</span> Остатки отображаются на текущую дату. 
          Для изменения остатков используйте разделы "Приходы" и "Возвраты".
        </p>
      </div>
    </div>
  );
}
