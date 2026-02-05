import { ordersService } from "../services/orders.service";

const getOrdersUseCase = async (customerId: number, page: number = 1, perPage: number = 10) => {
  // Se Agrega lógica de negocio adicional si es necesario. 
  // Por ej, que el usuario solo pueda realizar un pedido si el usuario premium.
  // await userService.checkUserSubscription(userId, 'view_orders');
  const response = await ordersService.getOrders(customerId, page, perPage);
  return response;
};

export default getOrdersUseCase;
