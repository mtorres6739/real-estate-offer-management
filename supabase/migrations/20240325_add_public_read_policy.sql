-- Enable RLS on the properties table if not already enabled
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Drop the public read policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public read access" ON properties;

-- Create a policy that allows anyone to read properties
CREATE POLICY "Allow public read access"
ON properties
FOR SELECT
USING (true);

-- Keep existing policies for authenticated users
-- This ensures authenticated users can still create/update/delete their own properties
DROP POLICY IF EXISTS "Allow authenticated users full access" ON properties;
CREATE POLICY "Allow authenticated users full access"
ON properties
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
