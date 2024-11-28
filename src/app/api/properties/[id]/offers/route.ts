import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { CreateOfferInput } from '@/types/offers';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Get the request body
    const body: CreateOfferInput = await request.json();

    // Get the current user (if authenticated)
    const { data: { user } } = await supabase.auth.getUser();

    // Validate property exists
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id')
      .eq('id', params.id)
      .single();

    if (propertyError || !property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Validate required fields for non-authenticated users
    if (!user && (!body.name || !body.email || !body.phone)) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required for non-authenticated users' },
        { status: 400 }
      );
    }

    // Create the offer
    const { data: offer, error: offerError } = await supabase
      .from('offers')
      .insert({
        property_id: params.id,
        user_id: user?.id || null,
        amount: body.amount,
        status: 'pending',
        // Include contact info only for non-authenticated users
        ...(user ? {} : {
          name: body.name,
          email: body.email,
          phone: body.phone,
        }),
      })
      .select()
      .single();

    if (offerError) {
      console.error('Error creating offer:', offerError);
      return NextResponse.json(
        { error: 'Failed to create offer' },
        { status: 500 }
      );
    }

    return NextResponse.json(offer);
  } catch (error) {
    console.error('Error in POST /api/properties/[id]/offers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
