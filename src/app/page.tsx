import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth";

export default async function Page() {
  const token = await getToken();

  if (token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
