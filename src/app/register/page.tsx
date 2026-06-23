import { RegisterForm } from "@/components/forms/register-form";

export default function Page() {
  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4">
      <div className="w-full ">
        <RegisterForm />
      </div>
    </div>
  );
}
