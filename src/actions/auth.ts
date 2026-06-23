"use server";
import { apiClient } from "@/lib/api";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

export async function registerActions(
  prevState: { success: boolean; error: string; redirectTo: string } | null,
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const data = { name, email, password };
    await apiClient<User>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return { success: true, error: "", redirectTo: "/login" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message, redirectTo: "" };
    }
    return { success: false, error: "Erro desconhecido", redirectTo: "" };
  }
}

export async function loginActions(
  prevState: { success: boolean; error: string; redirectTo: string } | null,
  formData: FormData
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const data = { email, password };

    const response = await apiClient<{ token: string }>("/session", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const cookieStore = await cookies();
    cookieStore.set("token", response.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return { success: true, error: "", redirectTo: "/dashboard" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message, redirectTo: "" };
    }
    return { success: false, error: "Erro desconhecido", redirectTo: "" };
  }
}
