"use client";

import { useState } from "react";
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
import { deleteOrderAction } from "@/actions/order";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteOrderButtonProps {
  orderId: string;
  table: number;
}

export function DeleteOrderButton({ orderId, table }: DeleteOrderButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);

    const formData = new FormData();
    formData.append("orderId", orderId);

    const result = await deleteOrderAction(null, formData);

    if (result.success) {
      toast.success("Pedido excluído com sucesso!");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(result.error);
    }

    setIsPending(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 cursor-pointer"
          title="Excluir Pedido"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-card border-app-border text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold">
            Excluir Pedido
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Tem certeza que deseja excluir o pedido da mesa{" "}
            <strong>{table}</strong>? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="default"
            onClick={() => setOpen(false)}
            className="text-white border-app-border hover:bg-gray-400/10 cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            disabled={isPending}
            variant="destructive"
            onClick={handleDelete}
            className="cursor-pointer font-bold"
          >
            {isPending ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
