import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Offer } from '@/types/offers'
import { Database } from '@/types/supabase'

export function useOffers() {
  const supabase = createClientComponentClient<Database>()

  const getOffers = async () => {
    const { data: offersData, error } = await supabase
      .from('offers')
      .select(`
        *,
        properties (
          address,
          city,
          state,
          zip_code
        )
      `)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
    
    if (error) throw error

    console.log('Raw offers data:', offersData); // Debug log

    // Transform the data to include property address
    const offers = offersData.map(offer => ({
      ...offer,
      property_address: offer.properties
        ? `${offer.properties.address}, ${offer.properties.city}, ${offer.properties.state} ${offer.properties.zip_code}`
        : 'Unknown Property',
      properties: undefined // Remove the properties object from the response
    }))

    console.log('Transformed offers:', offers); // Debug log

    return offers as Offer[]
  }

  const getDeletedOffers = async () => {
    const { data: offersData, error } = await supabase
      .from('offers')
      .select(`
        *,
        properties (
          address,
          city,
          state,
          zip_code
        )
      `)
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false })
    
    if (error) throw error

    // Transform the data to include property address
    const offers = offersData.map(offer => ({
      ...offer,
      property_address: offer.properties
        ? `${offer.properties.address}, ${offer.properties.city}, ${offer.properties.state} ${offer.properties.zip_code}`
        : 'Unknown Property',
      properties: undefined // Remove the properties object from the response
    }))

    return offers as Offer[]
  }

  const deleteOffer = async (id: string) => {
    const { error } = await supabase
      .from('offers')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) throw error
  }

  const restoreOffer = async (id: string) => {
    const { error } = await supabase
      .from('offers')
      .update({ deleted_at: null })
      .eq('id', id)
    
    if (error) throw error
  }

  return {
    getOffers,
    getDeletedOffers,
    deleteOffer,
    restoreOffer,
  }
}
