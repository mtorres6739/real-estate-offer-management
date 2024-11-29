'use client';

import { Offer } from '@/types/offers';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import Link from 'next/link';

interface OffersListProps {
  offers: Offer[];
}

interface ColumnDef<T> {
  accessorKey: keyof T;
  header: string;
  cell: ({ row }: { row: { original: T } }) => JSX.Element | string;
}

export default function OffersList({ offers }: OffersListProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Offer;
    direction: 'asc' | 'desc';
  }>({ key: 'created_at', direction: 'desc' });

  const sortedOffers = [...offers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (key: keyof Offer) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  const columns: ColumnDef<Offer>[] = [
    {
      accessorKey: 'buyer_names',
      header: 'Buyer',
      cell: ({ row }) => (
        <Link
          href={`/dashboard/offers/${row.original.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          {row.original.buyer_names?.join(', ') || row.original.name || 'N/A'}
        </Link>
      ),
    },
    {
      accessorKey: 'property_address',
      header: 'Property',
      cell: ({ row }) => row.original.property_address || 'N/A',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => `$${row.original.amount.toLocaleString()}`,
    },
    {
      accessorKey: 'created_at',
      header: 'Submitted',
      cell: ({ row }) =>
        formatDistanceToNow(new Date(row.original.created_at), {
          addSuffix: true,
        }),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
            row.original.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : row.original.status === 'accepted'
              ? 'bg-green-100 text-green-800'
              : row.original.status === 'rejected'
              ? 'bg-red-100 text-red-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.accessorKey}
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedOffers.map((offer) => (
                <tr key={offer.id}>
                  {columns.map((column) => (
                    <td
                      key={column.accessorKey}
                      className="whitespace-nowrap px-4 py-4 text-sm first:pl-6 last:pr-6"
                    >
                      {column.cell({ row: { original: offer } })}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {offers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No offers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
