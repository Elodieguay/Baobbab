# Étape 1 - Build
FROM node:18 AS builder

WORKDIR /app

# Copie tout le repo pour avoir les dépendances et packages
COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm --filter api build

# Étape 2 - Runner (léger pour la prod)
FROM node:18 AS runner

WORKDIR /app
RUN npm install -g pnpm

# Copie uniquement ce qui est nécessaire à l'exécution
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./

# Installe uniquement les dépendances nécessaires pour l'exécution
RUN pnpm install --prod

EXPOSE 4000

# Lancer l'app
CMD ["node", "dist/main.js"]