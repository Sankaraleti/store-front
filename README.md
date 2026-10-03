# Store Front

Next.js eCommerce app. TypeScript, Tailwind CSS v4, shadcn/ui, Better Auth, Drizzle ORM and Neon Postgres.

## Getting started

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values:
   - `DATABASE_URL`: Neon pooled connection string
   - `BETTER_AUTH_SECRET`: generate one with `npx auth secret`
3. Generate the Better Auth tables and apply them:
   ```bash
   npm run auth:generate     # writes src/db/schema/auth.ts
   # then add `export * from "./auth";` to src/db/schema/index.ts
   npm run db:generate && npm run db:migrate   # or: npm run db:push
   ```
4. Start the dev server: `npm run dev`

## Scripts

| Script | Purpose |
| --- | --- |
| `dev` / `build` / `start` | Next.js |
| `lint` / `typecheck` | ESLint / `tsc --noEmit` |
| `db:generate` / `db:migrate` / `db:push` / `db:studio` | Drizzle Kit |
| `auth:generate` | Generate the Better Auth Drizzle schema |

## Structure

```
src/
  app/
    api/auth/[...all]/route.ts   Better Auth route handler
    layout.tsx, page.tsx, globals.css
  components/ui/                 shadcn/ui components (npx shadcn add <name>)
  db/
    index.ts                     Drizzle client (Neon HTTP driver)
    schema/index.ts              Schema barrel
  lib/
    auth.ts                      Better Auth server instance
    auth-client.ts               Better Auth React client
    utils.ts                     cn() helper
drizzle.config.ts                Drizzle Kit config (reads .env.local)
```
