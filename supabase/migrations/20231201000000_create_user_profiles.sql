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
DROP TRIGGER IF EXISTS sync_user_role ON auth.users;

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS handle_updated_at();
DROP FUNCTION IF EXISTS sync_user_role();

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

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
ON public.user_profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Super admins and admins can view all profiles"
ON public.user_profiles
FOR SELECT
USING (
  auth.jwt() ->> 'role' IN ('SUPER_ADMIN', 'ADMIN')
);

CREATE POLICY "Super admins and admins can update profiles"
ON public.user_profiles
FOR UPDATE
USING (
  auth.jwt() ->> 'role' IN ('SUPER_ADMIN', 'ADMIN')
);

CREATE POLICY "Enable initial profile creation"
ON public.user_profiles
FOR INSERT
WITH CHECK (true);

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

-- Create function to sync user role from auth metadata
CREATE OR REPLACE FUNCTION sync_user_role()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT;
BEGIN
    -- Get role from raw_user_meta_data, fallback to jwt() claim, then to CLIENT
    user_role := COALESCE(
        NEW.raw_user_meta_data->>'role',
        current_setting('request.jwt.claims', true)::json->>'role',
        'CLIENT'
    );

    INSERT INTO public.user_profiles (id, email, role)
    VALUES (
        NEW.id,
        NEW.email,
        user_role
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        email = EXCLUDED.email,
        role = user_role,
        updated_at = timezone('utc'::text, now());
    
    -- Log the values for debugging
    RAISE NOTICE 'User ID: %, Email: %, Role: %', NEW.id, NEW.email, user_role;
    
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create trigger to sync user role
CREATE TRIGGER sync_user_role
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION sync_user_role();
