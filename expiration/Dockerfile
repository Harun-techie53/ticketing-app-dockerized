# Stage 1: Install dependencies
FROM node:alpine AS deps

WORKDIR /app

# Install only dependencies first for better caching
COPY package.json package-lock.json* ./

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install; \
    else \
        npm ci --only=production; \
    fi

# Stage 2: Copy files and run app
FROM node:alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5003

# Copy only the necessary files from the previous stage
COPY --from=deps /app /app

EXPOSE $PORT

CMD ["npm", "run", "dev"]