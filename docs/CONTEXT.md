# Frontend — DomLuydd (SujeitoPizza)

> Sistema de gestão de pizzaria — frontend Next.js

---

## Stack

| Camada         | Tecnologia                         |
| -------------- | ---------------------------------- |
| Framework      | Next.js 16.2.9                     |
| Linguagem      | TypeScript 5                       |
| UI Library     | React 19.2.4                       |
| Estilização    | Tailwind CSS v4 + `tw-animate-css` |
| Componentes    | shadcn/ui (style: `radix-nova`)    |
| Ícones         | lucide-react                       |
| Headless UI    | radix-ui 1.6                       |
| Toast          | sonner 2.0                         |
| Tema           | next-themes                        |
| Formatação     | Prettier + lint-staged + husky     |
| Commit         | commitlint (conventional commits)  |
| React Compiler | Ativado (`next.config.ts`)         |

---

## Estrutura de Diretórios

```
frontend/
├── src/
│   ├── actions/
│   │   ├── auth.ts              # Server Actions de autenticação
│   │   ├── category.ts          # Server Actions de categorias
│   │   └── product.ts           # Server Actions de produtos
│   ├── app/
│   │   ├── globals.css          # Tema Tailwind v4 + shadcn
│   │   ├── layout.tsx           # Root layout (ThemeProvider + Toaster)
│   │   ├── page.tsx             # / → redirect para /login
│   │   ├── login/
│   │   │   └── page.tsx         # /login — formulário de login
│   │   ├── register/
│   │   │   └── page.tsx         # /register — página de cadastro
│   │   └── dashboard/
│   │       ├── layout.tsx       # Layout protegido c/ sidebar
│   │       ├── page.tsx         # /dashboard — home
│   │       ├── products/
│   │       │   └── page.tsx     # /dashboard/products — CRUD produtos
│   │       └── categories/
│   │           └── page.tsx     # /dashboard/categories — CRUD categorias
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── sidebar.tsx             # Sidebar desktop
│   │   │   ├── mobile-sidebar.tsx      # Sidebar mobile (Sheet)
│   │   │   ├── create-product-dialog.tsx  # Dialog criar produto
│   │   │   ├── delete-product-button.tsx  # Botão excluir produto
│   │   │   └── create-category-dialog.tsx # Dialog criar categoria
│   │   ├── forms/
│   │   │   └── register-form.tsx # Formulário de cadastro
│   │   └── ui/
│   │       ├── button.tsx       # Botão c/ variantes (CVA + Slot)
│   │       ├── card.tsx         # Card container c/ header/content/footer
│   │       ├── dialog.tsx       # Modal (Radix Dialog)
│   │       ├── input.tsx        # Input de texto
│   │       ├── label.tsx        # Label (Radix Label)
│   │       ├── select.tsx       # Select (Radix Select)
│   │       ├── sheet.tsx        # Slide-in panel (Radix Dialog)
│   │       ├── sonner.tsx       # Toaster do sonner (com tema)
│   │       ├── table.tsx        # Tabela
│   │       └── textarea.tsx     # Textarea auto-resize
│   └── lib/
│       ├── api.ts               # apiClient — wrapper fetch
│       ├── auth.ts              # getToken, setToken, requireAdminUser
│       ├── types.ts             # Interfaces User, Category, Product
│       └── utils.ts             # cn(), formatPrice(), formatPriceReal()
├── docs/
│   └── CONTEXT.md               # Este documento
├── endpoint.md                  # Documentação dos endpoints do backend
├── .env                         # NEXT_PUBLIC_API_URL
├── next.config.ts               # Config Next.js
├── tsconfig.json                # Path alias: @/ → src/
├── components.json              # Config shadcn
├── .prettierrc                  # Formatação
├── .lintstagedrc                # Lint-staged config
├── commitlint.config.js         # Conventional commits
├── .husky/
│   ├── pre-commit               # lint-staged + typecheck
│   └── commit-msg               # commitlint
└── package.json
```

---

## API — `src/lib/api.ts`

Cliente HTTP centralizado que encapsula `fetch`:

```ts
apiClient<T>(endpoint, {
  method?, headers?, body?, token?, cache?, next?
}): Promise<T>
```

- **Base URL:** `process.env.NEXT_PUBLIC_API_URL` → `http://localhost:3333/api`
- **Auth:** Se `token` for passado, adiciona `Authorization: Bearer <token>`
- **Content-Type:** Automático `application/json` se houver body (exceto FormData)
- **Erro:** Parseia `{ message, error }` do backend e lança `Error` com `.status` e `.data`
- **Sucesso:** Retorna `response.json()` tipado como `T`

### Endpoints (backend em `localhost:3333/api`)

