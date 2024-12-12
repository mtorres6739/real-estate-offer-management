'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  UserIcon, 
  Cog6ToothIcon, 
  ChartBarIcon,
  ChevronLeftIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/auth/contexts/AuthContext';
import { classNames } from '@/lib/utils/class-names';

const mainNavigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: HomeIcon
  },
  { 
    name: 'Properties', 
    href: '/dashboard/properties', 
    icon: BuildingOfficeIcon,
    notifications: 3
  },
  { 
    name: 'Offers', 
    href: '/dashboard/offers', 
    icon: DocumentTextIcon,
    notifications: 2
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: ChartBarIcon
  },
  { 
    name: 'Trash', 
    href: '/dashboard/trash', 
    icon: TrashIcon
  }
];

const userNavigation = [
  { 
    name: 'Profile', 
    href: '/dashboard/profile', 
    icon: UserIcon
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Cog6ToothIcon
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      className={classNames(
        "flex flex-col h-full bg-white border-r border-gray-200",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center justify-center w-10 h-10">
            <BuildingOfficeIcon className="w-8 h-8 text-gray-700" />
          </div>
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-gray-900">
              Real Estate
            </h2>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-600"
        >
          <ChevronLeftIcon className={classNames(
            "w-5 h-5 transition-transform duration-200",
            isCollapsed ? "rotate-180" : ""
          )} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4">
        <div className="px-3 space-y-1">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                'group relative flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200',
                isActive(pathname, item.href)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={classNames(
                  'w-6 h-6 transition-colors duration-200',
                  isActive(pathname, item.href) ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                )}
              />
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium">
                    {item.name}
                  </span>
                  {item.notifications && (
                    <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900">
                      {item.notifications}
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Menu */}
      <div className="relative border-t border-gray-200" ref={userMenuRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={classNames(
            'w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors duration-200',
            isUserMenuOpen ? 'bg-gray-50' : ''
          )}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
            <UserIcon className="w-5 h-5 text-gray-600" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 flex items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                  {user?.email}
                </span>
                <span className="text-xs text-gray-500">Professional</span>
              </div>
              <ChevronUpIcon className={classNames(
                "w-5 h-5 text-gray-400 transition-transform duration-200",
                isUserMenuOpen ? '' : 'rotate-180'
              )} />
            </div>
          )}
        </button>

        {/* Dropdown Menu */}
        {isUserMenuOpen && !isCollapsed && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            {userNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                <span>{item.name}</span>
              </Link>
            ))}
            <button
              onClick={() => {
                setIsUserMenuOpen(false);
                signOut();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-400" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') {
    return pathname === href;
  }
  return pathname.startsWith(href);
}
