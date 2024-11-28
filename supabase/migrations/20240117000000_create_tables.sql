-- Drop existing tables if they exist
drop table if exists public.offers;
drop table if exists public.properties;

-- Create properties table if it doesn't exist
create table if not exists public.properties (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  address text not null,
  price numeric not null,
  description text,
  status text check (status in ('available', 'pending', 'sold')) default 'available',
  updated_at timestamp with time zone
);

-- Enable RLS for properties
alter table public.properties enable row level security;

-- Drop existing policies for properties
drop policy if exists "Public properties are viewable by everyone" on public.properties;
drop policy if exists "Users can insert their own properties" on public.properties;
drop policy if exists "Users can update their own properties" on public.properties;
drop policy if exists "Users can delete their own properties" on public.properties;

-- Create properties policies
create policy "Public properties are viewable by everyone" on public.properties
  for select using (true);

create policy "Users can insert their own properties" on public.properties
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own properties" on public.properties
  for update using (auth.uid() = user_id);

create policy "Users can delete their own properties" on public.properties
  for delete using (auth.uid() = user_id);

-- Create offers table if it doesn't exist
create table if not exists public.offers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  property_id uuid references public.properties on delete cascade not null,
  amount numeric not null,
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  updated_at timestamp with time zone
);

-- Enable RLS for offers
alter table public.offers enable row level security;

-- Drop existing policies for offers
drop policy if exists "Users can view offers on their properties" on public.offers;
drop policy if exists "Users can insert their own offers" on public.offers;
drop policy if exists "Users can update their own offers" on public.offers;
drop policy if exists "Property owners can update offers on their properties" on public.offers;

-- Create offers policies
create policy "Users can view offers on their properties" on public.offers
  for select using (
    auth.uid() = user_id or
    auth.uid() in (
      select user_id from properties where id = property_id
    )
  );

create policy "Users can insert their own offers" on public.offers
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own offers" on public.offers
  for update using (auth.uid() = user_id);

create policy "Property owners can update offers on their properties" on public.offers
  for update using (
    auth.uid() in (
      select user_id from properties where id = property_id
    )
  );

-- Create or replace function to delete user account and all related data
create or replace function public.delete_user_account()
returns void
language plpgsql
security definer
as $$
begin
  -- Delete user's properties (this will cascade to offers)
  delete from public.properties where user_id = auth.uid();
  
  -- Delete user's offers
  delete from public.offers where user_id = auth.uid();
end;
$$;
