"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { sendOrderAction, finishOrderAction } from "@/actions/order";
import { Send, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SendOrderButtonProps {
  orderId: string;
  name: string;
}

export function SendOrderButton({ orderId, name }: SendOrderButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSend() {
    setIsPending(true);

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("name", name);

    const result = await sendOrderAction(null, formData);

    if (result.success) {
      toast.success("Pedido enviado para a cozinha!");
      router.refresh();
    } else {
      toast.error(result.error);
    }

    setIsPending(false);
  }

  return (
    <Button
      type="button"
      disabled={isPending}
      variant="ghost"
      size="icon-sm"
      onClick={handleSend}
      className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 cursor-pointer"
      title="Enviar para cozinha"
    >
      <Send className="w-4 h-4" />
    </Button>
  );
}

interface FinishOrderButtonProps {
  orderId: string;
}

export function FinishOrderButton({ orderId }: FinishOrderButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleFinish() {
    setIsPending(true);

    const formData = new FormData();
    formData.append("orderId", orderId);

    const result = await finishOrderAction(null, formData);

    if (result.success) {
      toast.success("Pedido finalizado com sucesso!");
      router.refresh();
    } else {
      toast.error(result.error);
    }

    setIsPending(false);
  }

  return (
    <Button
      type="button"
      disabled={isPending}
      variant="ghost"
      size="icon-sm"
      onClick={handleFinish}
      className="text-green-400 hover:text-green-300 hover:bg-green-400/10 cursor-pointer"
      title="Finalizar pedido"
    >
      <CheckCircle2 className="w-4 h-4" />
    </Button>
  );
}
