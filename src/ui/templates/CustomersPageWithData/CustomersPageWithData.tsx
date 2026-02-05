"use client";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { PageLayout } from "@/ui/organisms/PageLayout";
import { Table } from "@/ui/organisms/Table";
import { customersTableColumns } from "@/features/customers/config/customersTableColumns";

export const CustomersPageWithData = () => {
  const { data: customers, isLoading } = useCustomers();
  
  return (
    <PageLayout
      title="Clientes"
    >
      <Table
        data={customers || []}
        columns={customersTableColumns}
        isLoading={isLoading}
        getRowKey={(customer) => customer.id}
      />
    </PageLayout>
  );
};
