#!/bin/sh

echo "Waiting for PostgreSQL..."

until pg_isready -h db -p 5432 -U cloudresume_user
do
    echo "Database is unavailable - sleeping"
    sleep 2
done

echo "PostgreSQL is ready!"

python manage.py migrate

exec python manage.py runserver 0.0.0.0:8000