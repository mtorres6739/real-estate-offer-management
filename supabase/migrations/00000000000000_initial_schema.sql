-- Drop existing policies
drop policy if exists "Anyone can view available properties" on properties;

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Create user profiles table if it doesn't exist
create table if not exists public.user_profiles (
    id uuid references auth.users on delete cascade not null primary key,
    first_name text,
    last_name text,
    avatar_url text,
    created_at timestamptz default timezone('utc'::text, now()) not null,
    updated_at timestamptz default timezone('utc'::text, now()) not null,
    constraint username_length check (char_length(first_name) >= 2)
);

-- Create properties table
create table if not exists public.properties (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    user_id uuid references auth.users not null,
    address text not null,
    price numeric not null,
    description text,
    status text not null default 'available'
        check (status in ('available', 'pending', 'sold'))
);

-- Create offers table
create table if not exists public.offers (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    user_id uuid references auth.users not null,
    property_id uuid references public.properties not null,
    amount numeric not null,
    status text not null default 'pending'
        check (status in ('pending', 'accepted', 'rejected'))
);

-- Enable RLS
alter table public.user_profiles enable row level security;
alter table public.properties enable row level security;
alter table public.offers enable row level security;

-- User profile policies
create policy "Users can view their own profile"
    on public.user_profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on public.user_profiles for update
    using (auth.uid() = id);

-- Properties policies
create policy "Anyone can view available properties"
    on public.properties for select
    using (status = 'available');

create policy "Users can view their own properties"
    on public.properties for select
    using (auth.uid() = user_id);

create policy "Users can create their own properties"
    on public.properties for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own properties"
    on public.properties for update
    using (auth.uid() = user_id);

create policy "Users can delete their own properties"
    on public.properties for delete
    using (auth.uid() = user_id);

-- Offers policies
create policy "Users can view offers they made"
    on public.offers for select
    using (auth.uid() = user_id);

create policy "Property owners can view offers on their properties"
    on public.offers for select
    using (auth.uid() in (
        select user_id from properties where id = property_id
    ));

create policy "Users can create offers"
    on public.offers for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own offers"
    on public.offers for update
    using (auth.uid() = user_id);

create policy "Property owners can update offers on their properties"
    on public.offers for update
    using (auth.uid() in (
        select user_id from properties where id = property_id
    ));
