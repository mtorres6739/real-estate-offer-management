'use client';

import { useEffect, useState } from 'react';
import { Offer } from '@/types/offers';
import OffersList from './OffersList';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data: offersData, error: offersError } = await supabase
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

        if (offersError) {
          throw offersError;
        }

        // Transform the data to include property address
        const transformedOffers = offersData.map(offer => ({
          ...offer,
          property_address: offer.properties
            ? `${offer.properties.address}, ${offer.properties.city}, ${offer.properties.state} ${offer.properties.zip_code}`
            : 'Unknown Property',
          properties: undefined // Remove the properties object from the response
        }));

        setOffers(transformedOffers);
      } catch (err) {
        console.error('Error fetching offers:', err);
        setError(err instanceof Error ? err.message : 'Failed to load offers');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOffers();
  }, [supabase]);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Offers</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all property offers, both sent and received.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      ) : error ? (
        <div className="mt-8 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      ) : (
        <OffersList offers={offers} />
      )}
    </div>
  );
}
