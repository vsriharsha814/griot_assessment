# Contributing

Thanks for helping improve this project. The steps below match what CI enforces on every push and pull request.

## Prerequisites

- **Node.js 20** (same as [`.github/workflows/ci.yml`](.github/workflows/ci.yml)). Other versions may work but are not guaranteed.
- **MongoDB** reachable at the URI in your `.env` (local install, or Docker—see README “MongoDB via Docker”).

## First-time setup

1. Copy environment template: `cp .env.example .env` and set secrets (`JWT_SECRET`, emails/passwords for seed if used).
2. Install dependencies: `npm ci` (use `npm install` only if you are not reproducing a lockfile-driven install).
3. Optional: `npm run seed` to load demo users and listings.

## Commands (aligned with CI)

| Command | Purpose |
|--------|---------|
| `npm run lint` | ESLint on `src` (`*.js`, `*.jsx`) |
| `npm test` | Backend tests (`node --test` on `server/tests/`) |
| `npm run test:frontend` | Vitest + React Testing Library (`src/tests/`) |
| `npm run test:e2e` | Playwright smoke tests (Chromium; run `npx playwright install chromium` once locally if needed) |

Run the full gate before opening a PR:

```bash
npm run lint && npm test && npm run test:frontend && npm run test:e2e
```

## Pull requests

- Keep changes focused on one concern when possible.
- If you add or change behavior, add or update tests when it is practical.
- Ensure CI would pass locally (lint + all test scripts above).
- Describe **what** changed and **why** in the PR description; link issues if applicable.

## Code style

- Follow existing patterns in the file you edit (imports, naming, error handling).
- ESLint config lives in the repo root; fix new warnings in touched files rather than disabling rules broadly.

## Security

- Do not commit real `.env` files, production secrets, or credentials.
- Avoid introducing dynamic code execution (`eval`, arbitrary user-controlled `Function`, etc.) on the server.
