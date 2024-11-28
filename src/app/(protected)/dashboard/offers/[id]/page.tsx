import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Metadata } from 'next'
import { UserRole } from '@/types/user'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

interface Props {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [resolvedParams, cookieStore] = await Promise.all([
    params,
    cookies()
  ])
  
  if (!resolvedParams?.id) {
    return {
      title: 'Offer Not Found',
    }
  }

  const offer = await getOffer(cookieStore, resolvedParams.id)
  
  if (!offer) {
    return {
      title: 'Offer Not Found',
    }
  }
  
  return {
    title: `Offer Details - ${offer.properties.address}`,
  }
}

async function getOffer(cookieStore: ReturnType<typeof cookies>, offerId: string) {
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const { data: offer, error } = await supabase
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
    .eq('id', offerId)
    .single()

  if (error || !offer) {
    return null
  }

  return offer
}

async function getCurrentUserRole(cookieStore: ReturnType<typeof cookies>) {
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return UserRole.CLIENT

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return (profile?.role || UserRole.CLIENT) as UserRole
}

export default async function OfferPage({ params }: Props) {
  // Await both the params and cookieStore
  const [resolvedParams, cookieStore] = await Promise.all([
    params,
    cookies()
  ])

  if (!resolvedParams?.id) {
    notFound()
  }

  const [offer, userRole] = await Promise.all([
    getOffer(cookieStore, resolvedParams.id),
    getCurrentUserRole(cookieStore)
  ])

  if (!offer) {
    notFound()
  }

  const property = offer.properties
  const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zip_code}`

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }

  // Check if user can view contact information
  const canViewContactInfo = [
    UserRole.AGENT,
    UserRole.BROKER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN
  ].includes(userRole)

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Offer Details</h1>
        <p className="text-gray-600">
          Submitted {format(new Date(offer.created_at), 'PPP')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
            <CardDescription>{fullAddress}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offer Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              className={`${
                statusColors[offer.status as keyof typeof statusColors]
              }`}
            >
              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Buyer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900">Names</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {offer.buyer_names?.join(', ') || offer.name || 'N/A'}
                </dd>
              </div>
              {canViewContactInfo && (
                <>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Emails</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      {offer.buyer_emails?.join(', ') || offer.email || 'N/A'}
                    </dd>
                  </div>
                  <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium text-gray-900">Phone Numbers</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                      {offer.buyer_phones?.join(', ') || offer.phone || 'N/A'}
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900">Amount</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  ${offer.amount.toLocaleString()}
                </dd>
              </div>
              {offer.notes && (
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium text-gray-900">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                    {offer.notes}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {offer.documents && offer.documents.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-gray-100">
                {offer.documents.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {doc.description || `Document ${index + 1}`}
                      </p>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                    </div>
                    <Button asChild variant="outline">
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        View Document
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Offer Actions */}
      {offer.status === 'pending' && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Offer Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
            <form action="/api/offers/accept" method="POST">
              <input type="hidden" name="offerId" value={offer.id} />
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              >
                Accept Offer
              </Button>
            </form>
            <form action="/api/offers/counter" method="POST">
              <input type="hidden" name="offerId" value={offer.id} />
              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
              >
                Counter Offer
              </Button>
            </form>
            <form action="/api/offers/reject" method="POST">
              <input type="hidden" name="offerId" value={offer.id} />
              <Button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Reject Offer
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
