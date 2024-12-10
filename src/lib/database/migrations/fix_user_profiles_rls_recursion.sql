-- First, drop all existing policies
drop policy if exists "Users can view their own profile" on user_profiles;
drop policy if exists "Users can update their own profile" on user_profiles;
drop policy if exists "Users can insert their own profile" on user_profiles;
drop policy if exists "Agents can view profiles they're assigned to" on user_profiles;
drop policy if exists "Allow profile creation during signup" on user_profiles;

-- Enable RLS
alter table user_profiles enable row level security;

-- Create simplified policies without recursion
create policy "Allow profile creation during signup"
  on user_profiles for insert
  with check (true);

create policy "Users can view own and assigned profiles"
  on user_profiles for select
  using (
    auth.uid() = id 
    or 
    auth.uid() = assigned_agent_id
  );

create policy "Users can update their own profile"
  on user_profiles for update
  using (auth.uid() = id);
