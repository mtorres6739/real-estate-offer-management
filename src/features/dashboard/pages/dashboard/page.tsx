'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowTrendingUpIcon, BuildingOfficeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface DashboardStats {
  totalProperties: number;
  totalOffers: number;
  activeOffers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    totalOffers: 0,
    activeOffers: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total properties
        const { count: propertiesCount, error: propertiesError } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true });

        // Fetch total offers
        const { count: offersCount, error: offersError } = await supabase
          .from('offers')
          .select('*', { count: 'exact', head: true });

        // Fetch active offers
        const { count: activeOffersCount, error: activeOffersError } = await supabase
          .from('offers')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        if (propertiesError || offersError || activeOffersError) {
          throw new Error('Error fetching stats');
        }

        setStats({
          totalProperties: propertiesCount || 0,
          totalOffers: offersCount || 0,
          activeOffers: activeOffersCount || 0,
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [supabase]);

  const stats_items = [
    {
      name: 'Total Properties',
      value: stats.totalProperties,
      href: '/dashboard/properties',
      icon: BuildingOfficeIcon,
    },
    {
      name: 'Total Offers',
      value: stats.totalOffers,
      href: '/dashboard/offers',
      icon: DocumentTextIcon,
    },
    {
      name: 'Active Offers',
      value: stats.activeOffers,
      href: '/dashboard/offers?status=pending',
      icon: ArrowTrendingUpIcon,
    },
  ];

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="mt-4 h-6 w-1/4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats_items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:shadow-md transition-shadow sm:p-6"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon
                    className="h-8 w-8 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {item.name}
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
