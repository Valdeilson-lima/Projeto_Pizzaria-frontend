"use server";

import { apiClient } from "@/lib/api";
import { Category } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(
  prevState: { success: boolean; error: string } | null,
  formData: FormData
) {
  try {
    const token = await getToken();
    const name = formData.get("name") as string;

    await apiClient<Category>("/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      token,
    });

    revalidatePath("/dashboard/categories");
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro desconhecido" };
  }
}
