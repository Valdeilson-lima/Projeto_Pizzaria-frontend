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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProductAction } from "@/actions/product";
import { Plus } from "lucide-react";
import { Category } from "@/lib/types";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

interface CreateProductDialogProps {
  categories: Category[];
}

export function CreateProductDialog({ categories }: CreateProductDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [state, formAction, isPending] = useActionState(
    createProductAction,
    null
  );

  console.log("state", categoryId);
  console.log("state", typeof priceValue);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Produto cadastrado com sucesso!");
      setOpen(false);
      setCategoryId("");
      router.refresh();
    }

    if (!state.success && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formated = formatPrice(e.target.value);

    setPriceValue(formated);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer">
          <Plus className="w-4 h-4" />
          Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-card border-app-border text-white sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-lg font-bold">
            Novo Produto
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Preencha os dados do novo produto.
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
              placeholder="Digite o nome do produto..."
              required
              className="text-white bg-app-background border-app-border h-9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Descrição
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Digite a descrição do produto..."
              required
              className="text-white bg-app-background border-app-border min-h-20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">
                Preço
              </Label>
              <Input
                id="price"
                name="price"
                placeholder="Ex: 19.99"
                required
                className="text-white bg-app-background border-app-border h-9"
                value={priceValue}
                onChange={handlePriceChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryId" className="text-white">
                Categoria
              </Label>
              <input type="hidden" name="categoryId" value={categoryId} />
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger className="text-white bg-app-background border-app-border h-9 w-full">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="bg-app-card border-app-border text-white">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file" className="text-white">
              Imagem
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              className="text-white bg-app-background border-app-border h-9 file:bg-brand-primary file:text-white file:border-0 file:rounded-md file:px-3 file:h-8 file:text-sm file:cursor-pointer file:mr-3"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white cursor-pointer font-bold"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
