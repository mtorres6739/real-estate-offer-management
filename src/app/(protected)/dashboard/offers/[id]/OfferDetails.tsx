'use client'

import React from 'react'
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
import { UserRole } from '@/types/user'
import type { OfferWithDetails } from '@/types/offers'

interface OfferDetailsProps {
  offer: OfferWithDetails
  userRole: UserRole
}

export function OfferDetails({ offer, userRole }: OfferDetailsProps) {
  console.log('Client side user role:', userRole)
  
  const property = offer.properties
  const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zip_code}`

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }

  const canEditOffer = [
    UserRole.ADMIN,
    UserRole.AGENT,
    UserRole.BROKER,
    UserRole.SUPER_ADMIN
  ].includes(userRole)

  console.log('Can edit offer:', canEditOffer)

  const canViewContactInfo = [
    UserRole.AGENT,
    UserRole.BROKER,
    UserRole.ADMIN,
    UserRole.SUPER_ADMIN
  ].includes(userRole)

  return (
    <div className="flex flex-col min-h-full">
      {/* Action Bar */}
      <div className="bg-white border-b shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-900">Offer Amount: ${offer.amount.toLocaleString()}</span>
              <Badge 
                className={`${
                  statusColors[offer.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                } text-sm font-medium px-2.5 py-0.5 rounded`}
              >
                {offer.status}
              </Badge>
            </div>
            {canEditOffer && (
              <div className="flex items-center space-x-4">
                <form action="/api/offers/accept" method="POST">
                  <input type="hidden" name="offerId" value={offer.id} />
                  <Button 
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
                    disabled={offer.status === 'accepted'}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Accept
                  </Button>
                </form>

                <form action="/api/offers/counter" method="POST">
                  <input type="hidden" name="offerId" value={offer.id} />
                  <Button 
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
                    disabled={offer.status !== 'pending'}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Counter
                  </Button>
                </form>

                <form action="/api/offers/reject" method="POST">
                  <input type="hidden" name="offerId" value={offer.id} />
                  <Button 
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
                    disabled={offer.status === 'rejected'}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl mb-8 p-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">Offer for {property.address}</h1>
            <p className="text-lg text-gray-100">{fullAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <dd className="mt-1 text-lg font-semibold">${property.price.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Square Feet</dt>
                  <dd className="mt-1 text-lg font-semibold">{property.square_feet}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Bedrooms</dt>
                  <dd className="mt-1 text-lg font-semibold">{property.bedrooms}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Bathrooms</dt>
                  <dd className="mt-1 text-lg font-semibold">{property.bathrooms}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Year Built</dt>
                  <dd className="mt-1 text-lg font-semibold">{property.year_built}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Property Type</dt>
                  <dd className="mt-1 text-lg font-semibold capitalize">{property.property_type}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Offer Amount</dt>
                  <dd className="mt-1 text-lg font-semibold">${offer.amount.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Submitted</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {format(new Date(offer.created_at), 'PPpp')}
                  </dd>
                </div>
                {canViewContactInfo && (
                  <>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Name</dt>
                      <dd className="mt-1 text-lg font-semibold">{offer.contact_name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Email</dt>
                      <dd className="mt-1 text-lg font-semibold">{offer.contact_email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Contact Phone</dt>
                      <dd className="mt-1 text-lg font-semibold">{offer.contact_phone}</dd>
                    </div>
                  </>
                )}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
