import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para formatar o preço em centavos para o formato monetário brasileiro no imput
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

// Função para formatar o preço em centavos para o formato monetário brasileiro no display
export function formatPriceReal(price: number) {
  return (price / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
