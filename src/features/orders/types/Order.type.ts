export interface Order {
  id: number;
  customer_id: number;
  status: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderDTO {
  customer_id: number;
  product_name: string;
  quantity: number;
  price: number;
  status: string;
}
export interface OrdersResponse {
  data: Order[];
  pagination: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
}