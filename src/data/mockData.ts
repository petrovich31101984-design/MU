import { Employee, NomenclatureItem, PriceHistory, Income, Patient, Expense, InitialStock, ReturnOperation, Message, JournalEntry, Notification } from '../types';

// Генерация ID
let idCounter = 1000;
const genId = (prefix: string) => `${prefix}_${++idCounter}`;

// 30 сотрудников
export const mockEmployees: Employee[] = [
  { id: 'emp_1', personalNumber: '1001', fullName: 'Иванов Иван Иванович', password: 'pass1001', status: 'active', hireDate: '2020-03-15', lastActivityDate: '2024-01-15' },
  { id: 'emp_2', personalNumber: '1002', fullName: 'Петров Пётр Сергеевич', password: 'pass1002', status: 'active', hireDate: '2019-07-01', lastActivityDate: '2024-01-15' },
  { id: 'emp_3', personalNumber: '1003', fullName: 'Сидорова Анна Михайловна', password: 'pass1003', status: 'active', hireDate: '2021-02-10', lastActivityDate: '2024-01-14' },
  { id: 'emp_4', personalNumber: '1004', fullName: 'Козлов Дмитрий Алексеевич', password: 'pass1004', status: 'active', hireDate: '2018-11-20', lastActivityDate: '2024-01-15' },
  { id: 'emp_5', personalNumber: '1005', fullName: 'Морозова Елена Владимировна', password: 'pass1005', status: 'active', hireDate: '2022-05-03', lastActivityDate: '2024-01-15' },
  { id: 'emp_6', personalNumber: '1006', fullName: 'Волков Андрей Николаевич', password: 'pass1006', status: 'inactive', hireDate: '2020-08-12', lastActivityDate: '2024-01-08' },
  { id: 'emp_7', personalNumber: '1007', fullName: 'Соловьёва Мария Петровна', password: 'pass1007', status: 'active', hireDate: '2021-09-25', lastActivityDate: '2024-01-15' },
  { id: 'emp_8', personalNumber: '1008', fullName: 'Лебедев Сергей Викторович', password: 'pass1008', status: 'active', hireDate: '2019-04-18', lastActivityDate: '2024-01-14' },
  { id: 'emp_9', personalNumber: '1009', fullName: 'Новикова Ольга Дмитриевна', password: 'pass1009', status: 'inactive', hireDate: '2020-01-30', lastActivityDate: '2024-01-02' },
  { id: 'emp_10', personalNumber: '1010', fullName: 'Попов Алексей Игоревич', password: 'pass1010', status: 'active', hireDate: '2022-11-15', lastActivityDate: '2024-01-15' },
  { id: 'emp_11', personalNumber: '1011', fullName: 'Васильева Татьяна Андреевна', password: 'pass1011', status: 'active', hireDate: '2021-06-07', lastActivityDate: '2024-01-15' },
  { id: 'emp_12', personalNumber: '1012', fullName: 'Михайлов Константин Олегович', password: 'pass1012', status: 'active', hireDate: '2019-12-01', lastActivityDate: '2024-01-13' },
  { id: 'emp_13', personalNumber: '1013', fullName: 'Фёдорова Наталья Сергеевна', password: 'pass1013', status: 'active', hireDate: '2020-07-22', lastActivityDate: '2024-01-15' },
  { id: 'emp_14', personalNumber: '1014', fullName: 'Николаев Роман Павлович', password: 'pass1014', status: 'fired', hireDate: '2018-03-10', lastActivityDate: '2023-12-20' },
  { id: 'emp_15', personalNumber: '1015', fullName: 'Кузнецова Ирина Валерьевна', password: 'pass1015', status: 'active', hireDate: '2022-02-14', lastActivityDate: '2024-01-15' },
  { id: 'emp_16', personalNumber: '1016', fullName: 'Орлов Максим Дмитриевич', password: 'pass1016', status: 'active', hireDate: '2021-04-30', lastActivityDate: '2024-01-14' },
  { id: 'emp_17', personalNumber: '1017', fullName: 'Макарова Светлана Юрьевна', password: 'pass1017', status: 'active', hireDate: '2020-10-05', lastActivityDate: '2024-01-15' },
  { id: 'emp_18', personalNumber: '1018', fullName: 'Андреев Виктор Анатольевич', password: 'pass1018', status: 'blocked', hireDate: '2019-08-17', lastActivityDate: '2024-01-05' },
  { id: 'emp_19', personalNumber: '1019', fullName: 'Ковалёва Юлия Александровна', password: 'pass1019', status: 'active', hireDate: '2022-07-19', lastActivityDate: '2024-01-15' },
  { id: 'emp_20', personalNumber: '1020', fullName: 'Григорьев Павел Владимирович', password: 'pass1020', status: 'active', hireDate: '2021-01-11', lastActivityDate: '2024-01-14' },
  { id: 'emp_21', personalNumber: '1021', fullName: 'Белова Екатерина Романовна', password: 'pass1021', status: 'active', hireDate: '2020-05-28', lastActivityDate: '2024-01-15' },
  { id: 'emp_22', personalNumber: '1022', fullName: 'Тарасов Денис Сергеевич', password: 'pass1022', status: 'active', hireDate: '2019-09-14', lastActivityDate: '2024-01-13' },
  { id: 'emp_23', personalNumber: '1023', fullName: 'Комарова Людмила Ивановна', password: 'pass1023', status: 'active', hireDate: '2022-03-22', lastActivityDate: '2024-01-15' },
  { id: 'emp_24', personalNumber: '1024', fullName: 'Жуков Артём Олегович', password: 'pass1024', status: 'active', hireDate: '2021-08-09', lastActivityDate: '2024-01-14' },
  { id: 'emp_25', personalNumber: '1025', fullName: 'Дмитриева Вера Михайловна', password: 'pass1025', status: 'inactive', hireDate: '2020-12-03', lastActivityDate: '2024-01-07' },
  { id: 'emp_26', personalNumber: '1026', fullName: 'Гусев Илья Андреевич', password: 'pass1026', status: 'active', hireDate: '2019-06-25', lastActivityDate: '2024-01-15' },
  { id: 'emp_27', personalNumber: '1027', fullName: 'Антонова Полина Дмитриевна', password: 'pass1027', status: 'active', hireDate: '2022-09-18', lastActivityDate: '2024-01-15' },
  { id: 'emp_28', personalNumber: '1028', fullName: 'Баранов Олег Викторович', password: 'pass1028', status: 'active', hireDate: '2021-11-02', lastActivityDate: '2024-01-14' },
  { id: 'emp_29', personalNumber: '1029', fullName: 'Щербакова Надежда Петровна', password: 'pass1029', status: 'active', hireDate: '2020-04-16', lastActivityDate: '2024-01-15' },
  { id: 'emp_30', personalNumber: '1030', fullName: 'Титов Глеб Максимович', password: 'pass1030', status: 'active', hireDate: '2022-01-27', lastActivityDate: '2024-01-15' },
];

