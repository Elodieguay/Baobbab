FROM node:18-alpine

# Installer pnpm + nestjs CLI
RUN npm install -g pnpm @nestjs/cli

WORKDIR /app

# Copier les fichiers monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Installer toutes les dépendances du monorepo
RUN pnpm install --frozen-lockfile

# Copier le reste du code
COPY apps/api ./apps/api
COPY packages ./packages

# Copier le script
COPY apps/api/start.sh ./apps/api/start.sh
RUN chmod +x ./apps/api/start.sh

# Installation ciblée dans apps/api (obligatoire ici)
WORKDIR /app/apps/api
RUN pnpm install

# :arrow_down: :wrench: Retour à la racine pour le build
WORKDIR /app
RUN pnpm --filter api build

# Lancer le serveur
EXPOSE 4000
CMD ["sh", "./apps/api/start.sh"]
