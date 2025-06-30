FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copier les manifests à la racine
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.base.json ./  
COPY tsconfig*.json ./

# Installer toutes les dépendances du monorepo
RUN pnpm install

# Copier le code du webapp et les packages partagés
COPY apps/webapp ./apps/webapp
COPY packages ./packages

# Installer les dépendances spécifiques du webapp
WORKDIR /app/apps/webapp
RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]
