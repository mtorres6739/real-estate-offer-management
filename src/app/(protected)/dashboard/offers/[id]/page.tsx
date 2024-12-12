import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import { UserRole } from '@/types/user'
import { OfferDetails } from './OfferDetails'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

interface SearchParams {
  searchParams: { [key: string]: string | string[] | undefined }
}

interface Props extends SearchParams {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const cookieStore = await cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const awaitedParams = await params

  const { data: offer } = await supabase
    .from('offers')
    .select('properties')
    .eq('id', awaitedParams.id)
    .single()
  
  if (!offer) {
    return {
      title: 'Offer Not Found',
    }
  }
  
  return {
    title: `Offer Details - ${offer.properties.address}`,
  }
}

async function getOffer(cookieStore: ReturnType<typeof cookies>, id: string) {
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: offer } = await supabase
    .from('offers')
    .select(`
      *,
      properties:property_id (
        id,
        address,
        city,
        state,
        zip_code,
        description,
        price,
        bedrooms,
        bathrooms,
        square_feet,
        year_built,
        property_type
      )
    `)
    .eq('id', id)
    .single()
  return offer
}

async function getCurrentUserRole(cookieStore: ReturnType<typeof cookies>): Promise<UserRole> {
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  console.log('Role from metadata:', profile?.role)
  
  if (!profile?.role) {
    // If no role found and email matches, set as SUPER_ADMIN
    if (user.email === 'torres.mathew@gmail.com') {
      await supabase
        .from('user_profiles')
        .upsert({ id: user.id, role: 'SUPER_ADMIN' })
      return 'SUPER_ADMIN'
    }
    return 'USER'
  }
  
  return profile.role as UserRole
}

export default async function OfferPage({
  params,
}: {
  params: { id: string }
}) {
  const cookieStore = await cookies()
  const awaitedParams = await params

  const [offer, userRole] = await Promise.all([
    getOffer(cookieStore, awaitedParams.id),
    getCurrentUserRole(cookieStore)
  ])

  if (!offer) {
    notFound()
  }

  console.log('Server side user role:', userRole)

  return <OfferDetails offer={offer} userRole={userRole} />
}
