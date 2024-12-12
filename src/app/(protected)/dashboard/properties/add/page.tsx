'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/lib/api/properties';

export default function AddPropertyPage() {
  const router = useRouter();
  const { createProperty } = useProperties();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      address: formData.get('address') as string,
      price: Number(formData.get('price')),
      bedrooms: Number(formData.get('bedrooms')),
      bathrooms: Number(formData.get('bathrooms')),
      squareFeet: Number(formData.get('squareFeet')),
      description: formData.get('description') as string,
      status: 'ACTIVE'
    };

    try {
      await createProperty(data);
      router.push('/dashboard/properties');
      router.refresh();
    } catch (err) {
      console.error('Error creating property:', err);
      setError('Failed to create property. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Add New Property
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Property Address
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="address"
              id="address"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="price"
                id="price"
                required
                min="0"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="500000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700">
              Square Feet
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="squareFeet"
                id="squareFeet"
                required
                min="0"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="2000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                required
                min="0"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="3"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                required
                min="0"
                step="0.5"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="2.5"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Describe the property..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isSubmitting ? 'Adding...' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
}
