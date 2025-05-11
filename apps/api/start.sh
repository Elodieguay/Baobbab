#!/bin/sh

echo "➡️ Running migrations..."
pnpm --filter api mikro-orm migration:up

echo "✅ Migrations applied."
psql "$DATABASE_URL" -c '\dt'

echo "🚀 Starting the server..."
node apps/api/dist/src/main.js
