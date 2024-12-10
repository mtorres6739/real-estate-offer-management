import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { UserRole } from '@/types/user';

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Update the user's role to super admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: UserRole.SUPER_ADMIN })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating role:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Role updated successfully' });
  } catch (error) {
    console.error('Update role error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
