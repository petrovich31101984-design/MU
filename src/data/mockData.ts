import { Employee, NomenclatureItem, PriceHistory, Income, Message, Notification } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 'emp_1',
    personalNumber: '1001',
    fullName: 'Иванов Иван Иванович',
    password: '1234',
    status: 'active',
    hireDate: '2023-01-15',
    lastActivityDate: '2026-09-20'
  },
  {
    id: 'emp_2',
    personalNumber: '1002',
    fullName: 'Петров Петр Сергеевич',
    password: '1234',
    status: 'active',
    hireDate: '2023-02-20',
    lastActivityDate: '2026-09-19'
  },
  {
    id: 'emp_3',
    personalNumber: '1003',
    fullName: 'Сидорова Анна Михайловна',
    password: '1234',
    status: 'active',
    hireDate: '2023-03-10',
    lastActivityDate: '2026-09-18'
  },
  {
    id: 'emp_4',
    personalNumber: '1004',
    fullName: 'Козлов Дмитрий Алексеевич',
    password: '1234',
    status: 'inactive',
    hireDate: '2023-04-05',
    lastActivityDate: '2026-08-15'
  }
];

export const mockNomenclature: NomenclatureItem[] = [
  {
    id: 'nom_1',
    name: 'Анальгин 50% 2мл',
    category: 'medicine',
    unit: 'ampoule',
    active: true,
    packageQuantity: 10,
    pricePerPackage: 450
  },
  {
    id: 'nom_2',
    name: 'Дексаметазон 4мг/мл',
    category: 'medicine',
    unit: 'ampoule',
    active: true,
    packageQuantity: 10,
    pricePerPackage: 850
  },
  {
    id: 'nom_3',
    name: 'Шприц 5мл',
    category: 'consumable',
    unit: 'piece',
    active: true,
    packageQuantity: 100,
    pricePerPackage: 1200
  }
];

export const mockPriceHistory: PriceHistory[] = [
  {
    id: 'ph_1',
    nomenclatureId: 'nom_1',
    price: 45,
    changeDate: '2026-01-15',
    changedBy: 'admin'
  },
  {
    id: 'ph_2',
    nomenclatureId: 'nom_2',
    price: 85,
    changeDate: '2026-02-10',
    changedBy: 'admin'
  }
];

export const mockIncome: Income[] = [
  {
    id: 'inc_1',
    employeeId: 'emp_1',
    amount: 150000,
    period: '2026-08',
    date: '2026-08-01',
    createdBy: 'admin'
  },
  {
    id: 'inc_2',
    employeeId: 'emp_2',
    amount: 145000,
    period: '2026-08',
    date: '2026-08-01',
    createdBy: 'admin'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg_1',
    fromId: 'emp_1',
    toId: 'admin',
    text: 'Здравствуйте! У меня вопрос по отчёту',
    date: '2026-09-20T10:30',
    read: false
  },
  {
    id: 'msg_2',
    fromId: 'emp_2',
    toId: 'admin',
    text: 'Нужна консультация по номенклатуре',
    date: '2026-09-19T14:15',
    read: false
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n_1',
    type: 'overexpense',
    title: 'Перерасход у сотрудника',
    description: 'Иванов И.И. превысил лимит расхода на 15%',
    date: '2026-09-20T09:00',
    read: false
  },
  {
    id: 'n_2',
    type: 'inactivity',
    title: 'Неактивность сотрудника',
    description: 'Козлов Д.А. не выходил на связь 7 дней',
    date: '2026-09-19T08:00',
    read: false
  }
];
