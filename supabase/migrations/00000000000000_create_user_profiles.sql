-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'BROKER', 'AGENT', 'CLIENT');

-- Create user_profiles table
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role user_role NOT NULL DEFAULT 'CLIENT',
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    assigned_to UUID REFERENCES user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy for viewing profiles
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT
    USING (auth.uid() = id);

-- Super admins can view all profiles
CREATE POLICY "Super admins can view all profiles" ON user_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'SUPER_ADMIN'
        )
    );

-- Admins can view all profiles except super admins
CREATE POLICY "Admins can view all profiles except super admins" ON user_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'ADMIN'
        )
        AND role != 'SUPER_ADMIN'
    );

-- Brokers can view their agents and clients
CREATE POLICY "Brokers can view their agents and clients" ON user_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'BROKER'
        )
        AND (
            assigned_to = auth.uid()
            OR id IN (
                SELECT id FROM user_profiles
                WHERE assigned_to IN (
                    SELECT id FROM user_profiles
                    WHERE assigned_to = auth.uid() AND role = 'AGENT'
                )
            )
        )
    );

-- Agents can view their clients
CREATE POLICY "Agents can view their clients" ON user_profiles
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE id = auth.uid() AND role = 'AGENT'
        )
        AND assigned_to = auth.uid()
    );

-- Function to handle profile updates
CREATE OR REPLACE FUNCTION handle_user_profile_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating updated_at
CREATE TRIGGER user_profiles_update_timestamp
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION handle_user_profile_update();

-- Create index for faster lookups
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_assigned_to ON user_profiles(assigned_to);

-- Insert initial super admin (you'll need to update this with the actual super admin user ID)
-- INSERT INTO user_profiles (id, email, role, created_at, updated_at)
-- VALUES ('super-admin-user-id', 'admin@example.com', 'SUPER_ADMIN', NOW(), NOW());
