export interface User {
  id: string;
  name: string;
  email: string;
  role: "STAFF" | "ADMIN";
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  banner: string;
  disabled: boolean;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  amount: number;
  productId: string;
  product: Product;
  createdAt: string;
}

export interface Order {
  id: string;
  table: number;
  name: string | null;
  status: boolean;
  draft: boolean;
  disabled: boolean;
  Items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = "OPEN" | "SENT" | "FINISHED";

export function getOrderStatus(order: Order): OrderStatus {
  if (order.draft) return "OPEN";
  if (!order.status) return "SENT";
  return "FINISHED";
}
