FROM node:18-alpine

# Installer pnpm globalement
RUN npm install -g pnpm

WORKDIR /app

# Copier tout le monorepo
COPY . .

# Installer les dépendances du monorepo
RUN pnpm install

# Build uniquement le front
RUN pnpm --filter webapp run build 


# Exposer le port utilisé par le serveur statique
EXPOSE 4173

# Lancer le serveur statique pour servir les fichiers Vite
CMD ["pnpm", "--filter", "webapp", "exec", "serve", "-s", "apps/webapp/dist", "--single", "-l", "4173"]


