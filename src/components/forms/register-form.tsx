"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { registerActions } from "@/actions/auth";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerActions, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.redirectTo && state?.success) {
      router.replace(state.redirectTo);
    }
  }, [state]);

  return (
    <Card className="bg-app-card border border-app-border w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-bold text-white text-3xl sm:text-4xl text-center">
          Dom<span className="text-brand-primary">Luydd</span>
        </CardTitle>
        <CardDescription>
          <p className="text-white text-center">
            Faça seu cadastro para acessar a plataforma
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Nome
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Digite seu nome..."
              autoComplete="name"
              required
              minLength={3}
              className="text-white bg-app-card border border-app-border h-9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email..."
              autoComplete="email"
              required
              minLength={3}
              className="text-white bg-app-card border border-app-border h-9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha..."
              autoComplete="new-password"
              className="text-white bg-app-card boder border-app-border h-9"
            />
          </div>
          {state?.error && (
            <p className="text-red-500 text-center">{state?.error}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary/80 transition-all duration-300 cursor-pointer text-white text-center font-bold h-9"
          >
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>

          <p className="text-white text-center">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-brand-primary hover:underline">
              Faça login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
