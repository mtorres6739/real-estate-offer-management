'use client';

import { Offer } from '@/types/offers';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ConfirmActionModal from '@/components/modals/ConfirmActionModal';
import { useOffers } from '@/lib/api/offers';
import { toast } from 'react-hot-toast';

interface OffersListProps {
  offers: Offer[];
}

export default function OffersList({ offers }: OffersListProps) {
  const router = useRouter();
  const [propertyToDelete, setPropertyToDelete] = useState<Offer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteOffer } = useOffers();

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/offers/${id}`);
  };

  const handleDelete = async (offer: Offer, e: React.MouseEvent) => {
    e.stopPropagation();
    setPropertyToDelete(offer);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;
    
    try {
      setIsDeleting(true);
      await deleteOffer(propertyToDelete.id);
      toast.success('Offer deleted successfully');
      setPropertyToDelete(null);
      router.refresh();
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast.error('Failed to delete offer');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            {offers.length === 0 ? (
              <div className="min-h-[400px] bg-white flex items-center justify-center text-gray-500">
                No offers found. Add your first offer to get started.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Buyer
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Property
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Submitted
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {offers.map((offer) => (
                    <tr
                      key={offer.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(offer.id)}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {offer.buyer_names?.join(', ') || offer.name || 'N/A'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {offer.property_address}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${(offer.amount || 0).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatDistanceToNow(new Date(offer.created_at), { addSuffix: true })}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize">
                          {offer.status === 'pending' && (
                            <span className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full">
                              {offer.status}
                            </span>
                          )}
                          {offer.status === 'accepted' && (
                            <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full">
                              {offer.status}
                            </span>
                          )}
                          {offer.status === 'rejected' && (
                            <span className="bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full">
                              {offer.status}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`/dashboard/offers/${offer.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={(e) => handleDelete(offer, e)}
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

      {/* Confirmation Modal */}
      <ConfirmActionModal
        isOpen={!!propertyToDelete}
        onClose={() => setPropertyToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Offer"
        message={`Are you sure you want to delete this offer from ${propertyToDelete?.buyer_names?.join(', ') || propertyToDelete?.name || 'Unknown Buyer'}? This action cannot be undone.`}
        confirmButtonText="Delete"
        confirmButtonColor="red"
        isLoading={isDeleting}
      />
    </div>
  );
}
