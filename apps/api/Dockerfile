# Utiliser une image Node officielle
FROM node:22.7-alpine

# Installer pnpm globalement
RUN npm install -g pnpm

# Configurer PNPM_HOME pour les binaires globaux
ENV PNPM_HOME=/pnpm-global
ENV PATH=$PNPM_HOME/bin:$PATH

# Définir le répertoire de travail à la racine du projet
WORKDIR /apps

# Copier les fichiers package*.json, pnpm-lock.yaml et pnpm-workspace.yaml (pour le monorepo) 
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Installer les dépendances globales et locales
RUN pnpm install --frozen-lockfile

# Copier le code de l'API dans son propre répertoire
COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/tsconfig.json ./apps/api/tsconfig.json

# Copier tout le reste du code, y compris les packages et autres parties du projet
COPY apps/api ./apps/api
COPY packages ./packages

# Installer les dépendances locales pour l'API (en cas de nouvelles dépendances)
RUN pnpm install

# Build l'application pour la production (si nécessaire)
RUN pnpm build

# Exposer le port de l'API NestJS
EXPOSE 4000

# Démarrer l'application
CMD ["pnpm", "--filter", "./apps/api", "dev"]
