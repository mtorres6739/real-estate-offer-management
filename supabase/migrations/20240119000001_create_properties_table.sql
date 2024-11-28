-- Drop existing policies if they exist
drop policy if exists "Users can view their own properties" on properties;
drop policy if exists "Users can insert their own properties" on properties;
drop policy if exists "Users can update their own properties" on properties;
drop policy if exists "Users can delete their own properties" on properties;

-- Create properties table if it doesn't exist
create table if not exists public.properties (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    address text not null,
    city text not null,
    state text not null,
    zip_code text not null,
    price numeric(12,2) not null,
    bedrooms integer,
    bathrooms numeric(3,1),
    square_feet integer,
    year_built integer,
    property_type text,
    status text default 'active' not null,
    description text,
    notes text
);

-- Enable RLS
alter table public.properties enable row level security;

-- Create policies
create policy "Users can view their own properties"
    on properties for select
    using (auth.uid() = user_id);

create policy "Users can insert their own properties"
    on properties for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own properties"
    on properties for update
    using (auth.uid() = user_id);

create policy "Users can delete their own properties"
    on properties for delete
    using (auth.uid() = user_id);

-- Create function to automatically update updated_at if it doesn't exist
do $$ 
begin
    if not exists (select 1 from pg_proc where proname = 'handle_updated_at') then
        create function public.handle_updated_at()
        returns trigger as $$
        begin
            new.updated_at = timezone('utc'::text, now());
            return new;
        end;
        $$ language plpgsql;
    end if;
end $$;

-- Create trigger for updated_at if it doesn't exist
do $$
begin
    if not exists (select 1 from pg_trigger where tgname = 'handle_properties_updated_at') then
        create trigger handle_properties_updated_at
            before update on public.properties
            for each row
            execute procedure public.handle_updated_at();
    end if;
end $$;
