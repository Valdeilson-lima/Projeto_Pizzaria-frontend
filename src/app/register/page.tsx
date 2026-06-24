import { RegisterForm } from "@/components/forms/register-form";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4">
      <div className="w-full ">
        <RegisterForm />
      </div>
    </div>
  );
}
