import { Order } from '../types/Order.type';

const API_URL = process.env.NEXT_PUBLIC_BACK_URL || 'http://localhost:3001';

export async function getOrders(customerId: number): Promise<Order[]> {
  const res = await fetch(`${API_URL}/orders?customer_id=${customerId}`, {
    headers: {
      'Accept': '*/*',
    },
    cache: 'no-store', // Para datos dinámicos
    // cache: 'force-cache', // Para datos estáticos
    // next: { revalidate: 60 }, // Para ISR (revalidar cada 60 segundos)
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch orders: ${res.status}`);
  }

  return res.json();
}

export async function getOrderById(orderId: number): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${orderId}`, {
    headers: {
      'Accept': '*/*',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch order: ${res.status}`);
  }

  return res.json();
}
