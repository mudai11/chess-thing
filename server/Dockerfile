FROM node:18-alpine AS base

# Stage 1 - Build the base
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json env.ts tsconfig*.json ./
RUN npm ci; 
COPY src ./src
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate

# Stage 2 - Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN rm -rf node_modules

# Stage 3 - Production
FROM base as runner
WORKDIR /app
ENV NODE_ENV production
COPY package*.json ./
COPY --from=builder /app/dist ./ 
COPY --from=builder /app/prisma ./prisma 
RUN npm install --only-production
RUN npx prisma generate

CMD ["node", "index.js"]