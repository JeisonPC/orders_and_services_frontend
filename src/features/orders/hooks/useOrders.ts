import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Order, CreateOrderDTO } from '../types/Order.type';
import getOrdersUseCase from '../useCases/getOrders.useCase';
import { ordersService } from '../services/orders.service';

export const useOrders = (customerId: number, page: number = 1, perPage: number = 10) => {
  return useQuery({
    queryKey: ['orders', customerId, page, perPage],
    queryFn: () => getOrdersUseCase(customerId, page, perPage),
    enabled: !!customerId,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newOrder: CreateOrderDTO) =>
      ordersService.createOrder(newOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Order> & { id: number }) =>
      ordersService.updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ordersService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
