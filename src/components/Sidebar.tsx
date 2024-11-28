'use client';

import { HomeIcon as HIcon, DocumentTextIcon as DIcon, UserGroupIcon as UIcon, XMarkIcon as XIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HIcon },
  { name: 'Properties', href: '/properties', icon: HIcon },
  { name: 'My Offers', href: '/my-offers', icon: DIcon },
  { name: 'Agents', href: '/agents', icon: UIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={classNames(
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
          'fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden'
        )}
        onClick={onClose}
      />

      <div
        className={classNames(
          'fixed top-0 left-0 bottom-0 z-40 flex w-64 flex-col bg-white lg:fixed',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex h-16 shrink-0 items-center border-b border-gray-200 px-6">
          <Link href="/" className="text-xl font-semibold text-indigo-600">
            RealOffers
          </Link>
          <button
            type="button"
            className="ml-auto rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  isActive
                    ? 'bg-gray-50 text-indigo-600'
                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                )}
                onClick={() => onClose()}
              >
                <item.icon
                  className={classNames(
                    isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                    'h-6 w-6 shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
