import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@/types/user'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Get current user
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get current user's role
    const { data: currentProfile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', currentUser.id)
      .single()

    // Only SUPER_ADMIN and ADMIN can update roles
    if (![UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(currentProfile?.role as UserRole)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { role } = await request.json()

    // Validate role
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Update auth metadata
    const { error: authError } = await supabase.auth.admin.updateUserById(
      params.id,
      { user_metadata: { role } }
    )

    if (authError) {
      throw authError
    }

    // The trigger will automatically update the user_profiles table

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating user role:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
