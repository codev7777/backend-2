#!/bin/bash

DB_NAME="mydatabase"
DB_USER="postgres"
DB_PASSWORD="password"

# Check if PostgreSQL is running
if ! pg_isready -q; then
  echo "PostgreSQL is not running. Please start PostgreSQL and try again."
  exit 1
fi

# Create database if it doesn't exist
DB_EXIST=$(psql -U $DB_USER -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")
if [ "$DB_EXIST" != "1" ]; then
  echo "Creating database $DB_NAME..."
  createdb -U $DB_USER $DB_NAME
else
  echo "Database $DB_NAME already exists."
fi

# Run Prisma migrations
echo "Applying migrations..."
npx prisma migrate deploy

# Seed the database
echo "Seeding database..."
npx prisma db seed

echo "Database setup complete."
