'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import { getUserProfile } from '@/lib/api/user';
import { UserRole } from '@/types/user';
import { getDashboardStatsClient } from '@/lib/database/contracts-client';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  DocumentTextIcon,
  PlusIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  BellIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { RoleIcon } from '@/components/RoleIcon';
import { classNames } from '@/lib/utils/class-names';
import { UserIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon, FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [stats, setStats] = useState({
    activeProperties: 0,
    pendingOffers: 0,
    totalValue: 0,
    recentOffers: [] as any[],
    recentProperties: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadUserProfile();
    fetchStats();
  }, [user, router]);

  const loadUserProfile = async () => {
    if (user) {
      try {
        const profile = await getUserProfile(user.id);
        setUserName(profile.name || user.email || '');
        if (user.email === 'torres.mathew@gmail.com') {
          setUserRole(UserRole.SUPER_ADMIN);
        } else {
          setUserRole(profile.role || null);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        setUserName(user.email || '');
        setUserRole(null);
      }
    }
  };

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return 'Super Admin';
      case UserRole.ADMIN:
        return 'Admin';
      case UserRole.BROKER:
        return 'Broker';
      case UserRole.AGENT:
        return 'Agent';
      case UserRole.CLIENT:
        return 'Client';
      default:
        return 'User';
    }
  };

  const fetchStats = async () => {
    if (user) {
      try {
        setError(null);
        const dashboardStats = await getDashboardStatsClient();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setError('Failed to load dashboard data. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const statCards = [
    { 
      name: 'Active Properties', 
      stat: stats.activeProperties.toString(), 
      icon: BuildingOfficeIcon,
      href: '/dashboard/properties?status=active',
      trend: '+2 this month',
      color: 'bg-blue-500'
    },
    { 
      name: 'Pending Offers', 
      stat: stats.pendingOffers.toString(), 
      icon: DocumentTextIcon,
      href: '/my-offers?status=pending',
      trend: '+5 this week',
      color: 'bg-yellow-500'
    },
    { 
      name: 'Total Value', 
      stat: formatCurrency(stats.totalValue), 
      icon: CurrencyDollarIcon,
      href: '/dashboard/properties',
      trend: '+12% from last month',
      color: 'bg-green-500'
    },
    { 
      name: 'Avg. Response Time', 
      stat: '24h', 
      icon: ClockIcon,
      href: '/dashboard/analytics',
      trend: '-2h from last week',
      color: 'bg-purple-500'
    },
  ];

  const quickActions = [
    { name: 'Add Property', icon: PlusIcon, href: '/dashboard/properties/add' },
    { name: 'View Analytics', icon: ChartBarIcon, href: '/dashboard/analytics' },
    { name: 'View Properties', icon: BuildingOfficeIcon, href: '/dashboard/properties' },
    { name: 'View Trends', icon: ArrowTrendingUpIcon, href: '/dashboard/trends' },
  ];

  const notifications = [
    { id: 1, title: 'New offer received', message: 'You have a new offer for 123 Main St', time: '5m ago' },
    { id: 2, title: 'Property status updated', message: '456 Oak Ave is now marked as Pending', time: '1h ago' },
    { id: 3, title: 'Offer accepted', message: 'Your offer for 789 Pine St was accepted', time: '2h ago' },
  ];

  return (
    <div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties, offers, or documents..."
              className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <FunnelIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              Filters
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-lg bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <ArrowsUpDownIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
              Sort
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, index) => (
            <Link
              key={card.name}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.name}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-gray-900">
                    {card.stat}
                  </p>
                  {card.trend && (
                    <p className="mt-2 text-sm text-gray-600">{card.trend}</p>
                  )}
                </div>
                <div className={classNames(
                  'rounded-xl p-3 transition-all duration-300 group-hover:scale-110',
                  card.color.replace('bg-', 'bg-opacity-10 ')
                )}>
                  <card.icon className={classNames(
                    'h-6 w-6',
                    card.color.replace('bg-', 'text-')
                  )} />
                </div>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-current to-transparent opacity-[0.03] rounded-full transform rotate-12 group-hover:scale-150 transition-transform duration-700" />
            </Link>
          ))}
        </div>

        {/* Quick Actions with Enhanced Modern Design */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            // Special handling for Add Property action
            if (action.name === 'Add Property') {
              return (
                <Link
                  key={action.name}
                  href="/dashboard/properties/add"
                  className="group relative overflow-hidden flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="rounded-lg bg-gradient-to-br from-gray-50/50 to-gray-100/50 p-2 group-hover:from-gray-100 group-hover:to-gray-200 transition-colors duration-300">
                    <action.icon className="h-5 w-5 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {action.name}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Link>
              );
            }
            return (
              <Link
                key={action.name}
                href={action.href}
                className="group relative overflow-hidden flex items-center gap-3 rounded-xl bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="rounded-lg bg-gradient-to-br from-gray-50/50 to-gray-100/50 p-2 group-hover:from-gray-100 group-hover:to-gray-200 transition-colors duration-300">
                  <action.icon className="h-5 w-5 text-gray-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                  {action.name}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Link>
            );
          })}
        </div>

        {/* Recent Activity Sections with Enhanced Design */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {/* Recent Offers */}
          <div className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Offers</h2>
              </div>
              <Link href="/dashboard/offers" className="text-sm text-blue-600 hover:text-blue-800">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentOffers.length > 0 ? (
                stats.recentOffers.map((offer: any, index: number) => (
                  <Link
                    key={offer.id}
                    href={`/my-offers/${offer.id}`}
                    className="block hover:bg-gray-50 p-2 rounded-md transition-colors duration-200 relative"
                  >
                    {index !== stats.recentOffers.length - 1 && (
                      <div className="absolute left-4 bottom-0 w-0.5 h-4 bg-gray-100" />
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {offer.properties?.address || 'Unknown Property'}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">
                            {formatCurrency(offer.amount)}
                          </p>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            offer.status?.toLowerCase() === 'accepted' ? 'bg-green-50 text-green-700' :
                            offer.status?.toLowerCase() === 'rejected' ? 'bg-red-50 text-red-700' :
                            offer.status?.toLowerCase() === 'withdrawn' ? 'bg-gray-50 text-gray-700' :
                            offer.status?.toLowerCase() === 'submitted' ? 'bg-blue-50 text-blue-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}>
                            {offer.status ? offer.status.charAt(0).toUpperCase() + offer.status.slice(1).toLowerCase() : 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(offer.created_at)}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-500">No recent offers</p>
              )}
            </div>
          </div>

          {/* Recent Properties */}
          <div className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
              </div>
              <Link href="/dashboard/properties" className="text-sm text-blue-600 hover:text-blue-800">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentProperties.length > 0 ? (
                stats.recentProperties.map((property: any, index: number) => (
                  <Link
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="block hover:bg-gray-50 p-2 rounded-md transition-colors duration-200 relative"
                  >
                    {index !== stats.recentProperties.length - 1 && (
                      <div className="absolute left-4 bottom-0 w-0.5 h-4 bg-gray-100" />
                    )}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {property.address}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">
                            {formatCurrency(property.price)}
                          </p>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            property.status === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                            property.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                            'bg-gray-50 text-gray-700'
                          }`}>
                            {property.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(property.created_at)}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-gray-500">No recent properties</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
