import { requireAdminUser } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();
  console.log("User in RootLayout:", user);

  return (
    <div className="bg-app-background min-h-screen">
      <h1>Dashboard Layout</h1>
      {children}
    </div>
  );
}
