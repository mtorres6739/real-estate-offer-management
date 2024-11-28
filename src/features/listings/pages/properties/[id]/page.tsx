'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface Property {
  id: string;
  created_at: string;
  address: string;
  price: number;
  description: string;
  status: 'available' | 'pending' | 'sold';
  user_id: string;
  user: {
    email: string;
    full_name: string;
  };
}

export default function PropertyPage() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchProperty() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select(`
            *,
            user:profiles(email, full_name)
          `)
          .eq('id', params.id)
          .single();

        if (error) {
          throw error;
        }

        setProperty(data);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [supabase, params.id]);

  const handleSubmitOffer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const formData = new FormData(e.currentTarget);
      const amount = parseFloat(formData.get('amount') as string);

      const { error } = await supabase
        .from('offers')
        .insert({
          property_id: property?.id,
          user_id: session.user.id,
          amount,
          status: 'pending',
        });

      if (error) {
        throw error;
      }

      toast.success('Offer submitted successfully');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit offer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
          <div className="mt-6 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">Property not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-6 sm:px-6">
            <h3 className="text-2xl font-semibold leading-7 text-gray-900">
              {property.address}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-gray-500">
              Listed by {property.user.full_name || property.user.email}
            </p>
          </div>
          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Price</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  ${property.price.toLocaleString()}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Status</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    property.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : property.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Description</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {property.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {property.status === 'available' && (
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Make an Offer
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>Submit your offer for this property.</p>
                </div>
                <form className="mt-5 sm:flex sm:items-center" onSubmit={handleSubmitOffer}>
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="amount" className="sr-only">
                      Amount
                    </label>
                    <div className="relative mt-2 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        required
                        min="0"
                        step="1000"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Offer'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
