import { apiClient } from '@/lib/api-client';
import {
  Customer,
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from '../types/Customer.type';

export const customersService = {
  getCustomers: async (): Promise<Customer[]> => {
    return apiClient.get<Customer[]>('/api/customers');
  },

  getCustomer: async (id: number): Promise<Customer> => {
    return apiClient.get<Customer>(`/api/customers/${id}`);
  },

  createCustomer: async (customerData: CreateCustomerDTO): Promise<Customer> => {
    return apiClient.post<Customer>('/api/customers', customerData);
  },

  updateCustomer: async (
    id: number,
    customerData: UpdateCustomerDTO
  ): Promise<Customer> => {
    return apiClient.patch<Customer>(`/api/customers/${id}`, customerData);
  },

  deleteCustomer: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/api/customers/${id}`);
  },
};
