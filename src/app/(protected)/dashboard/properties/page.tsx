'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Property, useProperties } from '@/lib/api/properties'
import { formatCurrency } from '@/lib/utils/format'
import Link from 'next/link'
import { PencilSquareIcon, TrashIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import ConfirmActionModal from '@/components/modals/ConfirmActionModal'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { getProperties, deleteProperty } = useProperties()
  const router = useRouter()

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    const data = await getProperties()
    setProperties(data || [])
  }

  const handleDelete = async (property: Property, e: React.MouseEvent) => {
    e.stopPropagation()
    setPropertyToDelete(property)
  }

  const confirmDelete = async () => {
    if (!propertyToDelete) return
    
    try {
      setIsDeleting(true)
      await deleteProperty(propertyToDelete.id)
      await fetchProperties()
      setPropertyToDelete(null)
    } catch (error) {
      console.error('Error deleting property:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleRowClick = (id: string) => {
    window.location.href = `/dashboard/properties/${id}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <p className="mt-2 text-sm text-gray-700">
              A list of all your properties including their address, status, and value.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link
              href="/dashboard/properties/add"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Add property
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                {properties.length === 0 ? (
                  <div className="min-h-[400px] bg-white flex items-center justify-center text-gray-500">
                    No properties found. Add your first property to get started.
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Address</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">City</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">State</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {properties?.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td 
                            onClick={() => handleRowClick(property.id)}
                            className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 cursor-pointer"
                          >
                            {property.address}
                          </td>
                          <td 
                            onClick={() => handleRowClick(property.id)}
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer"
                          >
                            {property.city}
                          </td>
                          <td 
                            onClick={() => handleRowClick(property.id)}
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer"
                          >
                            {property.state}
                          </td>
                          <td 
                            onClick={() => handleRowClick(property.id)}
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer"
                          >
                            ${property.price.toLocaleString()}
                          </td>
                          <td 
                            onClick={() => handleRowClick(property.id)}
                            className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer"
                          >
                            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize bg-green-100 text-green-800">
                              {property.status.toLowerCase()}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <div className="flex justify-end gap-3">
                              <Link
                                href={`/properties/${property.id}`}
                                className="text-gray-400 hover:text-gray-500"
                                title="View Public Page"
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                                <span className="sr-only">View Public Page</span>
                              </Link>
                              <Link
                                href={`/dashboard/properties/${property.id}/edit`}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <PencilSquareIcon className="h-5 w-5" />
                                <span className="sr-only">Edit</span>
                              </Link>
                              <button
                                onClick={(e) => handleDelete(property, e)}
                                className="text-red-600 hover:text-red-900"
                                title="Delete"
                              >
                                <TrashIcon className="h-5 w-5" />
                                <span className="sr-only">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Confirmation Modal */}
        <ConfirmActionModal
          isOpen={!!propertyToDelete}
          onClose={() => setPropertyToDelete(null)}
          onConfirm={confirmDelete}
          title="Delete Property"
          message={`Are you sure you want to delete "${propertyToDelete?.address}"? This property will be moved to the trash.`}
          confirmButtonText="Delete"
          confirmButtonColor="red"
          isLoading={isDeleting}
        />
      </div>
    </div>
  )
}
