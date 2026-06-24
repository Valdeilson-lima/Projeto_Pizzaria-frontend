"use client";

import { ShoppingCart, Package, Tags, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { logoutActions } from "@/actions/auth";
import { redirect } from "next/navigation";

interface SidebarProps {
  name: string;
}

const manuItems = [
  { title: "Pedidos", href: "/dashboard", icon: ShoppingCart },
  { title: "Produtos", href: "/dashboard/products", icon: Package },
  { title: "Categorias", href: "/dashboard/categories", icon: Tags },
];

export function Sidebar({ name }: SidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 bg-app-sidebar min-h-screen lg:flex flex-col border-r border-app-border">
      <div className="border-b border-app-border p-6">
        <h2 className="text-xl font-bold text-white">
          Dom<span className="text-brand-primary">Luydd</span>
        </h2>
        <p className="text-sm text-gray-300 mt-1">Olá, {name}</p>
      </div>

      <nav className="flex-1 p-4 space-y-4">
        {manuItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
              pathname === item.href
                ? "bg-brand-primary text-white"
                : "text-gray-300 hover:bg-gray-400/10 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <form className="border-t border-app-border p-4" action={logoutActions}>
        <Button
          className="w-full justify-start gap-3 text-sm font-medium text-gray-300 hover:bg-gray-400/10 hover:text-white cursor-pointer px-3 py-4"
          variant="ghost"
          type="submit"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </Button>
      </form>
    </aside>
  );
}
