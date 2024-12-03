# Étape 1 : OnUtilise une image Node officielle
FROM node:22.7

# Installer pnpm globalement
RUN npm install -g pnpm

# Configurer PNPM_HOME pour les binaires globaux
ENV PNPM_HOME=/pnpm-global
ENV PATH=$PNPM_HOME/bin:$PATH

# On définie le répertoire de travail
WORKDIR /apps/api

# Copier les fichiers package*.json de la racine (ceux qui sont nécessaires à pnpm pour gérer les dépendances globales du projet)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Vérifier la structure après la copie
RUN ls -la /apps/api

# Installer les dépendances globales
RUN pnpm store prune
RUN pnpm install --frozen-lockfile

# Copier le fichier package.json de l'API dans son propre répertoire de travail
COPY apps/api/package.json ./ 
COPY apps/api/tsconfig.json ./


# Vérifier la structure après les installations
RUN ls -la /apps/api

# Installer les dépendances Nestjs/cli
RUN npm add -g @nestjs/cli


# On copie le reste des fichiers du projet NestJS
COPY apps/api ./apps/api
COPY packages ./packages

# Assurez-vous que package.json est bien présent dans /apps/api après la copie
RUN ls -la /apps/api 

# Vérifier si le fichier package.json est dans le bon répertoire
RUN ls -la /apps/api/package.json

# Vérifier si le fichier package.json est dans le bon répertoire
RUN ls -la /apps/api/tsconfig.json


RUN pnpm install

# Passer à l'environnement de travail de l'API
WORKDIR /apps/api

# Vérification que le package.json est bien là
RUN ls -la /apps/api

RUN pnpm install

# On Build l'application pour la production
RUN pnpm build 
# Exposer le port de l'API NestJS
EXPOSE 4000

# Démarrer l'application
CMD ["pnpm", "start"]