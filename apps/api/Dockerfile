FROM node:18-alpine

WORKDIR /app

# Installer PNPM
RUN npm install -g pnpm @nestjs/cli

# Copier le monorepo config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./  
COPY tsconfig*.json ./

# Installer les dépendances globales
RUN pnpm install --frozen-lockfile

# Copier le code de l'API et les packages partagés sans le src
COPY apps/api/package.json ./apps/api/
COPY apps/api/tsconfig*.json ./apps/api/
COPY packages ./packages

WORKDIR /app/apps/api
RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "--filter", "api", "dev"]
