import { LoginForm } from "@/components/forms/login-form";

export default function Page() {
  return (
    <div className="bg-app-background min-h-screen flex items-center justify-center px-4">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
}
