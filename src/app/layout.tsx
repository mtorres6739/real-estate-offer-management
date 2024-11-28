import { Toaster } from 'react-hot-toast';
import SupabaseProvider from '@/lib/auth/supabase-provider';
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
    <html lang="en">
      <body>
        <SupabaseProvider>
          {children}
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  );
}
