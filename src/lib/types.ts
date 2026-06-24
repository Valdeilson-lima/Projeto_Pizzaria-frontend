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
