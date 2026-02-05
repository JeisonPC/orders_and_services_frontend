import { apiClient } from "@/lib/api-client";
import { Order, CreateOrderDTO, OrdersResponse } from "../types/Order.type";

export const ordersService = {
  getOrders: async (customerId: number, page: number = 1, perPage: number = 10) => {
    return apiClient.get<OrdersResponse>("/api/orders", { customer_id: customerId, page, per_page: perPage });
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
