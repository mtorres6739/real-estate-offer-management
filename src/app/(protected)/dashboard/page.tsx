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
        setUserRole(profile.role || UserRole.CLIENT);
      } catch (error) {
        console.error('Error loading user profile:', error);
        setUserName(user.email || '');
        setUserRole(UserRole.CLIENT);
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
    { name: 'Add Property', icon: PlusIcon, href: '/dashboard/property/new' },
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
    <div className="space-y-8">
      {/* Top Bar with Notifications */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, {userName}
            </h1>
            <span className="text-sm text-gray-500">{getRoleName(userRole || UserRole.CLIENT)} Dashboard</span>
            <p className="mt-1 text-sm text-gray-600">Here's what's happening with your properties today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <BellIcon className="h-6 w-6 text-gray-400" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="px-4 py-2 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-500">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <dt>
              <div className={`absolute ${item.color} rounded-md p-3`}>
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex flex-col sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p className="text-sm text-gray-500 mt-1">{item.trend}</p>
            </dd>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-200 flex items-center space-x-3"
          >
            <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white`}>
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{action.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Recent Offers */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
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
              stats.recentOffers.map((offer: any) => (
                <Link
                  key={offer.id}
                  href={`/my-offers/${offer.id}`}
                  className="block hover:bg-gray-50 p-2 rounded-md"
                >
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
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
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
              stats.recentProperties.map((property: any) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="block hover:bg-gray-50 p-2 rounded-md"
                >
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
  );
}
