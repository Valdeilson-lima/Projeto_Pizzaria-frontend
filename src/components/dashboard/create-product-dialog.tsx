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
import { Plus, Trash2, Upload } from "lucide-react";
import { Category } from "@/lib/types";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

interface CreateProductDialogProps {
  categories: Category[];
}

export function CreateProductDialog({ categories }: CreateProductDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [state, formAction, isPending] = useActionState(
    createProductAction,
    null
  );

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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("O tamanho da imagem não pode ser maior que 5MB.");
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview("");
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
            <Label htmlFor="file" className="text-white ">
              Imagem do Produto
            </Label>
            {imagePreview ? (
              <div className="w-full h-60 relative rounded-md overflow-hidden border border-app-border">
                <Image
                  src={imagePreview}
                  alt="Imagem do Produto"
                  fill
                  quality={100}
                  priority
                  className="object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="absolute top-2 right-2 z-20 w-6 h-6 p-0 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={clearImage}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="w-full h-32 border-2 border-dashed border-gray-400 rounded-md flex flex-col items-center justify-center cursor-pointer">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <Label
                  htmlFor="file"
                  className="text-gray-400 cursor-pointer text-center"
                >
                  Clique para selecionar uma imagem ou arraste e solte aqui.
                </Label>
              </div>
            )}
            <Input
              id="file"
              name="file"
              type="file"
              className="hidden"
              accept="image/jpeg, image/png, image/jpg"
              onChange={handleImageChange}
              required
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
