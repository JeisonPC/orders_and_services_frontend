export interface Customer {
  id: number;
  customer_name: string;
  address: string;
  orders_count: number;
}

export interface CreateCustomerDTO {
  customer_name: string;
  address: string;
}

export interface UpdateCustomerDTO {
  customer_name?: string;
  address?: string;
}
