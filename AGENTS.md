<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Next.js 16 App Router travel site. Only the `/` placeholder route exists so far.

## Commands

- `npm run dev` — Turbopack dev server at http://localhost:3000. `next dev` rewrites the managed block above and regenerates `next-env.d.ts` and `.next/dev/types/*`; don't hand-edit those.
- `npm run lint` — whole-repo ESLint (flat config). Baseline currently fails in vendored `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`); check only changed files with `npx eslint <paths>`.
- `npx tsc --noEmit` — typecheck; there is no npm script for it.
- `npx next typegen` — regenerate route types if `PageProps`/`LayoutProps` fail to resolve.
- `npm run build` then `npm start` — production build/serve. Cache Components problems often surface only at build.

No test runner, test script, or CI workflow exists.

## Framework notes

- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, and React Compiler. Uncached async data must be under `<Suspense>`; use `'use cache'` + `cacheLife()` for cached data. React Compiler auto-memoizes, so avoid adding `useMemo`/`useCallback` reflexively.
- Tailwind v4 is loaded through the `@tailwindcss/turbopack` rule in `next.config.ts`. There is no `tailwind.config.*` or PostCSS file; theme tokens and the dark variant live in `src/app/globals.css`.
- `PageProps<'/path'>` and `LayoutProps<'/path'>` are global generated types — no import needed.
- Path alias: `@/*` → `src/*`.

## UI conventions

- `src/components/ui` holds vendored shadcn components in the `base-nova` style, built on `@base-ui/react` (not Radix). Use Base UI patterns such as `render={<Button />}` instead of `asChild`, and style state with `data-open`/`data-closed` rather than Radix's `data-[state=open]`.
- Import `cn` from `"cn"`, matching generated files. `@/lib/utils` exists only as a shadcn-compat re-export.
- Add primitives with the locally installed CLI (`npx shadcn add <name>`); `components.json` defines the aliases. Preserve `data-slot` attributes and use lucide-react icons.
- Code highlighting uses shiki core in `src/lib/highlighter.tsx`. Languages are allowlisted in the `languages` map (plus `aliases`); add a lazy import there before highlighting a new language, or it returns `null`.

## Layout

- `src/app` — App Router pages/layouts; the root layout loads Josefin Sans via `next/font`.
- `public/images` — static marketing/destination assets. Filenames use `Wanderlast`, not `Wanderlust`; match existing paths.
