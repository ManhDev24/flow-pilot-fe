FROM node:20-bullseye-slim AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install deps
RUN npm ci

# Fix cho Tailwind v4
RUN npm install --save-dev @tailwindcss/oxide lightningcss

# Copy toàn bộ source
COPY . .

# Build Next.js
RUN npm run build


# ==========================
# STEP 2: Run Next.js app
# ==========================
FROM node:20-bullseye-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy output từ build stage
COPY --from=build /app ./

# Expose port
EXPOSE 6868

CMD ["npx", "next", "start", "-H", "0.0.0.0", "-p", "6868"]
