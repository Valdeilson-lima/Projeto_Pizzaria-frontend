import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(valor: string) {
  const numbers = valor.replace(/\D/g, "");

  if (!numbers) {
    return "";
  }

  const amaunt = parseInt(numbers) / 100;
  return amaunt.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
