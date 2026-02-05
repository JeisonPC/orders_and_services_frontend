import { ordersService } from "../services/orders.service";

const getOrdersUseCase = async (customerId: number) => {
  // Se Agrega lógica de negocio adicional si es necesario. 
  // Por ej, que el usuario solo pueda realizar un pedido si el usuario premium.
  // await userService.checkUserSubscription(userId, 'view_orders');
  const orders = await ordersService.getOrders(customerId);
  return orders;
};

export default getOrdersUseCase;
