#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$DB_BACKEND_USER" --dbname "$DB_BACKEND_NAME" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
