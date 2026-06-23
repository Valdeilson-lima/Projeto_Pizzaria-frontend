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
│   │   └── auth.ts              # Server Actions de autenticação
│   ├── app/
│   │   ├── globals.css          # Tema Tailwind v4 + shadcn
│   │   ├── layout.tsx           # Root layout (ThemeProvider + Toaster)
│   │   ├── page.tsx             # / → redirect para /login
│   │   ├── login/page.tsx       # /login — SKELETON (incompleto)
│   │   └── register/page.tsx    # /register — página de cadastro
│   ├── components/
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
│       └── utils.ts             # cn() — clsx + tailwind-merge
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

## Server Actions — `src/actions/auth.ts`

```ts
registerActions(prevState, formData): Promise<{
  success: boolean
  error: string
  redirectTo: string
}>
```

- Registra usuário via `POST /users`
- Extrai `name`, `email`, `password` do FormData
- Captura erros do `apiClient` e retorna `error.message` no estado

---

## Rotas (App Router)

| Path        | Componente         | Status       |
| ----------- | ------------------ | ------------ |
| `/`         | `redirect(/login)` | Pronto       |
| `/login`    | Card placeholder   | **Skeleton** |
| `/register` | RegisterForm       | Pronto       |

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
- [x] Server action de registro
- [x] Página de registro com formulário
- [x] Toast de erro via sonner
- [ ] Página de login (skeleton)
- [ ] Páginas protegidas (dashboard, produtos, pedidos)
- [ ] Autenticação (login, JWT storage, middleware)
- [ ] Hooks customizados (`src/hooks/`)
- [ ] Tipos compartilhados (`src/types/`)
