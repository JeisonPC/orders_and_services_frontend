"use client";

import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrdersPageTemplate } from "@/ui/templates/OrdersPageTemplate";
import { Table } from "@/ui/organisms/Table";
import { ordersTableColumns } from "@/features/orders/config/ordersTableColumns";
import { OrdersPageActions } from "@/features/orders/components/OrdersPageActions";

export default function Home() {
  const { data: orders, isLoading } = useOrders(1);
  console.log('Orders data:', orders);
  return (
    <OrdersPageTemplate
      title="Pedidos"
      actions={<OrdersPageActions />}
    >
      <Table
        data={orders || []}
        columns={ordersTableColumns}
        isLoading={isLoading}
        getRowKey={(order) => order.id}
      />
    </OrdersPageTemplate>
  );
}