// Номенклатура (~50 позиций для демо)
export const mockNomenclature: NomenclatureItem[] = [
  { id: 'nom_21', name: 'Шприц 5мл', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 1200 },
  { id: 'nom_22', name: 'Шприц 10мл', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 1500 },
  { id: 'nom_23', name: 'Шприц 20мл', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 1800 },
  { id: 'nom_24', name: 'Система для в/в вливания', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 2250 },
  { id: 'nom_25', name: 'Катетер венозный 18G', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 4250 },
  { id: 'nom_26', name: 'Катетер венозный 20G', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 4250 },
  { id: 'nom_27', name: 'Катетер венозный 22G', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 4250 },
  { id: 'nom_28', name: 'Салфетки спиртовые', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 500 },
  { id: 'nom_29', name: 'Перчатки нитриловые M', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 1500 },
  { id: 'nom_30', name: 'Маска медицинская', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 400 },
  { id: 'nom_31', name: 'Бинт стерильный 7м', category: 'consumable', unit: 'piece', active: true, packageQuantity: 10, pricePerPackage: 450 },
  { id: 'nom_32', name: 'Пластырь бактерицидный', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 1200 },
  { id: 'nom_33', name: 'Вата медицинская 50г', category: 'consumable', unit: 'piece', active: true, packageQuantity: 10, pricePerPackage: 350 },
  { id: 'nom_34', name: 'Жгут кровоостанавливающий', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 250 },
  { id: 'nom_35', name: 'Тонометр механический', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 1500 },
  { id: 'nom_36', name: 'Стетоскоп', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 2500 },
  { id: 'nom_37', name: 'Термометр электронный', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 800 },
  { id: 'nom_38', name: 'Глюкометр + ланцеты', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 3500 },
  { id: 'nom_39', name: 'Пульсоксиметр', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 4500 },
  { id: 'nom_40', name: 'Дефибриллятор (электроды)', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 2500 },
  { id: 'nom_41', name: 'Кислородный баллон', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 5000 },
  { id: 'nom_42', name: 'Маска кислородная', category: 'consumable', unit: 'piece', active: true, packageQuantity: 10, pricePerPackage: 350 },
  { id: 'nom_43', name: 'Воздуховод ротовой', category: 'consumable', unit: 'piece', active: true, packageQuantity: 10, pricePerPackage: 1200 },
  { id: 'nom_44', name: 'Шина транспортная', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 1200 },
  { id: 'nom_45', name: 'Носилки складные', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 8500 },
  // Дополнительные расходные материалы
  { id: 'nom_81', name: 'Шприц 50мл', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 1250 },
  { id: 'nom_82', name: 'Игла 0.8х40мм', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 800 },
  { id: 'nom_83', name: 'Игла 0.7х32мм', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 800 },
  { id: 'nom_84', name: 'Игла 0.6х25мм', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 800 },
  { id: 'nom_85', name: 'Катетер венозный 16G', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 4750 },
  { id: 'nom_86', name: 'Катетер венозный 24G', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 4250 },
  { id: 'nom_87', name: 'Система для переливания крови', category: 'consumable', unit: 'piece', active: true, packageQuantity: 25, pricePerPackage: 3000 },
  { id: 'nom_88', name: 'Контейнер для биоматериала', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 3500 },
  { id: 'nom_89', name: 'Пробирка вакуумная 5мл', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 2500 },
  { id: 'nom_90', name: 'Тест-полоски для глюкометра', category: 'consumable', unit: 'piece', active: true, packageQuantity: 50, pricePerPackage: 750 },
  { id: 'nom_91', name: 'Ланцеты для глюкометра', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 1200 },
  { id: 'nom_92', name: 'Дезинфицирующий раствор 1л', category: 'consumable', unit: 'flacon', active: true, packageQuantity: 1, pricePerPackage: 280 },
  { id: 'nom_93', name: 'Стерилизационные пакеты', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 1800 },
  { id: 'nom_94', name: 'Бахилы одноразовые', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 500 },
  { id: 'nom_95', name: 'Шапочка медицинская', category: 'consumable', unit: 'piece', active: true, packageQuantity: 100, pricePerPackage: 800 },
  // Дополнительное оборудование
  { id: 'nom_96', name: 'Электрокардиограф', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 45000 },
  { id: 'nom_97', name: 'Дефибриллятор автоматический', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 125000 },
  { id: 'nom_98', name: 'Аппарат ИВЛ портативный', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 180000 },
  { id: 'nom_99', name: 'Монитор пациента', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 85000 },
  { id: 'nom_100', name: 'Инфузомат', category: 'equipment', unit: 'piece', active: true, packageQuantity: 1, pricePerPackage: 65000 },
];

