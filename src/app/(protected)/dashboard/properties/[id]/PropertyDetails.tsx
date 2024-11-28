'use client';

import { useState } from 'react';
import { Property, useProperties } from '@/lib/api/properties';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils/format';
import EditPropertyModal from '@/components/properties/EditPropertyModal';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property: initialProperty }: PropertyDetailsProps) {
  const [property, setProperty] = useState<Property>(initialProperty);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();
  const { updateProperty, deleteProperty } = useProperties();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProperty(property.id);
      toast.success('Property deleted successfully');
      router.replace('/dashboard/properties');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (updatedData: Partial<Property>) => {
    try {
      setIsLoading(true);
      const updated = await updateProperty(property.id, updatedData);
      setProperty(updated);
      setIsEditModalOpen(false);
      toast.success('Property updated successfully');
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">{error}</h3>
          <button
            onClick={() => router.replace('/dashboard/properties')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Property Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {property.address}
            </p>
          </div>
          <div className="space-x-3">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {property.address}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {property.city}, {property.state} {property.zip_code}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatCurrency(property.price)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 sm:mt-0 sm:col-span-2">
                <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 capitalize" style={{
                  backgroundColor: property.status === 'active' ? 'rgb(209, 250, 229)' : 
                                 property.status === 'pending' ? 'rgb(254, 243, 199)' :
                                 property.status === 'sold' ? 'rgb(254, 226, 226)' : 'rgb(229, 231, 235)',
                  color: property.status === 'active' ? 'rgb(6, 95, 70)' :
                         property.status === 'pending' ? 'rgb(146, 64, 14)' :
                         property.status === 'sold' ? 'rgb(153, 27, 27)' : 'rgb(55, 65, 81)'
                }}>
                  {property.status}
                </span>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Property Details</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Bedrooms:</span> {property.bedrooms || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Bathrooms:</span> {property.bathrooms || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Square Feet:</span> {property.square_feet || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Year Built:</span> {property.year_built || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Property Type:</span> {property.property_type || 'N/A'}
                  </div>
                </div>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {property.description || 'No description available'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {property.notes || 'No notes available'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <EditPropertyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        property={property}
      />
    </div>
  );
}
