# EasyTax Kenya

A React + Vite front-end prototype for EasyTax Kenya — a tax compliance and filing dashboard focused on Kenyan SMEs. The app showcases KRA API integration concepts (KRA PIN verification, eTIMS invoice validation), M-Pesa payments, one-click NIL returns, deadline tracking, and an admin-style dashboard.

## Key features

- One-click NIL returns
- Real-time invoice validation (eTIMS) — UI stubbed
- M-Pesa payment flow — UI stubbed
- KRA PIN verification flow — UI stubbed
- Dashboard with compliance score, upcoming deadlines, and recent filings
- Authentication pages (Login, Signup) with demo credentials in the UI
- Error boundary, 404, and placeholder privacy/terms/support pages
- Built with a component-based UI (Radix, Tailwind, custom UI components)

## Tech stack

- React 19 + React Router
- Vite (dev server / build)
- Tailwind CSS
- Radix UI primitives
- lucide-react icons
- react-hook-form, zod for forms/validation (present in deps)

## Project structure (important files)

- `src/main.jsx` — app entry
- `src/App.jsx` — routing and top-level layout
- `src/pages/` — page components (home, auth, dashboard, tax-filing, payment)
- `src/components/ui/` — shared UI primitives and components
- `src/assets/` — images and static assets
- `package.json` — scripts and dependencies

## Requirements

- Node.js (recommended: 18+)
- pnpm (the project `packageManager` is pinned to pnpm)

## Install (Windows - cmd.exe)

Open a command prompt at the project root and run:

```cmd
pnpm install
```

If you don't have pnpm installed:

```cmd
npm install -g pnpm
```

## Development

Start the dev server (Vite):

```cmd
pnpm dev
```

Open http://localhost:5173 (or the URL Vite shows) in your browser.

## Build

Create a production build:

```cmd
pnpm build
```

Preview the production build locally:

```cmd
pnpm preview
```

## Scripts

Available npm scripts (from `package.json`):

- `dev` — run Vite dev server
- `build` — build for production
- `preview` — preview production build
- `lint` — run ESLint across project

## Environment & APIs

This repository includes UI stubs for integrations with:

- KRA APIs (KRA PIN verification)
- eTIMS (invoice validation)
- M-Pesa (payments)

These integrations are represented in the UI but require server-side keys/implementations and secure backends to work in production. Do not store secrets in the frontend. For production, create a backend that handles API keys and exposes only necessary endpoints to the UI.

## Demo credentials

The `Login` page contains a demo account used in the UI:

- Email: `demo@easytax.co.ke`
- Password: `demo123`

## Tests

No automated tests included. Suggested next steps:

- Add unit tests (Jest + React Testing Library)
- Add basic E2E tests (Playwright or Cypress)

## Contributing

Open an issue or submit a PR. Suggestions:

- Wire up secure backend integrations for KRA, eTIMS, and M-Pesa
- Add user management, roles, and subscription billing flows
- Add CI (GitHub Actions) to run lint and tests



