'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Property, useProperties } from '@/lib/api/properties';
import { use } from 'react';

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { getProperty, updateProperty } = useProperties();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!property) return;

    try {
      await updateProperty(property.id, property);
      router.push('/dashboard/properties');
    } catch (err) {
      setError('Failed to update property');
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!property) return <div className="p-4">Property not found</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Edit Property
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-8">
        <div className="space-y-1.5">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={property.address}
            onChange={(e) => setProperty({ ...property, address: e.target.value })}
            className="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={property.city}
              onChange={(e) => setProperty({ ...property, city: e.target.value })}
              className="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={property.state}
              onChange={(e) => setProperty({ ...property, state: e.target.value })}
              className="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
            Price
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="price"
              id="price"
              value={property.price}
              onChange={(e) => setProperty({ ...property, price: Number(e.target.value) })}
              className="block w-full rounded-md border-0 py-2 pl-7 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={property.status}
            onChange={(e) => setProperty({ ...property, status: e.target.value })}
            className="mt-2 block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SOLD">Sold</option>
          </select>
        </div>

        <div className="flex gap-3 justify-end pt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
