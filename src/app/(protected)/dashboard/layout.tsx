'use client';

import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Get the title based on the current route
  const getTitle = () => {
    if (pathname === '/dashboard') return undefined; // Welcome message for dashboard
    if (pathname.includes('/properties')) return 'Properties';
    if (pathname.includes('/offers')) return 'Offers';
    if (pathname.includes('/analytics')) return 'Analytics';
    if (pathname.includes('/trash')) return 'Trash';
    return undefined;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={pathname === '/dashboard' ? undefined : pathname.split('/').pop()?.charAt(0).toUpperCase() + pathname.split('/').pop()?.slice(1)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
