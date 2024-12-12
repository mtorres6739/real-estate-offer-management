'use client';

import { useAuth } from '@/lib/auth/contexts/AuthContext';
import { BellIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RoleIcon } from '@/components/RoleIcon';
import { UserRole } from '@/types/user';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications: any[] = []; // Replace with actual notifications

  useEffect(() => {
    if (user) {
      console.log('User object:', JSON.stringify(user, null, 2));
    }
  }, [user]);

  const displayName = user?.user_metadata?.name || 
                     user?.app_metadata?.name ||
                     user?.email || 
                     'User';

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {title ? (
          <div className="flex items-center gap-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <span className="text-2xl font-semibold text-gray-900">
              Welcome back, {displayName}
            </span>
            <div className="flex items-center gap-x-2">
              <RoleIcon role={UserRole.SUPER_ADMIN} className="h-5 w-5" />
              <span className="text-sm font-medium text-gray-500">Super Admin</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <Link
          href="/dashboard/properties/add"
          className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <PlusIcon className="h-6 w-6" />
        </Link>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="inline-flex items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <BellIcon className="h-6 w-6" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-[10px] font-medium text-white">
                  {notifications.length}
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
