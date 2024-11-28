import { Toaster } from 'react-hot-toast';
import SupabaseProvider from './supabase-provider';
import { AuthProvider } from '@/lib/auth/contexts/AuthContext';
import '@/styles/globals.css';

export const metadata = {
  title: 'Real Estate Offer Management',
  description: 'Manage and track real estate offers efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <SupabaseProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SupabaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