// История цен
export const mockPriceHistory: PriceHistory[] = [
  // Расходные материалы
  { id: 'ph_85', nomenclatureId: 'nom_81', price: 25, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_86', nomenclatureId: 'nom_82', price: 8, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_87', nomenclatureId: 'nom_83', price: 8, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_88', nomenclatureId: 'nom_84', price: 8, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_89', nomenclatureId: 'nom_85', price: 95, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_90', nomenclatureId: 'nom_86', price: 85, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_91', nomenclatureId: 'nom_87', price: 120, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_92', nomenclatureId: 'nom_88', price: 35, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_93', nomenclatureId: 'nom_89', price: 25, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_94', nomenclatureId: 'nom_90', price: 15, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_95', nomenclatureId: 'nom_91', price: 12, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_96', nomenclatureId: 'nom_92', price: 280, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_97', nomenclatureId: 'nom_93', price: 18, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_98', nomenclatureId: 'nom_94', price: 5, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_99', nomenclatureId: 'nom_95', price: 8, changeDate: '2023-06-01', changedBy: 'admin' },
  // Оборудование
  { id: 'ph_100', nomenclatureId: 'nom_96', price: 45000, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_101', nomenclatureId: 'nom_97', price: 125000, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_102', nomenclatureId: 'nom_98', price: 180000, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_103', nomenclatureId: 'nom_99', price: 85000, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_104', nomenclatureId: 'nom_100', price: 65000, changeDate: '2023-06-01', changedBy: 'admin' },
];

