import { Suspense } from 'react';
import PropertyDetails from './PropertyDetails';
import LoadingSpinner from '@/components/LoadingSpinner';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/database.types';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

interface Props {
  params: {
    id: string;
  };
}

async function getProperty(id: string) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching property:', error);
    return null;
  }

  return data;
}

export default async function PropertyDetailsPage({ params }: Props) {
  const id = await Promise.resolve(params.id);
  const propertyData = await getProperty(id);

  if (!propertyData) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PropertyDetails property={propertyData} />
    </Suspense>
  );
}