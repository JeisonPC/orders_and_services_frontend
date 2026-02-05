import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { customersService } from '../services/customers.service';
import { getCustomersUseCase } from '../useCases/getCustomers.useCase';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../types/Customer.type';

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomersUseCase(customersService.getCustomers),
  });
};

export const useCustomer = (id: number) => {
  return useQuery({
    queryKey: ['customers', id],
    queryFn: () => customersService.getCustomer(id),
    enabled: !!id,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (customerData: CreateCustomerDTO) =>
      customersService.createCustomer(customerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
};