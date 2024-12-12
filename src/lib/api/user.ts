import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export interface UserProfile {
  name: string;
  phone?: string;
  company?: string;
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>) {
  const supabase = createClientComponentClient();
  
  // Update profiles table
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (profileError) {
    throw profileError;
  }

  // Update auth.users metadata if name is provided
  if (profile.name) {
    const { data: userData, error: authError } = await supabase.auth.updateUser({
      data: {
        name: profile.name
      }
    });

    if (authError) {
      throw authError;
    }

    // Refresh the session to get updated metadata
    const { error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) {
      throw refreshError;
    }
  }

  return profileData;
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
