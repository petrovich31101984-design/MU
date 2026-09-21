import { Employee, NomenclatureItem, PriceHistory, Income, Patient, Expense, InitialStock, ReturnOperation, Message, JournalEntry, Notification } from '../types';

// Генерация ID
let idCounter = 1000;
const genId = (prefix: string) => `${prefix}_${++idCounter}`;

// 30 сотрудников
export const mockEmployees: Employee[] = [
  { id: 'emp_1', personalNumber: '1001', fullName: 'Иванов Иван Иванович', status: 'active', hireDate: '2020-03-15', lastActivityDate: '2024-01-15' },
  { id: 'emp_2', personalNumber: '1002', fullName: 'Петров Пётр Сергеевич', status: 'active', hireDate: '2019-07-01', lastActivityDate: '2024-01-15' },
  { id: 'emp_3', personalNumber: '1003', fullName: 'Сидорова Анна Михайловна', status: 'active', hireDate: '2021-02-10', lastActivityDate: '2024-01-14' },
  { id: 'emp_4', personalNumber: '1004', fullName: 'Козлов Дмитрий Алексеевич', status: 'active', hireDate: '2018-11-20', lastActivityDate: '2024-01-15' },
  { id: 'emp_5', personalNumber: '1005', fullName: 'Морозова Елена Владимировна', status: 'active', hireDate: '2022-05-03', lastActivityDate: '2024-01-15' },
  { id: 'emp_6', personalNumber: '1006', fullName: 'Волков Андрей Николаевич', status: 'vacation', hireDate: '2020-08-12', lastActivityDate: '2024-01-08' },
  { id: 'emp_7', personalNumber: '1007', fullName: 'Соловьёва Мария Петровна', status: 'active', hireDate: '2021-09-25', lastActivityDate: '2024-01-15' },
  { id: 'emp_8', personalNumber: '1008', fullName: 'Лебедев Сергей Викторович', status: 'active', hireDate: '2019-04-18', lastActivityDate: '2024-01-14' },
  { id: 'emp_9', personalNumber: '1009', fullName: 'Новикова Ольга Дмитриевна', status: 'inactive', hireDate: '2020-01-30', lastActivityDate: '2024-01-02' },
  { id: 'emp_10', personalNumber: '1010', fullName: 'Попов Алексей Игоревич', status: 'active', hireDate: '2022-11-15', lastActivityDate: '2024-01-15' },
  { id: 'emp_11', personalNumber: '1011', fullName: 'Васильева Татьяна Андреевна', status: 'active', hireDate: '2021-06-07', lastActivityDate: '2024-01-15' },
  { id: 'emp_12', personalNumber: '1012', fullName: 'Михайлов Константин Олегович', status: 'active', hireDate: '2019-12-01', lastActivityDate: '2024-01-13' },
  { id: 'emp_13', personalNumber: '1013', fullName: 'Фёдорова Наталья Сергеевна', status: 'active', hireDate: '2020-07-22', lastActivityDate: '2024-01-15' },
  { id: 'emp_14', personalNumber: '1014', fullName: 'Николаев Роман Павлович', status: 'fired', hireDate: '2018-03-10', lastActivityDate: '2023-12-20' },
  { id: 'emp_15', personalNumber: '1015', fullName: 'Кузнецова Ирина Валерьевна', status: 'active', hireDate: '2022-02-14', lastActivityDate: '2024-01-15' },
  { id: 'emp_16', personalNumber: '1016', fullName: 'Орлов Максим Дмитриевич', status: 'active', hireDate: '2021-04-30', lastActivityDate: '2024-01-14' },
  { id: 'emp_17', personalNumber: '1017', fullName: 'Макарова Светлана Юрьевна', status: 'active', hireDate: '2020-10-05', lastActivityDate: '2024-01-15' },
  { id: 'emp_18', personalNumber: '1018', fullName: 'Андреев Виктор Анатольевич', status: 'blocked', hireDate: '2019-08-17', lastActivityDate: '2024-01-05' },
  { id: 'emp_19', personalNumber: '1019', fullName: 'Ковалёва Юлия Александровна', status: 'active', hireDate: '2022-07-19', lastActivityDate: '2024-01-15' },
  { id: 'emp_20', personalNumber: '1020', fullName: 'Григорьев Павел Владимирович', status: 'active', hireDate: '2021-01-11', lastActivityDate: '2024-01-14' },
  { id: 'emp_21', personalNumber: '1021', fullName: 'Белова Екатерина Романовна', status: 'active', hireDate: '2020-05-28', lastActivityDate: '2024-01-15' },
  { id: 'emp_22', personalNumber: '1022', fullName: 'Тарасов Денис Сергеевич', status: 'active', hireDate: '2019-09-14', lastActivityDate: '2024-01-13' },
  { id: 'emp_23', personalNumber: '1023', fullName: 'Комарова Людмила Ивановна', status: 'active', hireDate: '2022-03-22', lastActivityDate: '2024-01-15' },
  { id: 'emp_24', personalNumber: '1024', fullName: 'Жуков Артём Олегович', status: 'active', hireDate: '2021-08-09', lastActivityDate: '2024-01-14' },
  { id: 'emp_25', personalNumber: '1025', fullName: 'Дмитриева Вера Михайловна', status: 'vacation', hireDate: '2020-12-03', lastActivityDate: '2024-01-07' },
  { id: 'emp_26', personalNumber: '1026', fullName: 'Гусев Илья Андреевич', status: 'active', hireDate: '2019-06-25', lastActivityDate: '2024-01-15' },
  { id: 'emp_27', personalNumber: '1027', fullName: 'Антонова Полина Дмитриевна', status: 'active', hireDate: '2022-09-18', lastActivityDate: '2024-01-15' },
  { id: 'emp_28', personalNumber: '1028', fullName: 'Баранов Олег Викторович', status: 'active', hireDate: '2021-11-02', lastActivityDate: '2024-01-14' },
  { id: 'emp_29', personalNumber: '1029', fullName: 'Щербакова Надежда Петровна', status: 'active', hireDate: '2020-04-16', lastActivityDate: '2024-01-15' },
  { id: 'emp_30', personalNumber: '1030', fullName: 'Титов Глеб Максимович', status: 'active', hireDate: '2022-01-27', lastActivityDate: '2024-01-15' },
];

