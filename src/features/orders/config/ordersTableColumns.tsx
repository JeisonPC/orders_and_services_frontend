import { Order } from '@/features/orders/types/Order.type';
import styles from '@/ui/organisms/Table/Table.module.css';

const getStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: styles.statusPending,
    completed: styles.statusCompleted,
    cancelled: styles.statusCancelled,
    processing: styles.statusProcessing,
  };
  return `${styles.status} ${statusMap[status.toLowerCase()] || styles.statusPending}`;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const ordersTableColumns = [
  {
    key: 'id',
    label: 'ID',
    render: (order: Order) => `#${order.id}`,
  },
  {
    key: 'customer_id',
    label: 'Cliente',
    render: (order: Order) => `Cliente ${order.customer_id}`,
  },
  {
    key: 'status',
    label: 'Estado',
    render: (order: Order) => (
      <span className={getStatusClass(order.status)}>
        {order.status}
      </span>
    ),
  },
  {
    key: 'total',
    label: 'Total',
    render: (order: Order) => formatCurrency(order.total),
  },
  {
    key: 'created_at',
    label: 'Fecha',
    render: (order: Order) => formatDate(order.created_at),
  },
];
