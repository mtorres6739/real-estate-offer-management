-- Add fields for non-authenticated users
ALTER TABLE public.offers
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ALTER COLUMN user_id DROP NOT NULL; -- Make user_id optional

-- Update RLS policies for offers
DROP POLICY IF EXISTS "Enable public to insert offers" ON public.offers;
CREATE POLICY "Enable public to insert offers"
ON public.offers FOR INSERT
TO public
WITH CHECK (true);

-- Allow users to view their own offers (either by user_id or email)
DROP POLICY IF EXISTS "Enable users to view their offers" ON public.offers;
CREATE POLICY "Enable users to view their offers"
ON public.offers FOR SELECT
TO public
USING (
    (user_id = auth.uid() AND auth.uid() IS NOT NULL) OR
    (email = current_setting('request.jwt.claims')::json->>'email' AND auth.uid() IS NOT NULL)
);
