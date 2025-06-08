FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install
RUN pnpm --filter webapp run build

WORKDIR /app/apps/webapp

RUN ls -l dist

EXPOSE 4173

CMD ["npx", "serve", "-s", "dist", "--single", "-l", "4173"]

