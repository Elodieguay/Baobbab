FROM node:18-alpine

# Installer pnpm globalement
RUN npm install -g pnpm

WORKDIR /app

# Copier tout le monorepo
COPY . .

# Installer les dépendances du monorepo
RUN pnpm install

# Build uniquement le front
RUN pnpm --filter webapp run build || true

# Installer serve globalement pour servir le build
ENV PNPM_HOME=/pnpm-global
ENV PATH=$PNPM_HOME/bin:$PATH
RUN pnpm config set global-bin-dir $PNPM_HOME && pnpm add -g serve
# Exposer le port utilisé par le serveur statique
EXPOSE 4173

# Lancer le serveur statique pour servir les fichiers Vite
CMD ["serve", "-s", "apps/webapp/dist", "-l", "4173"]


