"use server";

import { apiClient } from "@/lib/api";
import { Product } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createProductAction(
  prevState: { success: boolean; error: string } | null,
  formData: FormData
) {
  try {
    const token = await getToken();

    const rawPrice = formData.get("price") as string;
    const priceInCents = rawPrice.replace(/\D/g, "");

    const apiFormData = new FormData();
    apiFormData.append("name", formData.get("name") as string);
    apiFormData.append("description", formData.get("description") as string);
    apiFormData.append("price", priceInCents);
    apiFormData.append("categoryId", formData.get("categoryId") as string);

    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      apiFormData.append("file", file);
    }

    await apiClient<Product>("/products", {
      method: "POST",
      body: apiFormData,
      token,
    });

    revalidatePath("/dashboard/products");
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro desconhecido" };
  }
}
