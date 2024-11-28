'use client';

import { Property } from '@/types/properties'
import { MapPinIcon, HomeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

interface PublicPropertyDetailsProps {
  property: Property
}

export default function PublicPropertyDetails({ property }: PublicPropertyDetailsProps) {
  if (!property) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Property Header */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-2xl font-semibold leading-6 text-gray-900">
          {property.address}
        </h3>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
          <p>{property.city}, {property.state} {property.zipCode}</p>
        </div>
      </div>

      {/* Property Details */}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-900">
              Price: ${property.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center">
            <HomeIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-900">
              {property.propertyType}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-900">
              {property.bedrooms} beds • {property.bathrooms} baths
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-900">
              {property.squareFeet?.toLocaleString()} sq ft
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-900">
              Built in {property.yearBuilt}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-900">
              Status: {property.status}
            </span>
          </div>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Description</h4>
            <p className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
              {property.description}
            </p>
          </div>
        )}

        {/* Notes */}
        {property.notes && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900">Additional Notes</h4>
            <p className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">
              {property.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
