# Deployment and Operations

This document covers a deterministic backend deployment path, basic rollback steps, and secret rotation guidance.

## 1) Build and run with Docker

The repository includes a backend `Dockerfile` that runs `node app` on port `5000`.

Build image:

```bash
docker build -t griot-api:latest .
```

Run API container:

```bash
docker run --rm -p 5000:5000 --env-file .env griot-api:latest
```

## 2) Local full stack with Docker Compose

Compose now starts both:
- `api` service (Node/Express)
- `mongo` service (MongoDB 7)

Run:

```bash
docker compose up -d --build
```

Stop:

```bash
docker compose down
```

## 3) Recommended host split

- Frontend host: static React build (Netlify, Vercel, S3+CDN, etc.)
- Backend host: container runtime (Render, Railway, ECS, Fly, etc.)
- Database: managed MongoDB (Atlas recommended)

For production, point backend `MONGODB_URI` to managed MongoDB instead of local compose Mongo.

### Stack (concrete options)

| Layer | Examples |
|--------|----------|
| Frontend (static) | Netlify, Vercel, Cloudflare Pages, S3 + CloudFront |
| Backend (container) | Render, Railway, Fly.io, AWS ECS/Fargate, Google Cloud Run |
| MongoDB | MongoDB Atlas (recommended), or self-hosted with backups |

## 4) Health and uptime checks

Use these for load balancers and external monitors (no auth):

| Endpoint | Purpose |
|----------|---------|
| `GET /health` | **Liveness** — process is running (`200` JSON with `status`, `uptimeSeconds`). |
| `GET /health/ready` | **Readiness** — MongoDB is connected (`200`); returns `503` if DB is not ready. |

Example:

```bash
curl -s http://localhost:5000/health
curl -s http://localhost:5000/health/ready
```

**Note:** In production, point uptime monitors at your public API host (e.g. `https://api.example.com/health`).

### Logs

- In **`NODE_ENV=production`**, each HTTP request is logged as one JSON line (`method`, `path`, `status`, `ms`); `/health` paths are not logged to reduce noise.
- Unhandled promise rejections and uncaught exceptions are logged as JSON in production.

### Error tracking (optional)

Wire a third-party service (e.g. Sentry) in your host or add a small SDK in `app.js` if you need stack traces in a dashboard. The repo does not ship a vendor SDK by default.

## 5) Rollback playbook

If a deploy fails:

1. Roll back to previous container image tag in your backend host.
2. Confirm `GET /health` and `GET /health/ready` return `200`.
3. Spot-check a critical route (`GET /api/products/getAll`).
4. Verify auth flow (`POST /api/auth/login`) and listing read path.
5. Re-point frontend to the previous API URL if a backend rollback changed domains.
6. Log incident details and root cause before redeploying.

## 6) Environment variable rotation

Rotate secrets without downtime:

1. Create new secret values in your secret manager or host settings.
2. Deploy backend with both old/new verification support when applicable.
3. Verify login/signup and protected endpoints.
4. Remove old secret values after successful validation.

Minimum vars to rotate and protect:
- `JWT_SECRET`
- `MONGODB_URI` credentials
- any future API keys/tokens

## 7) Basic observability checklist

- Structured JSON logs from backend host (enabled in production for HTTP + fatal process errors)
- Optional error tracking integration (Sentry or equivalent)
- Uptime monitor on `GET /health` or `GET /health/ready` plus critical route checks
