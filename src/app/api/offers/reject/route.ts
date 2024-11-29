import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const offerId = formData.get('offerId') as string

    const supabase = createRouteHandlerClient({ cookies })

    const { error } = await supabase
      .from('offers')
      .update({ status: 'rejected' })
      .eq('id', offerId)

    if (error) throw error

    return NextResponse.redirect(new URL(`/dashboard/offers/${offerId}`, request.url))
  } catch (error) {
    console.error('Error rejecting offer:', error)
    return NextResponse.json(
      { error: 'Error rejecting offer' },
      { status: 500 }
    )
  }
}
