-- Add latitude and longitude columns to properties table
ALTER TABLE properties
ADD COLUMN latitude double precision,
ADD COLUMN longitude double precision;
