import { TableColumn } from '@/ui/organisms/Table/Table';
import { Customer } from '../types/Customer.type';

export const customersTableColumns: TableColumn<Customer>[] = [
  {
    key: 'id',
    label: 'ID',
    render: (customer) => <span>#{customer.id}</span>,
  },
  {
    key: 'customer_name',
    label: 'Nombre del Cliente',
    render: (customer) => <strong>{customer.customer_name}</strong>,
  },
  {
    key: 'address',
    label: 'Dirección',
    render: (customer) => <span>{customer.address}</span>,
  },
  {
    key: 'orders_count',
    label: 'Pedidos',
    render: (customer) => (
      <span className="badge">{customer.orders_count} pedidos</span>
    ),
  },
];
