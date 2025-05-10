FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm --filter webapp run build

# 🔁 Change le dossier courant pour simplifier
WORKDIR /app/apps/webapp

# (Facultatif) Debug : affiche le contenu du dossier dist
RUN ls -l dist

EXPOSE 4173

# ✅ Lance le serveur statique depuis le bon dossier
CMD ["npx", "serve", "-s", "dist", "--single", "-l", "4173"]

