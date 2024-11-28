-- Drop and recreate the storage schema
drop schema if exists storage cascade;
create schema if not exists storage;

-- Enable the storage extension
create extension if not exists "storage" schema "extensions";

-- Create the buckets table
create table "storage"."buckets" (
    "id" text not null,
    "name" text not null,
    "owner" uuid references auth.users,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default now(),
    "public" boolean default false,
    "avif_autodetection" boolean default false,
    "file_size_limit" bigint default null,
    "allowed_mime_types" text[] default null,
    primary key ("id")
);

-- Create the objects table
create table "storage"."objects" (
    "id" uuid not null default uuid_generate_v4(),
    "bucket_id" text,
    "name" text,
    "owner" uuid references auth.users,
    "created_at" timestamptz default now(),
    "updated_at" timestamptz default now(),
    "last_accessed_at" timestamptz default now(),
    "metadata" jsonb default '{}'::jsonb,
    "path_tokens" text[] generated always as (string_to_array(name, '/')) stored,
    primary key ("id"),
    foreign key ("bucket_id") references "storage"."buckets" ("id")
);

-- Set up RLS
alter table "storage"."buckets" enable row level security;
alter table "storage"."objects" enable row level security;

-- Create the profile-pictures bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'profile-pictures',
    'profile-pictures',
    true,
    5242880,
    array['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO UPDATE 
SET public = true,
    file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

-- Create bucket policies
create policy "Public Access"
    on storage.objects for select
    using ( bucket_id = 'profile-pictures' );

create policy "Authenticated users can upload profile pictures"
    on storage.objects for insert
    to authenticated
    with check (
        bucket_id = 'profile-pictures'
        and auth.role() = 'authenticated'
    );

create policy "Users can update their own profile pictures"
    on storage.objects for update
    to authenticated
    using (
        bucket_id = 'profile-pictures'
        and auth.role() = 'authenticated'
    );

create policy "Users can delete their own profile pictures"
    on storage.objects for delete
    to authenticated
    using (
        bucket_id = 'profile-pictures'
        and auth.role() = 'authenticated'
    );

-- Create a function to clean up old files
create or replace function storage.handle_old_profile_picture()
returns trigger
language plpgsql
security definer
as $$
declare
  old_file_path text;
begin
  if old.avatar_url is not null then
    old_file_path := substr(old.avatar_url, strpos(old.avatar_url, 'profile-pictures/'));
    delete from storage.objects where name = old_file_path;
  end if;
  return new;
end;
$$;

-- Create a trigger to clean up old files when avatar_url is updated
drop trigger if exists on_avatar_change on public.user_profiles;
create trigger on_avatar_change
  before update of avatar_url
  on public.user_profiles
  for each row
  when (old.avatar_url is distinct from new.avatar_url)
  execute function storage.handle_old_profile_picture();
