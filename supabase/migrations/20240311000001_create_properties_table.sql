-- Drop the existing properties table if it exists
DROP TABLE IF EXISTS properties;

-- Create the properties table with all required columns
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    bedrooms INTEGER,
    bathrooms NUMERIC(3,1),
    square_feet INTEGER,
    year_built INTEGER,
    property_type TEXT,
    status TEXT DEFAULT 'active',
    description TEXT,
    notes TEXT
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own properties
CREATE POLICY "Users can view their own properties"
    ON properties
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own properties
CREATE POLICY "Users can insert their own properties"
    ON properties
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own properties
CREATE POLICY "Users can update their own properties"
    ON properties
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own properties
CREATE POLICY "Users can delete their own properties"
    ON properties
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
