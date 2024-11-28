'use client';

import { useState, useEffect } from 'react'
import AddPropertyModal from '@/components/properties/AddPropertyModal'
import { CreatePropertyData, Property, useProperties } from '@/lib/api/properties'
import { formatCurrency } from '@/lib/utils/format'

export default function PropertiesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const { createProperty, getProperties } = useProperties()

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = async () => {
    try {
      const properties = await getProperties()
      setProperties(properties)
    } catch (error) {
      console.error('Error loading properties:', error)
    }
  }

  const handleAddProperty = async (data: CreatePropertyData) => {
    try {
      await createProperty(data)
      await loadProperties() // Refresh the list after adding
      setIsAddModalOpen(false) // Close the modal
    } catch (error) {
      console.error('Error in handleAddProperty:', error)
      throw error // Let the modal handle the error display
    }
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Properties</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all your properties including their address, status, and value.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add property
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
              {properties.length === 0 ? (
                <div className="min-h-[400px] bg-white flex items-center justify-center text-gray-500">
                  No properties found. Add your first property to get started.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Address
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        City
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        State
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {properties.map((property) => (
                      <tr key={property.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {property.address}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{property.city}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{property.state}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {formatCurrency(property.price)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {property.status}
                          </span>
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

      <AddPropertyModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProperty}
      />
    </div>
  )
}
