import { create } from 'zustand';
import { Customer } from '@/features/customers/types/Customer.type';

interface CustomerStore {
  customerSelected: Customer | null;
  setCustomerSelected: (customer: Customer | null) => void;
  clearCustomerSelected: () => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customerSelected: null,
  setCustomerSelected: (customer) => set({ customerSelected: customer }),
  clearCustomerSelected: () => set({ customerSelected: null }),
}));
