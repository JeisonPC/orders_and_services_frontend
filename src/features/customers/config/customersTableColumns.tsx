import { Column } from '@/ui/organisms/Table/Table';
import { Customer } from '../types/Customer.type';

export const customersTableColumns: Column<Customer>[] = [
  {
    key: 'id',
    label: 'ID',
    render: (customer: Customer) => <span>#{customer.id}</span>,
  },
  {
    key: 'customer_name',
    label: 'Nombre del Cliente',
    render: (customer: Customer) => <strong>{customer.customer_name}</strong>,
  },
  {
    key: 'address',
    label: 'Dirección',
  },
  {
    key: 'orders_count',
    label: 'Pedidos',
    render: (customer: Customer) => (
      <span className="badge">{customer.orders_count} pedidos</span>
    ),
  },
];
