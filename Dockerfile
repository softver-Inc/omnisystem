# Stage 1: Install dependencies and build the application

FROM node:20.9.0 AS builder

# Set working directory

WORKDIR /app

# Install pnpm and pm2

RUN npm install -g pnpm@9.1.4
RUN npm install -g pm2

# Copy monorepo files

COPY package.json pnpm-lock.yaml ./

COPY . .

# Install dependencies and build the project using Turborepo

RUN pnpm install
RUN pnpm turbo run build

# Stage 2: Create a production-ready image

FROM node:20.9.0-alpine AS runner

# Set working directory

WORKDIR /app

# Install pnpm and pm2

RUN npm install -g pnpm@9.1.4
RUN npm install -g pm2

ENV PM2_PUBLIC_KEY im416m3848nr9xm
ENV PM2_SECRET_KEY 91s1py68dkyg5kz

# Copy only the necessary files from the build stage

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/services/file-manager/dist ./services/file-manager/dist
COPY --from=builder /app/services/users/dist ./services/users/dist

# Install production dependencies only

RUN pnpm install

# Copy PM2 configuration file

COPY pm2.config.js .

# Expose the application port

EXPOSE 3000 4000

# Set the command to run the application

CMD ["pm2-runtime", "start", "pm2.config.js"]

