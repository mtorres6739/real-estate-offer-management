-- Create the dashboard_stats table
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

-- Insert initial empty stats row
insert into dashboard_stats default values;

-- Create a function to update dashboard stats
create or replace function update_dashboard_stats()
returns trigger as $$
declare
  stats_row dashboard_stats%rowtype;
begin
  select
    count(*) filter (where true) as total_properties,
    count(*) filter (where true) as total_offers,
    count(*) filter (where true) as total_contracts,
    count(*) filter (where true) as total_users,
    count(*) filter (where role = 'AGENT') as total_agents,
    count(*) filter (where role = 'CLIENT') as total_clients,
    count(*) filter (where status = 'ACTIVE') as total_active_offers,
    count(*) filter (where status = 'PENDING') as total_pending_offers,
    count(*) filter (where status = 'ACCEPTED') as total_accepted_offers,
    count(*) filter (where status = 'REJECTED') as total_rejected_offers,
    count(*) filter (where status = 'EXPIRED') as total_expired_offers,
    count(*) filter (where status = 'ACTIVE') as total_active_contracts,
    count(*) filter (where status = 'PENDING') as total_pending_contracts,
    count(*) filter (where status = 'SIGNED') as total_signed_contracts,
    count(*) filter (where status = 'REJECTED') as total_rejected_contracts,
    count(*) filter (where status = 'EXPIRED') as total_expired_contracts
  from (
    select 'property' as type from properties
    union all
    select 'offer' from offers
    union all
    select 'contract' from contracts
    union all
    select role from user_profiles
  ) as combined_stats
  into
    stats_row.total_properties,
    stats_row.total_offers,
    stats_row.total_contracts,
    stats_row.total_users,
    stats_row.total_agents,
    stats_row.total_clients,
    stats_row.total_active_offers,
    stats_row.total_pending_offers,
    stats_row.total_accepted_offers,
    stats_row.total_rejected_offers,
    stats_row.total_expired_offers,
    stats_row.total_active_contracts,
    stats_row.total_pending_contracts,
    stats_row.total_signed_contracts,
    stats_row.total_rejected_contracts,
    stats_row.total_expired_contracts;

  -- Update the first stats row
  update dashboard_stats
  set
    total_properties = stats_row.total_properties,
    total_offers = stats_row.total_offers,
    total_contracts = stats_row.total_contracts,
    total_users = stats_row.total_users,
    total_agents = stats_row.total_agents,
    total_clients = stats_row.total_clients,
    total_active_offers = stats_row.total_active_offers,
    total_pending_offers = stats_row.total_pending_offers,
    total_accepted_offers = stats_row.total_accepted_offers,
    total_rejected_offers = stats_row.total_rejected_offers,
    total_expired_offers = stats_row.total_expired_offers,
    total_active_contracts = stats_row.total_active_contracts,
    total_pending_contracts = stats_row.total_pending_contracts,
    total_signed_contracts = stats_row.total_signed_contracts,
    total_rejected_contracts = stats_row.total_rejected_contracts,
    total_expired_contracts = stats_row.total_expired_contracts,
    updated_at = now()
  where id = (select id from dashboard_stats limit 1);
  
  return null;
end;
$$ language plpgsql;

-- Create triggers to update dashboard stats
create trigger update_dashboard_stats_on_property_change
  after insert or update or delete on properties
  for each statement
  execute function update_dashboard_stats();

create trigger update_dashboard_stats_on_offer_change
  after insert or update or delete on offers
  for each statement
  execute function update_dashboard_stats();

create trigger update_dashboard_stats_on_contract_change
  after insert or update or delete on contracts
  for each statement
  execute function update_dashboard_stats();

create trigger update_dashboard_stats_on_user_change
  after insert or update or delete on user_profiles
  for each statement
  execute function update_dashboard_stats();

-- Add RLS policies
alter table dashboard_stats enable row level security;

create policy "Allow read access to authenticated users"
  on dashboard_stats for select
  to authenticated
  using (true);

-- Only allow system to update stats through triggers
create policy "Only system can update stats"
  on dashboard_stats for all
  to authenticated
  using (false)
  with check (false);

-- Force an update by touching the user_profiles table
update user_profiles set updated_at = updated_at where id = (select id from user_profiles limit 1);
