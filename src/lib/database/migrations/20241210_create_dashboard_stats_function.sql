-- Create the function to set up dashboard_stats table
create or replace function create_dashboard_stats_table()
returns void
language plpgsql
security definer
as $$
begin
  -- Create the dashboard_stats table if it doesn't exist
  create table if not exists dashboard_stats (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    total_properties integer default 0,
    total_offers integer default 0,
    total_contracts integer default 0,
    total_users integer default 0,
    total_agents integer default 0,
    total_clients integer default 0,
    total_active_offers integer default 0,
    total_pending_offers integer default 0,
    total_accepted_offers integer default 0,
    total_rejected_offers integer default 0,
    total_expired_offers integer default 0,
    total_active_contracts integer default 0,
    total_pending_contracts integer default 0,
    total_signed_contracts integer default 0,
    total_rejected_contracts integer default 0,
    total_expired_contracts integer default 0
  );

  -- Enable RLS
  alter table dashboard_stats enable row level security;

  -- Create policies
  drop policy if exists "Allow read access to authenticated users" on dashboard_stats;
  create policy "Allow read access to authenticated users"
    on dashboard_stats for select
    to authenticated
    using (true);

  -- Insert initial record if none exists
  insert into dashboard_stats (id)
  select uuid_generate_v4()
  where not exists (select 1 from dashboard_stats);
end;
$$;
