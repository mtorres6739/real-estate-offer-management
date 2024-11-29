import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // Get the session from cookies
    const cookieStore = cookies();
    const supabaseAuth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabaseAuth.auth.getSession();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch offers with property details
    const { data: offers, error } = await supabase
      .from('offers')
      .select(`
        *,
        properties (
          address,
          city,
          state,
          zip_code
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching offers:', error);
      return new NextResponse('Error fetching offers', { status: 500 });
    }

    // Transform the data to include property address
    const transformedOffers = offers.map((offer) => ({
      ...offer,
      property_address: offer.properties
        ? `${offer.properties.address}, ${offer.properties.city}, ${offer.properties.state} ${offer.properties.zip_code}`
        : 'Unknown Property',
      properties: undefined, // Remove the properties object from the response
    }));

    return NextResponse.json(transformedOffers);
  } catch (error) {
    console.error('Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
