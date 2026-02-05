import { apiClient } from "@/lib/api-client";
import { Order, CreateOrderDTO } from "../types/Order.type";

export const ordersService = {
  getOrders: async (customerId: number) => {
    return apiClient.get<Order[]>("/api/orders", { customer_id: customerId });
  },

  getOrderById: async (orderId: number) => {
    return apiClient.get<Order>(`/api/orders/${orderId}`);
  },

  createOrder: async (orderData: CreateOrderDTO) => {
    return apiClient.post<Order>("/api/orders", { order: orderData });
  },

  updateOrder: async (orderId: number, data: Partial<Order>) => {
    return apiClient.patch<Order>(`/api/orders/${orderId}`, data);
  },

  deleteOrder: async (orderId: number) => {
    return apiClient.delete<void>(`/api/orders/${orderId}`);
  },
};
