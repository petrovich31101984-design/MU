export type EmployeeStatus = 'active' | 'inactive' | 'fired' | 'blocked';

export type Category = 'medicine' | 'medicine_pku' | 'equipment' | 'consumable';

export type Unit = 'ampoule' | 'tablet' | 'flacon' | 'piece';

export interface Employee {
  id: string;
  personalNumber: string;
  fullName: string;
  password: string;
  status: EmployeeStatus;
  archived?: boolean;
  hireDate: string;
  lastActivityDate: string;
}

export interface NomenclatureItem {
  id: string;
  name: string;
  category: Category;
  unit: Unit;
  active: boolean;
  packageQuantity?: number;
  pricePerPackage?: number;
}

export interface PriceHistory {
  id: string;
  nomenclatureId: string;
  price: number;
  changeDate: string;
  changedBy: string;
}

export interface Income {
  id: string;
  employeeId: string;
  amount: number;
  period: string;
  date: string;
  createdBy: string;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  text: string;
  date: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'overexpense' | 'inactivity' | 'return' | 'message' | 'price_change';
  title: string;
  description: string;
  date: string;
  read: boolean;
}

export const UNIT_LABELS: Record<Unit, string> = {
  ampoule: 'амп.',
  tablet: 'табл.',
  flacon: 'фл.',
  piece: 'шт.',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  medicine: 'Лекарства',
  medicine_pku: 'ПКУ ЛС',
  equipment: 'Оборудование',
  consumable: 'Расходные материалы',
};

export const STATUS_LABELS: Record<EmployeeStatus, string> = {
  active: 'Активен',
  inactive: 'Неактивен',
  fired: 'Уволен',
  blocked: 'Заблокирован',
};

export const STATUS_COLORS: Record<EmployeeStatus, string> = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-700 border-gray-200',
  fired: 'bg-red-100 text-red-700 border-red-200',
  blocked: 'bg-orange-100 text-orange-700 border-orange-200',
};
