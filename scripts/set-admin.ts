import { createClient } from '@supabase/supabase-js';

async function setAdmin() {
  // Get these values from your Supabase project settings
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Update the specific user's role to super_admin
    const { error } = await supabase
      .from('profiles')
      .update({ role: 'super_admin' })
      .eq('email', 'torres.mathew@gmail.com');

    if (error) {
      throw error;
    }

    console.log('Successfully updated user role to super_admin');
  } catch (error) {
    console.error('Error updating role:', error);
  }
}

setAdmin();
