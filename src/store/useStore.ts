import { create } from 'zustand';
import { Employee, NomenclatureItem, PriceHistory, Income, Message, Notification } from '../types';
import { mockEmployees, mockNomenclature, mockPriceHistory, mockIncome, mockMessages, mockNotifications } from '../data/mockData';

interface AppState {
  employees: Employee[];
  nomenclature: NomenclatureItem[];
  priceHistory: PriceHistory[];
  income: Income[];
  messages: Message[];
  notifications: Notification[];
  
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  archiveEmployee: (id: string) => void;
  
  addNomenclature: (item: Omit<NomenclatureItem, 'id'>) => void;
  updatePackagePrice: (id: string, price: number) => void;
  removeNomenclature: (id: string) => void;
  
  addIncome: (income: Omit<Income, 'id'>) => void;
  updateIncome: (id: string, data: Partial<Income>) => void;
  removeIncome: (id: string) => void;
  
  markNotificationRead: (id: string) => void;
  markMessageRead: (id: string) => void;
  
  getCurrentPrice: (nomenclatureId: string) => number;
  getEmployeeIncome: (employeeId: string, period: string) => number;
}

export const useStore = create<AppState>((set, get) => ({
  employees: mockEmployees,
  nomenclature: mockNomenclature,
  priceHistory: mockPriceHistory,
  income: mockIncome,
  messages: mockMessages,
  notifications: mockNotifications,
  
  addEmployee: (employee) => set((state) => ({
    employees: [...state.employees, { ...employee, id: `emp_${Date.now()}` }]
  })),
  
  updateEmployee: (id, data) => set((state) => ({
    employees: state.employees.map(emp => emp.id === id ? { ...emp, ...data } : emp)
  })),
  
  archiveEmployee: (id) => set((state) => ({
    employees: state.employees.map(emp => emp.id === id ? { ...emp, archived: true } : emp)
  })),
  
  addNomenclature: (item) => set((state) => ({
    nomenclature: [...state.nomenclature, { ...item, id: `nom_${Date.now()}` }]
  })),
  
  updatePackagePrice: (id, price) => set((state) => ({
    nomenclature: state.nomenclature.map(item => 
      item.id === id ? { ...item, pricePerPackage: price } : item
    ),
    priceHistory: [...state.priceHistory, {
      id: `ph_${Date.now()}`,
      nomenclatureId: id,
      price,
      changeDate: new Date().toISOString().split('T')[0],
      changedBy: 'admin'
    }]
  })),
  
  removeNomenclature: (id) => set((state) => ({
    nomenclature: state.nomenclature.filter(item => item.id !== id)
  })),
  
  addIncome: (income) => set((state) => ({
    income: [...state.income, { ...income, id: `inc_${Date.now()}` }]
  })),
  
  updateIncome: (id, data) => set((state) => ({
    income: state.income.map(inc => inc.id === id ? { ...inc, ...data } : inc)
  })),
  
  removeIncome: (id) => set((state) => ({
    income: state.income.filter(inc => inc.id !== id)
  })),
  
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    )
  })),
  
  markMessageRead: (id) => set((state) => ({
    messages: state.messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    )
  })),
  
  getCurrentPrice: (nomenclatureId) => {
    const state = get();
    const item = state.nomenclature.find(n => n.id === nomenclatureId);
    if (!item || !item.packageQuantity || !item.pricePerPackage) return 0;
    return item.pricePerPackage / item.packageQuantity;
  },
  
  getEmployeeIncome: (employeeId, period) => {
    const state = get();
    return state.income
      .filter(inc => inc.employeeId === employeeId && inc.period === period)
      .reduce((sum, inc) => sum + inc.amount, 0);
  },
}));
