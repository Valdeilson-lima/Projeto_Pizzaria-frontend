"use server";

import { apiClient } from "@/lib/api";
import { Order } from "@/lib/types";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getOrderDetailAction(orderId: string) {
  try {
    const token = await getToken();
    const data = await apiClient<Order>(`/order/detail?orderId=${orderId}`, {
      token,
      cache: "no-store",
    });
    return { success: true, data, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, data: null, error: error.message };
    }
    return { success: false, data: null, error: "Erro desconhecido" };
  }
}

export async function sendOrderAction(
  prevState: { success: boolean; error: string } | null,
  formData: FormData
) {
  try {
    const token = await getToken();
    const orderId = formData.get("orderId") as string;
    const name = formData.get("name") as string;

    await apiClient<Order>("/order/send", {
      method: "PUT",
      body: JSON.stringify({ orderId, name }),
      token,
    });

    revalidatePath("/dashboard");
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro desconhecido" };
  }
}

export async function finishOrderAction(
  prevState: { success: boolean; error: string } | null,
  formData: FormData
) {
  try {
    const token = await getToken();
    const orderId = formData.get("orderId") as string;

    await apiClient<Order>("/order/finish", {
      method: "PUT",
      body: JSON.stringify({ orderId }),
      token,
    });

    revalidatePath("/dashboard");
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro desconhecido" };
  }
}

export async function deleteOrderAction(
  prevState: { success: boolean; error: string } | null,
  formData: FormData
) {
  try {
    const token = await getToken();
    const orderId = formData.get("orderId") as string;

    await apiClient<Order>(`/order?orderId=${orderId}`, {
      method: "DELETE",
      token,
    });

    revalidatePath("/dashboard");
    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro desconhecido" };
  }
}
