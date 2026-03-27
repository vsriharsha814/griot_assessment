FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better layer caching.
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy runtime files.
COPY app.js ./
COPY server ./server

# Ensure uploads exists for local media writes.
RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "app"]
