-- Update existing status values to match the new enum
UPDATE properties
SET status = 'Active'
WHERE status = 'active';

-- Add check constraint for status
ALTER TABLE properties
DROP CONSTRAINT IF EXISTS properties_status_check;

ALTER TABLE properties
ADD CONSTRAINT properties_status_check
CHECK (status IN ('Active', 'Pending', 'Sold', 'Inactive', 'Cancelled', 'Closed', 'Withdrawn'));

-- Set default value for status
ALTER TABLE properties
ALTER COLUMN status SET DEFAULT 'Active';

-- Make status NOT NULL
ALTER TABLE properties
ALTER COLUMN status SET NOT NULL;
