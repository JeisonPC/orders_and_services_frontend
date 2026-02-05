"use client";

import { useState } from "react";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { useCustomerStore } from "@/store/customerStore";
import { PageLayout } from "@/ui/organisms/PageLayout";
import { Table } from "@/ui/organisms/Table";
import { ordersTableColumns } from "@/features/orders/config/ordersTableColumns";
import { OrdersPageActions } from "@/features/orders/components/OrdersPageActions";

export const OrdersPageWithData = () => {
  const { customerSelected } = useCustomerStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const { data: response, isLoading } = useOrders(customerSelected?.id || 0, currentPage, perPage);
  
  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset a la primera página cuando cambia el perPage
  };
  
  const pageTitle = customerSelected 
    ? `Pedidos de ${customerSelected.customer_name}`
    : "Pedidos";
  
  return (
    <PageLayout
      title={pageTitle}
      actions={<OrdersPageActions />}
    >
      {!customerSelected ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-1)' }}>
          Selecciona un cliente para ver sus pedidos
        </div>
      ) : (
        <Table
          data={response?.data || []}
          columns={ordersTableColumns}
          isLoading={isLoading}
          getRowKey={(order) => order.id}
          pagination={response?.pagination ? {
            currentPage: response.pagination.current_page,
            totalPages: response.pagination.total_pages,
            perPage: perPage,
            onPageChange: (page) => setCurrentPage(page),
            onPerPageChange: handlePerPageChange
          } : undefined}
        />
      )}
    </PageLayout>
  );
};
