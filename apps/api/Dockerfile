FROM node:18-alpine

# Installer pnpm globalement
RUN npm install -g pnpm

WORKDIR /app

# Copier les fichiers nécessaires pour le monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Installer les dépendances du monorepo
RUN pnpm install --frozen-lockfile

# Copier le code source
COPY apps/api ./apps/api
COPY packages ./packages

# Build uniquement l'API
RUN pnpm --filter api build

# Exposer le port
EXPOSE 4000

# Lancer le serveur NestJS
CMD ["node", "apps/api/dist/main.js"]