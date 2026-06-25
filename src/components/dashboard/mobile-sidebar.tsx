"use client";

import { ShoppingCart, Package, Tags, LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { logoutActions } from "@/actions/auth";
import { redirect } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SidebarProps {
  name: string;
}

const manuItems = [
  { title: "Pedidos", href: "/dashboard", icon: ShoppingCart },
  { title: "Produtos", href: "/dashboard/products", icon: Package },
  { title: "Categorias", href: "/dashboard/categories", icon: Tags },
];

export function MobileSidebar({ name }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-50 border-b border-app-border bg-app-card">
        <div className="flex h-16 items-center justify-between px-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size={"icon"}
                className="text-white hover:text-black cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 bg-app-sidebar border-l border-app-border"
            >
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-white">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <nav className=" flex flex-col p-4 space-y-4">
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

              <div className="absolute bottom-0 border-t border-app-border p-4 w-full">
                <form action={logoutActions}>
                  <Button
                    className="w-full justify-start gap-3 text-sm font-medium text-gray-300 hover:bg-gray-400/10 hover:text-white cursor-pointer px-3 py-4"
                    variant="ghost"
                    type="submit"
                  >
                    <LogOut className="w-5 h-5" />
                    Sair
                  </Button>
                </form>
              </div>
            </SheetContent>

            <SheetFooter>
              <SheetClose />
            </SheetFooter>
          </Sheet>

          <h1 className="">
            <span className="text-xl font-bold text-white">
              Dom<span className="text-brand-primary">Luydd</span>
            </span>
            <p className="text-xs text-gray-300 mt-1">Olá, {name}</p>
          </h1>
        </div>
      </header>
    </div>
  );
}
