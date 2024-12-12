'use client';

import { useEffect, useState } from 'react';
import { Property, useProperties } from '@/lib/api/properties';
import { use } from 'react';

export default function PublicPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getProperty } = useProperties();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getProperty(resolvedParams.id);
        setProperty(data);
      } catch (err) {
        setError('Failed to load property');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [resolvedParams.id, getProperty]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!property) return <div className="p-4">Property not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
        {/* Property Image */}
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Property Image Coming Soon</span>
        </div>

        {/* Property Details */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.address}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h2>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{property.address}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{property.city}, {property.state}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Price</dt>
                  <dd className="mt-1 text-sm text-gray-900">${property.price.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize bg-green-100 text-green-800">
                      {property.status.toLowerCase()}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-sm text-gray-500 mb-4">
                  Interested in this property? Get in touch with us to schedule a viewing or make an offer.
                </p>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Contact Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
