-- Fix the RLS policy for clients viewing their assigned agent's profile
drop policy if exists "Clients can view their assigned agent's profile" on user_profiles;

create policy "Clients can view their assigned agent's profile"
  on user_profiles
  for select
  using (
    exists (
      select 1 
      from agent_access_codes aac
      where aac.used_by_id = auth.uid()
        and aac.agent_id = user_profiles.id
        and aac.is_active = true
        and aac.is_deleted = false
    )
  );
