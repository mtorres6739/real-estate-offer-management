'use client';

import { Property } from '@/types/properties'
import { MapPinIcon, HomeIcon, CurrencyDollarIcon, UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PublicPropertyDetailsProps {
  property: Property
}

export default function PublicPropertyDetails({ property }: PublicPropertyDetailsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams?.get('offer') === 'submitted') {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!property) {
    return null;
  }

  console.log('Property data:', {
    squareFeet: property.square_feet,
    yearBuilt: property.year_built,
    squareFeetType: typeof property.square_feet,
    yearBuiltType: typeof property.year_built
  });

  const handleSubmitOffer = () => {
    router.push(`/properties/${property.id}/submit-offer`);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      {showSuccess && (
        <div className="bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Your offer has been submitted successfully! The agent will contact you soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-72 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60">
          <h3 className="text-3xl font-bold text-white mb-2">
            {property.address}
          </h3>
          <div className="flex items-center text-white/90">
            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0" />
            <p className="text-lg">{property.city}, {property.state} {property.zipCode}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            ${property.price?.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">Price</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {property.bedrooms} / {property.bathrooms}
          </div>
          <div className="text-sm text-gray-500">Beds / Baths</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {property.square_feet !== null && property.square_feet !== undefined
              ? Number(property.square_feet).toLocaleString()
              : 'N/A'}
          </div>
          <div className="text-sm text-gray-500">Square Feet</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {property.year_built !== null && property.year_built !== undefined
              ? Number(property.year_built)
              : 'N/A'}
          </div>
          <div className="text-sm text-gray-500">Year Built</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Property Type & Status */}
        <div className="flex items-center gap-4 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <HomeIcon className="h-4 w-4 mr-1" />
            {property.propertyType}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {property.status}
          </span>
        </div>

        {/* Description */}
        {property.description && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">About This Property</h4>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {property.description}
            </p>
          </div>
        )}

        {/* Notes */}
        {property.notes && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes</h4>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {property.notes}
            </p>
          </div>
        )}

        {/* Agent Information */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Listing Agent</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {property.agentName && (
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <UserIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Agent</div>
                  <div className="text-gray-900">{property.agentName}</div>
                </div>
              </div>
            )}
            {property.agentEmail && (
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a href={`mailto:${property.agentEmail}`} className="text-blue-600 hover:text-blue-800">
                    {property.agentEmail}
                  </a>
                </div>
              </div>
            )}
            {property.agentPhone && (
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <PhoneIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <a href={`tel:${property.agentPhone}`} className="text-blue-600 hover:text-blue-800">
                    {property.agentPhone}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmitOffer}
            className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>Submit an Offer</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
