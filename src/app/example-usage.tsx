"use client";

import { useOrders, useCreateOrder, useUpdateOrder, useDeleteOrder } from '@/features/orders/hooks/useOrders';

export default function ExampleUsage() {
  const { data, isLoading, isError, error } = useOrders(1);
  const createOrder = useCreateOrder();
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();

  const handleCreateOrder = () => {
    createOrder.mutate({
      customer_id: 1,
      status: 'pending',
      total: 100,
    });
  };

  const handleUpdateOrder = (id: number) => {
    updateOrder.mutate({
      id,
      status: 'completed',
    });
  };

  const handleDeleteOrder = (id: number) => {
    deleteOrder.mutate(id);
  };

  if (isLoading) return <div>Cargando pedidos...</div>;
  
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Pedidos del Cliente 1</h2>
      <button onClick={handleCreateOrder}>Crear Pedido</button>
      <ul>
        {data?.map((order) => (
          <li key={order.id}>
            Pedido #{order.id} - Estado: {order.status} - Total: ${order.total}
            <button onClick={() => handleUpdateOrder(order.id)}>Actualizar</button>
            <button onClick={() => handleDeleteOrder(order.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
