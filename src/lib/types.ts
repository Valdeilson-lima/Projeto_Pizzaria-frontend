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
