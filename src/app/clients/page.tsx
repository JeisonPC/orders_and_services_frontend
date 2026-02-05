"use client";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { OrdersPageTemplate } from "@/ui/templates/OrdersPageTemplate";
import { Table } from "@/ui/organisms/Table";
import { customersTableColumns } from "@/features/customers/config/customersTableColumns";

export default function CustomersPage() {
  const { data: customers, isLoading } = useCustomers();

  return (
    <OrdersPageTemplate
      title="Clientes"
      actions={<></>}
    >
      <Table
        data={customers || []}
        columns={customersTableColumns}
        isLoading={isLoading}
        getRowKey={(customer) => customer.id}
      />
    </OrdersPageTemplate>
  );
}
