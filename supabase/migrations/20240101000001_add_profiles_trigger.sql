-- Create a function to automatically set updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create a trigger to automatically update the updated_at column
create trigger set_updated_at
    before update on public.profiles
    for each row
    execute function public.handle_updated_at();
