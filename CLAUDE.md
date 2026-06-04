# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server on port 3000
pnpm build        # production build
pnpm test         # run Vitest tests
pnpm check        # Biome lint + format check (run before committing)
pnpm lint         # Biome lint only
pnpm format       # Biome format only
```

Run a single test file: `pnpm vitest run src/path/to/file.test.tsx`

Add a shadcn component: `pnpm dlx shadcn@latest add <component>`

## Architecture

This is a **TanStack Start** SSR app (React 19, Vite 8, TypeScript strict).

**Routing** — file-based via TanStack Router. Add a file under `src/routes/` and the router plugin auto-generates `src/routeTree.gen.ts` (never edit this file). The root layout lives in `src/routes/__root.tsx` (shell HTML, head tags, devtools).

**Path aliases** — `#/*` and `@/*` both resolve to `src/*`. Prefer `#/` (defined in `package.json` `imports`).

**Styling** — Tailwind CSS v4 (Vite plugin, no config file). Global CSS in `src/styles.css`. shadcn/ui with "new-york" style and zinc base color; components install into `src/components/ui/`. Use `cn()` from `#/lib/utils` to merge class names.

**Linting/formatting** — Biome (tabs, double quotes for JS/TS). `src/routeTree.gen.ts` and `src/styles.css` are excluded from Biome.

**Server functions** — use `createServerFn` from `@tanstack/react-start` for server-side logic called from client components. API routes are defined via the `server` property on file routes.

**Data loading** — prefer route `loader` for route-level data; TanStack Query is available for client-side caching.
