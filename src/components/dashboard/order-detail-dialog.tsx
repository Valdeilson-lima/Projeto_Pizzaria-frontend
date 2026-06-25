"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrderDetailAction } from "@/actions/order";
import { Order, getOrderStatus } from "@/lib/types";
import { formatPriceReal } from "@/lib/utils";
import { Eye, Loader2 } from "lucide-react";

interface OrderDetailDialogProps {
  orderId: string;
  table: number;
}

const statusLabel: Record<string, string> = {
  OPEN: "Aberto",
  SENT: "Enviado",
  FINISHED: "Finalizado",
};

const statusColor: Record<string, string> = {
  OPEN: "text-yellow-400",
  SENT: "text-blue-400",
  FINISHED: "text-green-400",
};

export function OrderDetailDialog({ orderId, table }: OrderDetailDialogProps) {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function fetchOrderDetail() {
      setIsLoading(true);
      const result = await getOrderDetailAction(orderId);
      if (result.success && result.data) {
        setOrder(result.data);
      } else {
        toast.error(result.error);
      }
      setIsLoading(false);
    }

    fetchOrderDetail();
  }, [open, orderId]);

  const displayStatus = order ? getOrderStatus(order) : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-gray-400 hover:text-white hover:bg-gray-400/10 cursor-pointer"
          title="Ver detalhes"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-card border-app-border text-white sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold">
            Pedido Mesa {table}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Detalhes do pedido
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : order ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-medium ${statusColor[displayStatus || ""] || ""}`}
              >
                {statusLabel[displayStatus || ""] || "—"}
              </span>
            </div>

            {order.name && (
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">Cliente:</span>
                <span className="text-white font-medium">{order.name}</span>
              </div>
            )}

            <Table>
              <TableHeader>
                <TableRow className="border-app-border hover:bg-transparent">
                  <TableHead className="text-gray-400 font-medium">
                    Item
                  </TableHead>
                  <TableHead className="text-gray-400 font-medium">
                    Qtd
                  </TableHead>
                  <TableHead className="text-gray-400 font-medium text-right">
                    Preço
                  </TableHead>
                  <TableHead className="text-gray-400 font-medium text-right">
                    Subtotal
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.Items && order.Items.length > 0 ? (
                  order.Items.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-app-border hover:bg-gray-400/5"
                    >
                      <TableCell className="text-white font-medium">
                        {item.product.name}
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {item.amount}
                      </TableCell>
                      <TableCell className="text-gray-400 text-right">
                        {formatPriceReal(item.product.price)}
                      </TableCell>
                      <TableCell className="text-white text-right">
                        {formatPriceReal(item.product.price * item.amount)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-app-border hover:bg-transparent">
                    <TableCell
                      colSpan={4}
                      className="text-gray-500 text-center py-8"
                    >
                      Nenhum item neste pedido
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {order.Items && order.Items.length > 0 && (
              <div className="flex justify-end pt-2">
                <div className="text-sm">
                  <span className="text-gray-400">Total: </span>
                  <span className="text-white font-bold text-lg">
                    {formatPriceReal(
                      order.Items.reduce(
                        (acc, item) => acc + item.product.price * item.amount,
                        0
                      )
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Erro ao carregar detalhes do pedido
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
