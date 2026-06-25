# DomLuydd — Frontend

> Sistema de gestão de pizzaria — frontend Next.js

## Stack

| Camada      | Tecnologia                      |
| ----------- | ------------------------------- |
| Framework   | Next.js 16.2.9                  |
| Linguagem   | TypeScript 5                    |
| UI Library  | React 19.2.4                    |
| Estilização | Tailwind CSS v4                 |
| Componentes | shadcn/ui (style: `radix-nova`) |
| Ícones      | lucide-react                    |
| Headless UI | radix-ui 1.6                    |
| Toast       | sonner 2.0                      |
| Tema        | next-themes                     |

## Pré-requisitos

- Node.js 20+
- npm ou pnpm
- Backend rodando em `http://localhost:3333`

## Configuração

```bash
cp .env.example .env
npm install
npm run dev
```

Variáveis de ambiente:

| Variável              | Valor padrão                |
| --------------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3333/api` |
| `API_URL`             | `http://localhost:3333/api` |

## Scripts

| Comando             | Descrição                  |
| ------------------- | -------------------------- |
| `npm run dev`       | Iniciar servidor dev       |
| `npm run build`     | Build de produção          |
| `npm run start`     | Iniciar servidor produção  |
| `npm run typecheck` | Verificar tipos TypeScript |

## Projeto

```
src/
├── actions/         # Server Actions
│   ├── auth.ts      # Registro e autenticação
│   ├── category.ts  # CRUD categorias
│   ├── product.ts   # CRUD produtos
│   └── order.ts     # CRUD pedidos
├── app/             # App Router
│   ├── dashboard/   # Área logada (pedidos, produtos, categorias)
│   ├── login/       # Página de login
│   └── register/    # Página de cadastro
├── components/
│   ├── dashboard/   # Componentes do dashboard
│   ├── forms/       # Formulários
│   └── ui/          # shadcn/ui components
└── lib/
    ├── api.ts       # Cliente HTTP (apiClient)
    ├── auth.ts      # Gerenciamento de token
    ├── types.ts     # Tipos compartilhados
    └── utils.ts     # Utilitários (cn, formatPrice)
```

## Funcionalidades

- [x] Cadastro de usuário
- [x] Autenticação JWT
- [x] Página de login
- [x] Dashboard com sidebar
- [x] CRUD de produtos (criar, listar, deletar)
- [x] Upload de imagem para produtos
- [x] CRUD de categorias (criar, listar)
- [x] Gerenciamento de pedidos (listar, detalhar, enviar, finalizar, excluir)

## Padrões

- **Commits:** conventional commits (`feat:`, `fix:`, `chore:`)
- **Componentes:** `"use client"` apenas se usar hooks/estado
- **Formulários:** Server Actions com feedback via sonner toast
- **Imports:** alias `@/` mapeia para `src/`
- **Estilização:** classes Tailwind via `cn()`
