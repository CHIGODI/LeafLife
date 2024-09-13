-- Create the database if it doesn't exist
CREATE DATABASE leaflife_dev_db;

-- Create the user if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'leaflife_dev') THEN
      CREATE ROLE leaflife_dev WITH LOGIN PASSWORD 'leaflife_pwd';
   END IF;
END
$$;

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE leaflife_dev_db TO leaflife_dev;