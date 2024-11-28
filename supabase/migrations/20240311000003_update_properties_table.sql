-- First, drop the existing policies and constraints
DROP POLICY IF EXISTS "Property owners can view offers on their properties" ON offers;
DROP POLICY IF EXISTS "Property owners can update offers on their properties" ON offers;
ALTER TABLE IF EXISTS offers DROP CONSTRAINT IF EXISTS offers_property_id_fkey;

-- Add the missing columns to the properties table
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS zip_code TEXT,
ADD COLUMN IF NOT EXISTS price NUMERIC(12,2),
ADD COLUMN IF NOT EXISTS bedrooms INTEGER,
ADD COLUMN IF NOT EXISTS bathrooms NUMERIC(3,1),
ADD COLUMN IF NOT EXISTS square_feet INTEGER,
ADD COLUMN IF NOT EXISTS year_built INTEGER,
ADD COLUMN IF NOT EXISTS property_type TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Update existing columns to be NOT NULL where required
ALTER TABLE properties 
ALTER COLUMN address SET NOT NULL,
ALTER COLUMN city SET NOT NULL,
ALTER COLUMN state SET NOT NULL,
ALTER COLUMN zip_code SET NOT NULL,
ALTER COLUMN price SET NOT NULL;

-- Re-create the foreign key constraint
ALTER TABLE offers
ADD CONSTRAINT offers_property_id_fkey 
FOREIGN KEY (property_id) 
REFERENCES properties(id);

-- Re-create the policies
CREATE POLICY "Property owners can view offers on their properties"
ON offers
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM properties
        WHERE properties.id = offers.property_id
        AND properties.user_id = auth.uid()
    )
);

CREATE POLICY "Property owners can update offers on their properties"
ON offers
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM properties
        WHERE properties.id = offers.property_id
        AND properties.user_id = auth.uid()
    )
);

-- Create or replace the update_updated_at_column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update the updated_at timestamp if it doesn't exist
DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
