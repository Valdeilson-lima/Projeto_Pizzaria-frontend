import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Order, getOrderStatus } from "@/lib/types";
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
import { OrderDetailDialog } from "@/components/dashboard/order-detail-dialog";
import { SendOrderButton } from "@/components/dashboard/order-status-button";
import { FinishOrderButton } from "@/components/dashboard/order-status-button";
import { DeleteOrderButton } from "@/components/dashboard/delete-order-button";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const statusLabel: Record<string, string> = {
  OPEN: "Aberto",
  SENT: "Enviado",
  FINISHED: "Finalizado",
};

const statusColor: Record<string, string> = {
  OPEN: "text-yellow-400 bg-yellow-400/10",
  SENT: "text-blue-400 bg-blue-400/10",
  FINISHED: "text-green-400 bg-green-400/10",
};

export default async function OrdersPage() {
  const token = await getToken();

  let orders: Order[] = [];
  let apiError: string | null = null;

  try {
    const [nonDraftOrders, draftOrders] = await Promise.all([
      apiClient<Order[]>("/orders", { token, cache: "no-store" }),
      apiClient<Order[]>("/orders?draft=true", { token, cache: "no-store" }),
    ]);
    orders = [...draftOrders, ...nonDraftOrders];
  } catch (error) {
    if (error instanceof Error) {
      apiError = error.message;
    } else {
      apiError = "Erro ao carregar pedidos";
    }
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Pedidos</h1>
          <p className="text-gray-400 text-sm mt-1">
            Gerencie os pedidos do restaurante
          </p>
        </div>
        <Button
          className="bg-brand-primary text-white hover:bg-brand-primary/90 cursor-pointer"
          title="Atualizar Página"
        >
          <RefreshCcw className=" h-4 w-4" />
        </Button>
      </div>

      {apiError && (
        <div className="bg-red-400/10 border border-red-400/30 rounded-md p-4 text-red-400 text-sm">
          {apiError}
        </div>
      )}

      <Card className="bg-app-card border-app-border">
        <CardHeader>
          <CardTitle className="text-white text-lg">Todos os Pedidos</CardTitle>
          <CardDescription className="text-gray-400">
            {orders.length}{" "}
            {orders.length === 1 ? "pedido encontrado" : "pedidos encontrados"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-app-border hover:bg-transparent">
                <TableHead className="text-gray-400 font-medium">
                  Mesa
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Cliente
                </TableHead>
                <TableHead className="text-gray-400 font-medium">
                  Status
                </TableHead>
                <TableHead className="text-gray-400 font-medium hidden sm:table-cell">
                  Itens
                </TableHead>
                <TableHead className="text-gray-400 font-medium hidden md:table-cell">
                  Criado em
                </TableHead>
                <TableHead className="text-gray-400 font-medium w-28">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOrders.length === 0 ? (
                <TableRow className="border-app-border hover:bg-transparent">
                  <TableCell
                    colSpan={6}
                    className="text-gray-500 text-center py-8"
                  >
                    Nenhum pedido encontrado
                  </TableCell>
                </TableRow>
              ) : (
                sortedOrders.map((order) => {
                  const displayStatus = getOrderStatus(order);
                  return (
                    <TableRow
                      key={order.id}
                      className="border-app-border hover:bg-gray-400/5"
                    >
                      <TableCell className="text-white font-medium">
                        Mesa {order.table}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {order.name || "—"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            statusColor[displayStatus] || "text-gray-400"
                          }`}
                        >
                          {statusLabel[displayStatus] || displayStatus}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-400 hidden sm:table-cell">
                        {order.Items ? order.Items.length : "—"}
                      </TableCell>
                      <TableCell className="text-gray-400 hidden md:table-cell">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <OrderDetailDialog
                            orderId={order.id}
                            table={order.table}
                          />
                          {displayStatus === "OPEN" && (
                            <SendOrderButton
                              orderId={order.id}
                              name={order.name || ""}
                            />
                          )}
                          {displayStatus === "SENT" && (
                            <FinishOrderButton orderId={order.id} />
                          )}
                          {displayStatus !== "FINISHED" && (
                            <DeleteOrderButton
                              orderId={order.id}
                              table={order.table}
                            />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
