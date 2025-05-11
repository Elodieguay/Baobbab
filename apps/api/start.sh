#!/bin/sh

echo "➡️ Running migrations..."
pnpm --filter api mikro-orm migration:up

echo "✅ Migrations applied."
echo "🌱 Running seeders..."
pnpm --filter api mikro-orm seeder:run

echo "🚀 Starting the server..."
node apps/api/dist/src/main.js
