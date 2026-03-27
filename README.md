
# Property Rent/Sale Platform

Full-stack property listing app with a React frontend and Node/Express API.

## Current Status

Implemented:
- JWT auth routes (`/api/auth/signup`, `/api/auth/login`)
- Product listing APIs with bidding support
- Seller inventory endpoint (protected route)
- React villa list/detail pages now backed by API data
- Baseline backend hardening (`helmet`, CORS from env, rate limiting)
- Basic backend test suite for auth middleware and bid validation

Not implemented yet:
- Payments
- Advanced booking calendar
- Admin analytics dashboard
- Fully integrated real-time chat UX

## Tech Stack

- Frontend: React, React Router, Axios, Vite
- Backend: Node.js, Express, Mongoose, JWT, Socket.IO
- Database: MongoDB
- Testing: Node built-in test runner (`node --test`)

## Environment Variables

Copy `.env.example` to `.env` and update values:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `VITE_API_BASE_URL`
- `RATE_LIMIT_WINDOW_MS`
- `RATE_LIMIT_MAX`

## Static assets

Marketing images (`landing.jpg`, `villa*.jpg`, `region*.jpg`, etc.) live under `public/` so Vite serves them at the site root in dev and production. `VITE_API_BASE_URL` is also used to build absolute URLs for uploaded listing images from the API (see `src/utils/media.js`).

## Local Development

Install dependencies:

```bash
npm install
```

Run backend + frontend in parallel:

```bash
npm start
```

Run tests:

```bash
npm test
```

Run smoke E2E:

```bash
npm run test:e2e
```

## Seed Local Data

To populate MongoDB with a seller, a buyer, and a few example listings:

```bash
npm run seed
```

To wipe existing listings for the first seller found and reseed:

```bash
npm run seed -- --reset
```

## Schema Notes (MongoDB)

- `Product.userId` links each listing to its seller.
- Bids are stored in `Product.bidHistory[]` with `bidderName`, `bidAmount`, and `bidTimestamp`.
- Indexes:
  - `Product.userId` for seller inventory queries
  - `Product.name` text index for future search/filtering

## API Summary

Auth:
- `POST /api/auth/signup`
- `POST /api/auth/login`

Products:
- `POST /api/products/create`
- `GET /api/products/getAll`
- `GET /api/products/:productId`
- `PUT /api/products/update/:productId`
- `POST /api/products/:productId/place-bid`
- `GET /api/products/:productId/bid-history`

Seller:
- `GET /api/seller/inventory` (Bearer token required)

## Roadmap

See `PROJECT_COMPLETION_PLAN.md` for the phased implementation roadmap and completion tracking.
