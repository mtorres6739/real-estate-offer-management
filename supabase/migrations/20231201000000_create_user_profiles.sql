-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Super admins and admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Super admins and admins can insert profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Super admins and admins can update profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Super admins and admins can delete profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow initial super admin creation" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable read access for users to their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable insert access for all users" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable update for users to their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Enable all access" ON public.user_profiles;
DROP POLICY IF EXISTS "enable_all_access" ON public.user_profiles;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS handle_updated_at ON public.user_profiles;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS handle_updated_at();

-- Drop and recreate table
DROP TABLE IF EXISTS public.user_profiles;

-- Create user_profiles table if it doesn't exist
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'CLIENT',
    assigned_to UUID,  
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable RLS
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Create function to handle timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for handling updated_at
CREATE TRIGGER handle_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();
