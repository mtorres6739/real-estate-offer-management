'use client';

import { createContext, useContext, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { AuthProvider } from '@/lib/auth/contexts/AuthContext';

type SupabaseContext = {
  supabase: ReturnType<typeof createClientComponentClient<Database>>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClientComponentClient<Database>());

  return (
    <Context.Provider value={{ supabase }}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
};
