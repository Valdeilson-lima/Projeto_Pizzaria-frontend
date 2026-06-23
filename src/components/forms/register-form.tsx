import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome..."
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
              type="email"
              placeholder="Digite seu email..."
              className="text-white bg-app-card border border-app-border h-9"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha..."
              className="text-white bg-app-card boder border-app-border h-9"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-brand-primary hover:bg-brand-primary/80 transition-all duration-300 cursor-pointer text-white text-center font-bold h-9"
          >
            Cadastrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