// Приход за январь 2024
export const mockIncome: Income[] = mockEmployees
  .filter(e => e.status === 'active')
  .map((emp, i) => ({
    id: `inc_${i}`,
    employeeId: emp.id,
    amount: 120000 + Math.floor(Math.random() * 60000),
    period: '2024-01',
    shifts: 15 + Math.floor(Math.random() * 8),
    date: '2024-01-01',
    createdBy: 'admin',
  }));

// Пациенты
const patientNames = [
  'Смирнов Алексей Петрович', 'Кузнецова Мария Ивановна', 'Попов Виктор Сергеевич',
  'Васильева Ольга Николаевна', 'Соколов Дмитрий Андреевич', 'Михайлова Елена Викторовна',
  'Новиков Сергей Павлович', 'Фёдорова Татьяна Дмитриевна', 'Морозов Андрей Олегович',
  'Волкова Наталья Юрьевна', 'Алексеев Игорь Владимирович', 'Лебедева Светлана Романовна',
  'Семёнов Павел Константинович', 'Егорова Анна Михайловна', 'Козлов Роман Сергеевич',
  'Степанова Вера Андреевна', 'Николаев Олег Викторович', 'Орлова Ирина Петровна',
  'Андреев Максим Дмитриевич', 'Макарова Людмила Ивановна', 'Яковлев Артём Олегович',
  'Григорьева Полина Сергеевна', 'Романов Денис Александрович', 'Сергеева Надежда Павловна',
  'Тимофеев Глеб Максимович', 'Белова Екатерина Романовна', 'Денисов Илья Андреевич',
];

