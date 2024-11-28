-- Add new columns to user_profiles table
ALTER TABLE public.user_profiles
  -- Profile Information
  ADD COLUMN IF NOT EXISTS avatar_url TEXT,
  ADD COLUMN IF NOT EXISTS title TEXT,
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS address_line1 TEXT,
  ADD COLUMN IF NOT EXISTS address_line2 TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS state TEXT,
  ADD COLUMN IF NOT EXISTS postal_code TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'USA',
  
  -- Communication Preferences
  ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{
    "email": {
      "new_offers": true,
      "offer_updates": true,
      "property_updates": true,
      "weekly_digest": true,
      "marketing": false
    },
    "sms": {
      "new_offers": true,
      "offer_updates": true,
      "property_updates": false
    },
    "push": {
      "new_offers": true,
      "offer_updates": true,
      "property_updates": false
    }
  }'::jsonb,
  
  -- Agent/Professional Specific Fields
  ADD COLUMN IF NOT EXISTS license_number TEXT,
  ADD COLUMN IF NOT EXISTS license_state TEXT,
  ADD COLUMN IF NOT EXISTS license_expiry DATE,
  ADD COLUMN IF NOT EXISTS specialties TEXT[],
  ADD COLUMN IF NOT EXISTS years_of_experience INTEGER,
  
  -- Privacy Settings
  ADD COLUMN IF NOT EXISTS privacy_settings JSONB DEFAULT '{
    "profile_visibility": "public",
    "contact_info_visibility": "registered",
    "show_email": false,
    "show_phone": false,
    "show_address": false
  }'::jsonb,

  -- Account Preferences
  ADD COLUMN IF NOT EXISTS account_preferences JSONB DEFAULT '{
    "timezone": "America/Los_Angeles",
    "language": "en",
    "currency": "USD"
  }'::jsonb,

  -- Account Settings
  ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/Los_Angeles',
  ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';

-- Create storage bucket for profile pictures if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the bucket
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-pictures');

CREATE POLICY "Authenticated users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-pictures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profile-pictures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profile-pictures' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
