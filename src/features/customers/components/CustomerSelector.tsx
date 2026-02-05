"use client";

import { useEffect } from "react";
import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { useCustomerStore } from "@/store/customerStore";
import styles from "./CustomerSelector.module.css";

export const CustomerSelector = () => {
  const { data: customers, isLoading } = useCustomers();
  const { customerSelected, setCustomerSelected } = useCustomerStore();

  useEffect(() => {
    if (customers && customers.length > 0 && !customerSelected) {
      setCustomerSelected(customers[0]);
    }
  }, [customers, customerSelected, setCustomerSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = Number(e.target.value);
    const customer = customers?.find((c) => c.id === customerId);
    setCustomerSelected(customer || null);
  };

  return (
    <div className={styles.selector}>
      <select
        className={styles.select}
        value={customerSelected?.id || ""}
        onChange={handleChange}
        disabled={isLoading}
      >
        <option value="">
          {isLoading ? "Cargando..." : "Selecciona un cliente"}
        </option>
        {customers?.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.customer_name}
          </option>
        ))}
      </select>
    </div>
  );
};
