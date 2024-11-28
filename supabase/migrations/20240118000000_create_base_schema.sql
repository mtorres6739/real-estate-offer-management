-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing tables if they exist
drop table if exists public.offers;
drop table if exists public.properties;

-- Create properties table
create table public.properties (
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
create table public.offers (
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
alter table public.properties enable row level security;
alter table public.offers enable row level security;

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
