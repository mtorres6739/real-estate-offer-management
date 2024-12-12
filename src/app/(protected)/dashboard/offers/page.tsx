'use client';

import { useEffect, useState } from 'react';
import { Offer } from '@/types/offers';
import OffersList from './OffersList';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useOffers } from '@/lib/api/offers';

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getOffers } = useOffers();

  useEffect(() => {
    fetchOffers();
  }, []);

  async function fetchOffers() {
    try {
      const offersData = await getOffers();
      setOffers(offersData);
    } catch (err) {
      console.error('Error fetching offers:', err);
      setError(err instanceof Error ? err.message : 'Failed to load offers');
    } finally {
      setIsLoading(false);
    }
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all offers received for your properties including buyer details, amount, and status.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              href="/dashboard/offers/add"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Add offer
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-6 text-center text-gray-500">Loading offers...</div>
        ) : (
          <OffersList offers={offers} />
        )}
      </div>
    </div>
  );
}
