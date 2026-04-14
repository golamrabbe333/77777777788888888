# Workspace

## Overview

pnpm workspace monorepo using TypeScript. The active web application is the Al-Yamen business command center website at `artifacts/website`, backed by the shared Express API server and PostgreSQL database.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Active App

- **Website artifact**: `artifacts/website`
- **Preview path**: `/`
- **Product**: Al-Yamen management dashboard with login, dashboard analytics, transactions, orders, customers, stock/products, categories, employees, attendance, payroll, accounting, and settings pages.
- **Demo login**: `admin` / `admin`

## Backend/Data

- API routes live in `artifacts/api-server/src/routes`.
- API contract lives in `lib/api-spec/openapi.yaml`.
- Drizzle schema lives in `lib/db/src/schema`.
- The database is seeded with starter records for the demo dashboard, transactions, orders, customers, products, employees, expenses, and the admin login.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/website run dev` — run website locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