| Método | Rota                | Auth    | Admin |
| ------ | ------------------- | ------- | ----- |
| POST   | `/users`            | Público | --    |
| POST   | `/session`          | Público | --    |
| GET    | `/me`               | JWT     | --    |
| GET    | `/categories`       | JWT     | --    |
| POST   | `/categories`       | JWT     | Sim   |
| POST   | `/products`         | JWT     | Sim   |
| GET    | `/products`         | JWT     | --    |
| DELETE | `/product`          | JWT     | Sim   |
| GET    | `/category/product` | JWT     | --    |
| POST   | `/order`            | JWT     | --    |
| GET    | `/orders`           | JWT     | --    |
| POST   | `/order/add`        | JWT     | --    |
| DELETE | `/order/remove`     | JWT     | --    |
| GET    | `/order/detail`     | JWT     | --    |
| PUT    | `/order/send`       | JWT     | --    |
| PUT    | `/order/finish`     | JWT     | --    |
| DELETE | `/order`            | JWT     | --    |

> 17 endpoints totais — 2 públicos (`POST /users`, `POST /session`) — 3 admin

---

## Server Actions

### `src/actions/auth.ts`

| Função            | Endpoint        | Descrição                     |
| ----------------- | --------------- | ----------------------------- |
| `registerActions` | `POST /users`   | Registrar novo usuário        |
| `loginActions`    | `POST /session` | Autenticar usuário (JWT)      |
| `logoutActions`   | —               | Remover cookie e redirecionar |

### `src/actions/category.ts`

| Função                 | Endpoint           | Descrição            |
| ---------------------- | ------------------ | -------------------- |
| `createCategoryAction` | `POST /categories` | Criar nova categoria |

### `src/actions/product.ts`

| Função                | Endpoint          | Descrição                      |
| --------------------- | ----------------- | ------------------------------ |
| `createProductAction` | `POST /products`  | Criar produto c/ upload imagem |
| `deleteProductAction` | `DELETE /product` | Excluir/desativar produto      |

### `src/actions/order.ts`

| Função                 | Endpoint            | Descrição                    |
| ---------------------- | ------------------- | ---------------------------- |
| `getOrderDetailAction` | `GET /order/detail` | Buscar detalhes de um pedido |
| `sendOrderAction`      | `PUT /order/send`   | Enviar pedido para cozinha   |
| `finishOrderAction`    | `PUT /order/finish` | Finalizar pedido             |
| `deleteOrderAction`    | `DELETE /order`     | Excluir pedido               |

---

## Rotas (App Router)

| Path                    | Descrição                 | Autenticação |
| ----------------------- | ------------------------- | ------------ |
| `/`                     | Redireciona para `/login` | Público      |
| `/login`                | Formulário de login       | Público      |
| `/register`             | Formulário de cadastro    | Público      |
| `/dashboard`            | Gerenciamento de pedidos  | JWT + Admin  |
| `/dashboard/products`   | CRUD de produtos          | JWT + Admin  |
| `/dashboard/categories` | CRUD de categorias        | JWT + Admin  |

---

## Tema — `src/app/globals.css`

**Cores customizadas do projeto:**

| Token                      | Cor                  | Uso                     |
| -------------------------- | -------------------- | ----------------------- |
| `brand-primary`            | Vermelho (#FF3F4B)   | Botões, links, destaque |
| `brand-primary-foreground` | Branco               | Texto sobre brand       |
| `app-background`           | Azul escuro profundo | Background principal    |
| `app-card`                 | Azul escuro claro    | Cards                   |
| `app-border`               | Azul médio           | Bordas                  |
| `app-sidebar`              | Azul mais escuro     | Sidebar                 |

> Tema escuro fixo (`defaultTheme: "dark"` no ThemeProvider)

---

## Padrões de Código

1. **Componentes:** `"use client"` only se usar hooks ou estado; caso contrário, server component
2. **Imports:** `@/` alias mapeia para `src/`
3. **Estilização:** classes Tailwind via `cn()` (`@/lib/utils`)
4. **Ícones:** `lucide-react`
5. **Commits:** conventional commits (ex: `feat:`, `fix:`, `chore:`, `docs:`)
6. **UI Components:** shadcn style `radix-nova` com Radix primitives
7. **Formulários:** Server Actions com `useActionState` + `toast` do sonner para feedback

---

## Estado Atual (TO-DO)

- [x] Setup Next.js + TypeScript + Tailwind v4
- [x] shadcn/ui configurado (10+ componentes)
- [x] Tema escuro customizado (DomLuydd)
- [x] apiClient wrapper
- [x] Tipos compartilhados (`src/lib/types.ts`)
- [x] Autenticação JWT (login, cookie storage, middleware)
- [x] Página de login com formulário
- [x] Página de cadastro com formulário
- [x] Logout com remoção de cookie
- [x] Dashboard protegido com layout (sidebar + mobile)
- [x] Página de produtos (listar, criar com upload de imagem, deletar)
- [x] Página de categorias (listar, criar)
- [x] Gerenciamento de pedidos (listar, detalhar, enviar, finalizar, excluir)
- [ ] Hooks customizados (`src/hooks/`)
