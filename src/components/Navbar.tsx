'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutButton from './SignOutButton';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold">Real Estate Offers</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/dashboard/properties"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard/properties')}`}
                >
                  Properties
                </Link>
                <Link
                  href="/dashboard/trash"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard/trash')}`}
                >
                  Trash
                </Link>
                <Link
                  href="/settings"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/settings')}`}
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