export const mockPatients: Patient[] = [];
let patientId = 0;
mockEmployees.filter(e => e.status === 'active').forEach(emp => {
  const visitsCount = 10 + Math.floor(Math.random() * 15);
  for (let i = 0; i < visitsCount; i++) {
    patientId++;
    const day = 1 + Math.floor(Math.random() * 15);
    mockPatients.push({
      id: `pat_${patientId}`,
      fullName: patientNames[Math.floor(Math.random() * patientNames.length)],
      birthDate: `19${40 + Math.floor(Math.random() * 60)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
      employeeId: emp.id,
      visitDate: `2024-01-${String(day).padStart(2, '0')}`,
    });
  }
});

// Расходы
export const mockExpenses: Expense[] = [];
let expenseId = 0;
const medicineIds = mockNomenclature.filter(n => n.category === 'medicine').map(n => n.id);
const consumableIds = mockNomenclature.filter(n => n.category === 'consumable').map(n => n.id);

mockPatients.forEach(patient => {
  const medsUsed = 2 + Math.floor(Math.random() * 4);
  for (let i = 0; i < medsUsed; i++) {
    expenseId++;
    const isMed = Math.random() > 0.3;
    const pool = isMed ? medicineIds : consumableIds;
    mockExpenses.push({
      id: `exp_${expenseId}`,
      employeeId: patient.employeeId,
      patientId: patient.id,
      nomenclatureId: pool[Math.floor(Math.random() * pool.length)],
      quantity: 1 + Math.floor(Math.random() * 5),
      visitDate: patient.visitDate,
      entryDate: patient.visitDate + 'T' + String(8 + Math.floor(Math.random() * 12)).padStart(2, '0') + ':' + String(Math.floor(Math.random() * 60)).padStart(2, '0'),
      offline: Math.random() > 0.9,
    });
  }
});

// Начальные остатки
export const mockInitialStocks: InitialStock[] = [];
let stockId = 0;
mockEmployees.filter(e => e.status === 'active').forEach(emp => {
  mockNomenclature.forEach(nom => {
    stockId++;
    mockInitialStocks.push({
      id: `stock_${stockId}`,
      employeeId: emp.id,
      nomenclatureId: nom.id,
      quantity: nom.category === 'equipment' ? 1 : 5 + Math.floor(Math.random() * 30),
      date: '2024-01-01',
      createdBy: 'admin',
    });
  });
});

// Возвраты
export const mockReturns: ReturnOperation[] = [
  { id: 'ret_1', employeeId: 'emp_1', nomenclatureId: 'nom_1', quantity: 5, date: '2024-01-10', corrected: false },
  { id: 'ret_2', employeeId: 'emp_3', nomenclatureId: 'nom_7', quantity: 2, date: '2024-01-12', corrected: true, correctedBy: 'storekeeper', newQuantity: 1 },
  { id: 'ret_3', employeeId: 'emp_5', nomenclatureId: 'nom_21', quantity: 10, date: '2024-01-14', corrected: false },
  { id: 'ret_4', employeeId: 'emp_2', nomenclatureId: 'nom_18', quantity: 3, date: '2024-01-13', corrected: false },
];

// Сообщения
export const mockMessages: Message[] = [
  { id: 'msg_1', fromId: 'admin', toId: 'emp_1', text: 'Иван, обратите внимание на остаток Анальгина', date: '2024-01-14T10:30', read: true },
  { id: 'msg_2', fromId: 'emp_1', toId: 'admin', text: 'Принял к сведению, закажу дополнительно', date: '2024-01-14T11:15', read: true },
  { id: 'msg_3', fromId: 'admin', toId: 'emp_3', text: 'Сидорова А.М., нужно сдать отчёт до пятницы', date: '2024-01-15T09:00', read: true },
  { id: 'msg_4', fromId: 'emp_5', toId: 'admin', text: 'Нужны дополнительные шприцы 20мл', date: '2024-01-15T08:45', read: false },
  { id: 'msg_5', fromId: 'storekeeper', toId: 'emp_5', text: 'Принято, подготовлю к выдаче', date: '2024-01-15T09:30', read: true },
  { id: 'msg_6', fromId: 'admin', toId: 'emp_9', text: 'Новикова О.Д., уточните статус', date: '2024-01-10T14:00', read: true },
  { id: 'msg_7', fromId: 'emp_7', toId: 'admin', text: 'Заканчивается Беродуал, нужно пополнение', date: '2024-01-15T11:20', read: false },
  { id: 'msg_8', fromId: 'emp_3', toId: 'admin', text: 'Отчёт подготовлю к четвергу, всё по пациентам внесено', date: '2024-01-15T09:30', read: false },
  { id: 'msg_9', fromId: 'storekeeper', toId: 'admin', text: 'Адреналин подорожал, обновил цену в системе', date: '2024-01-15T10:00', read: false },
  { id: 'msg_10', fromId: 'emp_10', toId: 'admin', text: 'У пациента Козлова А.П. аллергия на Анальгин, заменил на Кеторол', date: '2024-01-15T10:45', read: false },
  { id: 'msg_11', fromId: 'emp_13', toId: 'admin', text: 'Прошу согласовать возврат 3 амп. Преднизолона — срок годности истекает', date: '2024-01-15T11:10', read: false },
  { id: 'msg_12', fromId: 'emp_2', toId: 'admin', text: 'На выезде закончились катетеры 20G, запросил у кладовщика', date: '2024-01-15T12:00', read: false },
  { id: 'msg_13', fromId: 'emp_15', toId: 'admin', text: 'Пациент Смирнов А.П. жалуется на головокружение после введения Фуросемида', date: '2024-01-15T12:30', read: false },
  { id: 'msg_14', fromId: 'emp_8', toId: 'admin', text: 'Прошу заменить тонометр, старый неисправен', date: '2024-01-15T13:00', read: false },
  { id: 'msg_15', fromId: 'emp_20', toId: 'admin', text: 'Сегодня 18 вызовов, все отчёты внесены', date: '2024-01-15T13:30', read: false },
];

// Журнал изменений
export const mockJournal: JournalEntry[] = [
  { id: 'j_1', dateTime: '2024-01-15T09:30', userId: 'storekeeper', table: 'Номенклатура', recordId: 'nom_4', field: 'Цена', oldValue: '180', newValue: '210' },
  { id: 'j_2', dateTime: '2024-01-14T16:45', userId: 'admin', table: 'Сотрудники', recordId: 'emp_18', field: 'Статус', oldValue: 'Активен', newValue: 'Заблокирован' },
  { id: 'j_3', dateTime: '2024-01-14T14:20', userId: 'admin', table: 'Приход', recordId: 'inc_1', field: 'Сумма', oldValue: '120000', newValue: '150000' },
  { id: 'j_4', dateTime: '2024-01-13T11:00', userId: 'storekeeper', table: 'Возвраты', recordId: 'ret_2', field: 'Количество', oldValue: '2', newValue: '1' },
  { id: 'j_5', dateTime: '2024-01-12T10:15', userId: 'admin', table: 'Номенклатура', recordId: 'nom_2', field: 'Цена', oldValue: '85', newValue: '95' },
  { id: 'j_6', dateTime: '2024-01-10T09:00', userId: 'admin', table: 'Сотрудники', recordId: 'emp_14', field: 'Статус', oldValue: 'Активен', newValue: 'Уволен' },
  { id: 'j_7', dateTime: '2024-01-08T15:30', userId: 'admin', table: 'Сотрудники', recordId: 'emp_6', field: 'Статус', oldValue: 'Активен', newValue: 'Отпуск' },
  { id: 'j_8', dateTime: '2024-01-05T12:00', userId: 'storekeeper', table: 'Номенклатура', recordId: 'nom_7', field: 'Цена', oldValue: '65', newValue: '72' },
];

// Уведомления
export const mockNotifications: Notification[] = [
  { id: 'n_1', type: 'overexpense', title: 'Перерасход у Петрова П.С.', description: 'Расход (155 000 ₽) превышает приход (150 000 ₽) на 5 000 ₽', date: '2024-01-15T14:30', read: false, relatedId: 'emp_2' },
  { id: 'n_2', type: 'inactivity', title: 'Новикова О.Д. — нет расхода 7 дней', description: 'Последняя активность: 08.01.2024. Статус: Неактивен', date: '2024-01-15T09:00', read: false, relatedId: 'emp_9' },
  { id: 'n_3', type: 'return', title: 'Новый возврат от Иванов И.И.', description: 'Возврат: Анальгин 50% 2мл — 5 амп.', date: '2024-01-10T11:00', read: true, relatedId: 'ret_1' },
  { id: 'n_4', type: 'message', title: 'Сообщение от Соловьёвой М.П.', description: 'Нужны дополнительные шприцы 20мл', date: '2024-01-15T08:45', read: false },
  { id: 'n_5', type: 'price_change', title: 'Кладовщик изменил цену', description: 'Адреналин 0.1% 1мл: 180 ₽ → 210 ₽', date: '2024-01-15T09:30', read: true },
  { id: 'n_6', type: 'overexpense', title: 'Перерасход у Козлова Д.А.', description: 'Расход (140 000 ₽) превышает приход (135 000 ₽) на 5 000 ₽', date: '2024-01-14T16:00', read: true, relatedId: 'emp_4' },
];
