import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import PublicPropertyDetails from './PublicPropertyDetails'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PublicPropertyPage({ params }: PageProps) {
  // Await the params
  const resolvedParams = await params
  
  if (!resolvedParams?.id) {
    notFound()
  }

  try {
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', resolvedParams.id)
      .single()

    if (error) {
      console.error('Error fetching property:', error)
      notFound()
    }

    if (!property) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PublicPropertyDetails property={property} />
          </div>
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
}
