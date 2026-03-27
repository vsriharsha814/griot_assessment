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

## 4) Rollback playbook

If a deploy fails:

1. Roll back to previous container image tag in your backend host.
2. Confirm API health endpoint/critical route (`GET /api/products/getAll`).
3. Verify auth flow (`/api/auth/login`) and listing read path.
4. Re-point frontend to the previous API URL if a backend rollback changed domains.
5. Log incident details and root cause before redeploying.

## 5) Environment variable rotation

Rotate secrets without downtime:

1. Create new secret values in your secret manager or host settings.
2. Deploy backend with both old/new verification support when applicable.
3. Verify login/signup and protected endpoints.
4. Remove old secret values after successful validation.

Minimum vars to rotate and protect:
- `JWT_SECRET`
- `MONGODB_URI` credentials
- any future API keys/tokens

## 6) Basic observability checklist

- Structured JSON logs from backend host
- Error tracking integration (Sentry or equivalent)
- Uptime monitor on API base URL and critical route checks
