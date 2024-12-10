import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Create dashboard_stats table
    const { error: createTableError } = await supabase.rpc('create_dashboard_stats_table');

    if (createTableError) {
      console.error('Error creating dashboard_stats table:', createTableError);
      return NextResponse.json({ error: createTableError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Setup completed successfully' });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
