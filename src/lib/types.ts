export interface User {
  id: string;
  name: string;
  email: string;
  role: "STAFF" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}
