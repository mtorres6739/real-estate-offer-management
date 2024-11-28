'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface Property {
  id: string;
  created_at: string;
  address: string;
  price: number;
  description: string;
  status: 'available' | 'pending' | 'sold';
  user_id: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No session');
        }

        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setProperties(data || []);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load properties');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [supabase]);

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
          <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your properties and their current status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/dashboard/properties/new"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="inline-block h-5 w-5 mr-1" />
            Add property
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {properties.length === 0 ? (
              <div className="text-center">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No properties</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new property.
                </p>
                <div className="mt-6">
                  <Link
                    href="/dashboard/properties/new"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Add property
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <div className="min-w-full divide-y divide-gray-300">
                  {properties.map((property) => (
                    <Link
                      key={property.id}
                      href={`/dashboard/properties/${property.id}`}
                      className="block hover:bg-gray-50"
                    >
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="truncate text-sm font-medium text-indigo-600">
                            {property.address}
                          </div>
                          <div className="ml-2 flex flex-shrink-0">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              property.status === 'available'
                                ? 'bg-green-50 text-green-700'
                                : property.status === 'pending'
                                ? 'bg-yellow-50 text-yellow-700'
                                : 'bg-gray-50 text-gray-700'
                            }`}>
                              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <div className="sm:flex">
                            <div className="mr-6 flex items-center text-sm text-gray-500">
                              <span className="truncate">
                                ${property.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            {new Date(property.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
