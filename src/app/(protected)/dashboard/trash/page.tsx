'use client';

import { useEffect, useState } from 'react'
import { Property, useProperties } from '@/lib/api/properties'
import { Offer, useOffers } from '@/lib/api/offers'
import { formatDate } from '@/lib/utils/date'
import { ArrowPathIcon, HomeIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import { DeletedItem } from '@/types/trash'
import { useRouter } from 'next/navigation'

export default function TrashPage() {
  const router = useRouter()
  const [deletedItems, setDeletedItems] = useState<DeletedItem[]>([])
  const [loading, setLoading] = useState(true)
  const { getDeletedProperties, restoreProperty } = useProperties()
  const { getDeletedOffers, restoreOffer } = useOffers()

  const fetchDeletedItems = async () => {
    try {
      const [properties, offers] = await Promise.all([
        getDeletedProperties(),
        getDeletedOffers()
      ])

      const items: DeletedItem[] = [
        ...properties.map(p => ({ type: 'property' as const, item: p, deleted_at: p.deleted_at! })),
        ...offers.map(o => ({ type: 'offer' as const, item: o, deleted_at: o.deleted_at! }))
      ].sort((a, b) => new Date(b.deleted_at).getTime() - new Date(a.deleted_at).getTime())

      setDeletedItems(items)
    } catch (error) {
      console.error('Error fetching deleted items:', error)
      toast.error('Failed to load deleted items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeletedItems()
  }, [])

  const handleRestore = async (item: DeletedItem) => {
    try {
      if (item.type === 'property') {
        await restoreProperty(item.item.id)
        toast.success('Property restored successfully')
      } else {
        await restoreOffer(item.item.id)
        toast.success('Offer restored successfully')
      }
      // Refresh the list
      fetchDeletedItems()
    } catch (error) {
      console.error('Error restoring item:', error)
      toast.error(`Failed to restore ${item.type}`)
    }
  }

  const handleRowClick = (item: DeletedItem) => {
    const path = item.type === 'property' 
      ? `/dashboard/properties/${item.item.id}`
      : `/dashboard/offers/${item.item.id}`;
    router.push(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Trash</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all deleted items that can be restored.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                {deletedItems.length === 0 ? (
                  <div className="min-h-[400px] bg-white flex items-center justify-center text-gray-500">
                    No deleted items found
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Type
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Details
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Deleted At
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {deletedItems.map((item) => (
                        <tr 
                          key={`${item.type}-${item.item.id}`}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleRowClick(item)}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            <div className="flex items-center gap-2">
                              {item.type === 'property' ? (
                                <HomeIcon className="h-5 w-5 text-gray-400" />
                              ) : (
                                <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                              )}
                              <span className="capitalize">{item.type}</span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {item.type === 'property' 
                              ? (item.item as Property).address
                              : `Offer for ${(item.item as Offer).property_address}`}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            ${(item.type === 'property' 
                              ? (item.item as Property).price 
                              : (item.item as Offer).amount).toLocaleString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDate(item.deleted_at)}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRestore(item);
                              }}
                              className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                            >
                              <ArrowPathIcon className="h-4 w-4" />
                              Restore
                            </button>
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
      </div>
    </div>
  )
}
