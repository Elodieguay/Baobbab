#!/bin/sh

echo "➡️ Running migrations..."
pnpm --filter api mikro-orm migration:up

echo "✅ Migrations applied."

echo "🚀 Starting the server..."
node apps/api/dist/src/main.js
