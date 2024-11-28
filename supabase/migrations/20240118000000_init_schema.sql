-- Create user profiles extension and table
create extension if not exists "uuid-ossp";

-- Create properties table
create table if not exists public.properties (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  address text not null,
  price numeric not null,
  description text,
  status text check (status in ('available', 'pending', 'sold')) default 'available',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create offers table
create table if not exists public.offers (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users on delete cascade not null,
  property_id uuid references public.properties on delete cascade not null,
  amount numeric not null,
  status text check (status in ('pending', 'accepted', 'rejected')) default 'pending',
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS
alter table public.properties enable row level security;
alter table public.offers enable row level security;

-- Create RLS policies
create policy "Public properties are viewable by everyone" on public.properties
  for select using (true);

create policy "Users can insert their own properties" on public.properties
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own properties" on public.properties
  for update using (auth.uid() = user_id);

create policy "Users can delete their own properties" on public.properties
  for delete using (auth.uid() = user_id);

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