// Номенклатура (~50 позиций для демо)
export const mockNomenclature: NomenclatureItem[] = [
  { id: 'nom_1', name: 'Анальгин 50% 2мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_2', name: 'Дексаметазон 4мг/мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_3', name: 'Преднизолон 30мг/мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_4', name: 'Адреналин 0.1% 1мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_5', name: 'Фуросемид 10мг/мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_6', name: 'Димедрол 1% 1мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_7', name: 'Натрия хлорид 0.9% 400мл', category: 'medicine', unit: 'flacon', active: true },
  { id: 'nom_8', name: 'Реополиглюкин 400мл', category: 'medicine', unit: 'flacon', active: true },
  { id: 'nom_9', name: 'Нитроглицерин 0.5мг', category: 'medicine', unit: 'tablet', active: true },
  { id: 'nom_10', name: 'Каптоприл 25мг', category: 'medicine', unit: 'tablet', active: true },
  { id: 'nom_11', name: 'Парацетамол 500мг', category: 'medicine', unit: 'tablet', active: true },
  { id: 'nom_12', name: 'Ибупрофен 400мг', category: 'medicine', unit: 'tablet', active: true },
  { id: 'nom_13', name: 'Аспирин 500мг', category: 'medicine', unit: 'tablet', active: true },
  { id: 'nom_14', name: 'Сальбутамол 100мкг', category: 'medicine', unit: 'flacon', active: true },
  { id: 'nom_15', name: 'Беродуал раствор', category: 'medicine', unit: 'flacon', active: true },
  { id: 'nom_16', name: 'Эуфиллин 2.4% 5мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_17', name: 'Магния сульфат 25% 5мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_18', name: 'Кеторол 30мг/мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_19', name: 'Трамадол 2% 1мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_20', name: 'Диазепам 0.5% 2мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_21', name: 'Шприц 5мл', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_22', name: 'Шприц 10мл', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_23', name: 'Шприц 20мл', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_24', name: 'Система для в/в вливания', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_25', name: 'Катетер венозный 18G', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_26', name: 'Катетер венозный 20G', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_27', name: 'Катетер венозный 22G', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_28', name: 'Салфетки спиртовые', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_29', name: 'Перчатки нитриловые M', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_30', name: 'Маска медицинская', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_31', name: 'Бинт стерильный 7м', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_32', name: 'Пластырь бактерицидный', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_33', name: 'Вата медицинская 50г', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_34', name: 'Жгут кровоостанавливающий', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_35', name: 'Тонометр механический', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_36', name: 'Стетоскоп', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_37', name: 'Термометр электронный', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_38', name: 'Глюкометр + ланцеты', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_39', name: 'Пульсоксиметр', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_40', name: 'Дефибриллятор (электроды)', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_41', name: 'Кислородный баллон', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_42', name: 'Маска кислородная', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_43', name: 'Воздуховод ротовой', category: 'consumable', unit: 'piece', active: true },
  { id: 'nom_44', name: 'Шина транспортная', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_45', name: 'Носилки складные', category: 'equipment', unit: 'piece', active: true },
  { id: 'nom_46', name: 'Налоксон 0.4мг/мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_47', name: 'Гепарин 5000ЕД/мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_48', name: 'Аминазин 2.5% 1мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_49', name: 'Реланиум 0.5% 2мл', category: 'medicine', unit: 'ampoule', active: true },
  { id: 'nom_50', name: 'Амброксол 7.5мг/мл', category: 'medicine', unit: 'ampoule', active: true },
];

// История цен
export const mockPriceHistory: PriceHistory[] = [
  { id: 'ph_1', nomenclatureId: 'nom_1', price: 45, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_2', nomenclatureId: 'nom_1', price: 52, changeDate: '2023-12-01', changedBy: 'admin' },
  { id: 'ph_3', nomenclatureId: 'nom_2', price: 85, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_4', nomenclatureId: 'nom_2', price: 95, changeDate: '2024-01-01', changedBy: 'admin' },
  { id: 'ph_5', nomenclatureId: 'nom_3', price: 120, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_6', nomenclatureId: 'nom_4', price: 180, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_7', nomenclatureId: 'nom_4', price: 210, changeDate: '2024-01-05', changedBy: 'storekeeper' },
  { id: 'ph_8', nomenclatureId: 'nom_5', price: 35, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_9', nomenclatureId: 'nom_6', price: 55, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_10', nomenclatureId: 'nom_7', price: 65, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_11', nomenclatureId: 'nom_7', price: 72, changeDate: '2023-11-01', changedBy: 'admin' },
  { id: 'ph_12', nomenclatureId: 'nom_8', price: 320, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_13', nomenclatureId: 'nom_9', price: 25, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_14', nomenclatureId: 'nom_10', price: 45, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_15', nomenclatureId: 'nom_11', price: 35, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_16', nomenclatureId: 'nom_12', price: 65, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_17', nomenclatureId: 'nom_13', price: 15, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_18', nomenclatureId: 'nom_14', price: 250, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_19', nomenclatureId: 'nom_15', price: 380, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_20', nomenclatureId: 'nom_16', price: 75, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_21', nomenclatureId: 'nom_17', price: 55, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_22', nomenclatureId: 'nom_18', price: 120, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_23', nomenclatureId: 'nom_19', price: 95, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_24', nomenclatureId: 'nom_20', price: 85, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_25', nomenclatureId: 'nom_21', price: 12, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_26', nomenclatureId: 'nom_22', price: 15, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_27', nomenclatureId: 'nom_23', price: 18, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_28', nomenclatureId: 'nom_24', price: 45, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_29', nomenclatureId: 'nom_25', price: 85, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_30', nomenclatureId: 'nom_26', price: 85, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_31', nomenclatureId: 'nom_27', price: 85, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_32', nomenclatureId: 'nom_28', price: 5, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_33', nomenclatureId: 'nom_29', price: 15, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_34', nomenclatureId: 'nom_30', price: 8, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_35', nomenclatureId: 'nom_31', price: 45, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_36', nomenclatureId: 'nom_32', price: 12, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_37', nomenclatureId: 'nom_33', price: 35, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_38', nomenclatureId: 'nom_34', price: 250, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_39', nomenclatureId: 'nom_35', price: 1500, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_40', nomenclatureId: 'nom_36', price: 2500, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_41', nomenclatureId: 'nom_37', price: 800, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_42', nomenclatureId: 'nom_38', price: 3500, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_43', nomenclatureId: 'nom_39', price: 4500, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_44', nomenclatureId: 'nom_40', price: 2500, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_45', nomenclatureId: 'nom_41', price: 5000, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_46', nomenclatureId: 'nom_42', price: 35, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_47', nomenclatureId: 'nom_43', price: 120, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_48', nomenclatureId: 'nom_44', price: 1200, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_49', nomenclatureId: 'nom_45', price: 8500, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_50', nomenclatureId: 'nom_46', price: 350, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_51', nomenclatureId: 'nom_47', price: 280, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_52', nomenclatureId: 'nom_48', price: 75, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_53', nomenclatureId: 'nom_49', price: 110, changeDate: '2023-06-01', changedBy: 'admin' },
  { id: 'ph_54', nomenclatureId: 'nom_50', price: 95, changeDate: '2023-06-01', changedBy: 'admin' },
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
  { id: 'msg_3', fromId: 'admin', toId: 'emp_3', text: 'Сидорова А.М., нужно сдать отчёт до пятницы', date: '2024-01-15T09:00', read: false },
  { id: 'msg_4', fromId: 'emp_5', toId: 'storekeeper', text: 'Нужны дополнительные шприцы 20мл', date: '2024-01-15T08:45', read: false },
  { id: 'msg_5', fromId: 'storekeeper', toId: 'emp_5', text: 'Принято, подготовлю к выдаче', date: '2024-01-15T09:30', read: true },
  { id: 'msg_6', fromId: 'admin', toId: 'emp_9', text: 'Новикова О.Д., уточните статус', date: '2024-01-10T14:00', read: false },
  { id: 'msg_7', fromId: 'emp_7', toId: 'storekeeper', text: 'Заканчивается Беродуал, нужно пополнение', date: '2024-01-15T11:20', read: false },
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
