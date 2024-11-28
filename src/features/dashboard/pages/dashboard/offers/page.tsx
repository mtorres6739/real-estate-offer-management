'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Offer {
  id: string;
  created_at: string;
  property_id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected';
  property: {
    address: string;
  };
  user: {
    email: string;
  };
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get('status');
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchOffers() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No session');
        }

        let query = supabase
          .from('offers')
          .select(`
            *,
            property:properties(address),
            user:profiles(email)
          `)
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (statusFilter) {
          query = query.eq('status', statusFilter);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setOffers(data || []);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load offers');
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, [supabase, statusFilter]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="sm:flex sm:items-center">
          <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <div className="min-w-full divide-y divide-gray-300">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white px-4 py-5 sm:px-6">
                      <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                      <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Offers</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all offers you've made on properties.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {offers.length === 0 ? (
              <div className="text-center">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No offers</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {statusFilter
                    ? `No ${statusFilter} offers found.`
                    : "You haven't made any offers yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Property
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {offers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {offer.property.address}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${offer.amount.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            offer.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : offer.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(offer.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
