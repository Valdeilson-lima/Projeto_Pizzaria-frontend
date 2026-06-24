import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Category } from "@/lib/types";
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
import { CreateCategoryDialog } from "@/components/dashboard/create-category-dialog";

export default async function CategoriesPage() {
  const token = await getToken();

  const categories = await apiClient<Category[]>("/categories", {
    token,
    cache: "no-store",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Categorias</h1>
          <p className="text-gray-400 text-sm mt-1">
            Gerencie as categorias do cardápio
          </p>
        </div>
        <CreateCategoryDialog />
      </div>

      <Card className="bg-app-card border-app-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            Todas as Categorias
          </CardTitle>
          <CardDescription className="text-gray-400">
            {categories.length}{" "}
            {categories.length === 1
              ? "categoria encontrada"
              : "categorias encontradas"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-app-border hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">
                  Nome
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Criado em
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow className="border-app-border hover:bg-transparent">
                  <TableCell
                    colSpan={2}
                    className="text-gray-500 text-center py-8"
                  >
                    Nenhuma categoria encontrada
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow
                    key={category.id}
                    className="border-app-border hover:bg-gray-400/5 cursor-pointer"
                  >
                    <TableCell className="text-white font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(category.createdAt).toLocaleDateString(
                        "pt-BR",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
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
