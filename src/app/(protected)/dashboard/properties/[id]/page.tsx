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
  params: Promise<{
    id: string;
  }>;
}

async function getProperty(cookieStore: ReturnType<typeof cookies>, id: string) {
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  
  try {
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
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export default async function PropertyDetailsPage({ params }: Props) {
  // Await both the params and cookieStore
  const [resolvedParams, cookieStore] = await Promise.all([
    params,
    cookies()
  ]);

  if (!resolvedParams?.id) {
    notFound();
  }

  const propertyData = await getProperty(cookieStore, resolvedParams.id);

  if (!propertyData) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PropertyDetails property={propertyData} />
    </Suspense>
  );
}