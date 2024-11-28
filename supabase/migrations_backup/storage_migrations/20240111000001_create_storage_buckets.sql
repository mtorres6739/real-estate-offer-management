-- Create a new storage bucket for profile pictures if it doesn't exist
do $$
begin
  if not exists (select 1 from storage.buckets where id = 'profile-pictures') then
    insert into storage.buckets (id, name, public)
    values ('profile-pictures', 'profile-pictures', true);
  end if;
end $$;

-- Drop existing policies if they exist
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Avatar upload" on storage.objects;
drop policy if exists "Avatar delete" on storage.objects;

-- Set up storage policies for the profile pictures bucket
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'profile-pictures' );

create policy "Avatar upload"
  on storage.objects for insert
  with check ( bucket_id = 'profile-pictures' AND auth.role() = 'authenticated' );

create policy "Avatar delete"
  on storage.objects for delete
  using ( bucket_id = 'profile-pictures' AND auth.uid() = owner );
