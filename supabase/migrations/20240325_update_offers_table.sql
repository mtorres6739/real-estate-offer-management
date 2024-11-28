-- Add additional fields for buyers and documents
ALTER TABLE public.offers
ADD COLUMN IF NOT EXISTS buyer_names TEXT[], -- Array of buyer names
ADD COLUMN IF NOT EXISTS buyer_emails TEXT[], -- Array of buyer emails
ADD COLUMN IF NOT EXISTS buyer_phones TEXT[], -- Array of buyer phones
ADD COLUMN IF NOT EXISTS documents JSONB, -- Store document URLs and metadata
ADD COLUMN IF NOT EXISTS notes TEXT; -- Additional notes or comments

-- Create a storage bucket for offer documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('offer-documents', 'offer-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated and public users to upload to the bucket
CREATE POLICY "Allow public uploads to offer-documents"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'offer-documents'
);

-- Allow users to read their own documents
CREATE POLICY "Allow users to read their own documents"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'offer-documents' AND
  (
    -- Authenticated users can access their own documents
    (auth.uid() IS NOT NULL AND owner = auth.uid()) OR
    -- Public users can access by matching the name pattern
    (name LIKE 'public/%')
  )
);
