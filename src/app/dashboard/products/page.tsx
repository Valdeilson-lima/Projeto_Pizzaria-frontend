import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category, Product } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateProductDialog } from "@/components/dashboard/create-product-dialog";
import Image from "next/image";

export default async function ProductsPage() {
  const token = await getToken();

  const [products, categories] = await Promise.all([
    apiClient<Product[]>("/products", {
      token,
      cache: "no-store",
    }),
    apiClient<Category[]>("/categories", {
      token,
      cache: "no-store",
    }),
  ]);

  function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
          <p className="text-gray-400 text-sm mt-1">
            Gerencie os produtos do cardápio
          </p>
        </div>
        <CreateProductDialog categories={categories} />
      </div>

      <Card className="bg-app-card border-app-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            Todos os Produtos
          </CardTitle>
          <CardDescription className="text-gray-400">
            {products.length}{" "}
            {products.length === 1
              ? "produto encontrado"
              : "produtos encontrados"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-app-border hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">
                  Imagem
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Nome
                </TableHead>
                <TableHead className="text-gray-400 font-medium hidden md:table-cell">
                  Categoria
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Preço
                </TableHead>
                <TableHead className="text-gray-400 font-medium hidden lg:table-cell">
                  Criado em
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow className="border-app-border hover:bg-transparent">
                  <TableCell
                    colSpan={5}
                    className="text-gray-500 text-center py-8"
                  >
                    Nenhum produto encontrado
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow
                    key={product.id}
                    className="border-app-border hover:bg-gray-400/5"
                  >
                    <TableCell>
                      <div className="relative w-10 h-10 rounded-md overflow-hidden bg-app-background">
                        {product.banner ? (
                          <Image
                            src={product.banner}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                            —
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {product.name}
                      {product.description && (
                        <p className="text-gray-400 text-sm mt-1">
                          {product.description}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="text-gray-400 hidden md:table-cell">
                      {product.category?.name || "—"}
                    </TableCell>
                    <TableCell className="text-white">
                      {formatPrice(product.price)}
                    </TableCell>
                    <TableCell className="text-gray-400 hidden lg:table-cell">
                      {new Date(product.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
