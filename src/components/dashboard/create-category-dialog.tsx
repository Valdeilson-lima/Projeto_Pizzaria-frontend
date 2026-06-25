"use client";

import { useActionState, useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategoryAction } from "@/actions/category";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateCategoryDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Categoria criada com sucesso!");
      setOpen(false);
      router.refresh();
    }

    if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer">
          <Plus className="w-4 h-4" />
          Nova Categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-card border-app-border text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold">
            Nova Categoria
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Preencha o nome da nova categoria.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Nome
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Digite o nome da categoria..."
              required
              minLength={3}
              className="text-white bg-app-background border-app-border h-9"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
