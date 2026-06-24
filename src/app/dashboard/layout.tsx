import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { requireAdminUser } from "@/lib/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();

  return (
    <div className="flex h-screen overflow-hidden text-white">
      {/* Sidebar Desktop*/}
      <Sidebar name={user?.name} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* <Header Mobile/> */}
        <MobileSidebar name={user?.name} />

        <main className="flex-1 overflow-y-auto bg-app-background">
          <div className="container max-w-full px-4 py-6 ">{children}</div>
        </main>
      </div>
    </div>
  );
}
