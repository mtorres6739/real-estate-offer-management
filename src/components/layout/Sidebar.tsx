'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, BuildingOfficeIcon, DocumentTextIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import LogoutButton from '@/components/ui/LogoutButton';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Properties', href: '/dashboard/properties', icon: BuildingOfficeIcon },
  { name: 'Offers', href: '/dashboard/offers', icon: DocumentTextIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64">
      <div className="flex-1">
        <div className="px-4 py-5">
          <h2 className="text-lg font-semibold">Real Estate Manager</h2>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  } mr-3 flex-shrink-0 h-6 w-6`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700">
        <LogoutButton />
      </div>
    </div>
  );
}
