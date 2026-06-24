import { getUser } from "@/lib/auth";

export default async function Dashboard() {
  const user = await getUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.name}!</p>
      <p>Seu e-mail é: {user?.email}</p>
      <p>Seu ID é: {user?.id}</p>
    </div>
  );
}
