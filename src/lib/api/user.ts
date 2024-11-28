import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface UserProfile {
  name: string;
  phone?: string;
  company?: string;
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>) {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getUserProfile(userId: string) {
  const supabase = createClientComponentClient();
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}
