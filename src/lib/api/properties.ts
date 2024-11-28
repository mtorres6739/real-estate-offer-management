import { useSupabase } from '@/lib/hooks/useSupabase'

export interface Property {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  address: string
  city: string
  state: string
  zip_code: string
  price: number
  bedrooms?: number
  bathrooms?: number
  square_feet?: number
  year_built?: number
  property_type?: string
  status: string
  description?: string
  notes?: string
}

export interface CreatePropertyData {
  address: string
  city: string
  state: string
  zipCode: string
  price: string
  bedrooms?: string
  bathrooms?: string
  squareFeet?: string
  yearBuilt?: string
  propertyType?: string
  description?: string
  notes?: string
}

export function useProperties() {
  const supabase = useSupabase()

  const createProperty = async (data: CreatePropertyData): Promise<Property> => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    console.log('Session data:', session)
    console.log('Session error:', sessionError)

    if (sessionError || !session?.user) {
      throw new Error('User not authenticated')
    }

    const { data: property, error } = await supabase
      .from('properties')
      .insert([
        {
          user_id: session.user.id,
          address: data.address,
          city: data.city,
          state: data.state,
          zip_code: data.zipCode,
          price: parseFloat(data.price),
          bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
          bathrooms: data.bathrooms ? parseFloat(data.bathrooms) : null,
          square_feet: data.squareFeet ? parseInt(data.squareFeet) : null,
          year_built: data.yearBuilt ? parseInt(data.yearBuilt) : null,
          property_type: data.propertyType || null,
          description: data.description || null,
          notes: data.notes || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return property
  }

  const getProperties = async (): Promise<Property[]> => {
    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return properties
  }

  const getProperty = async (id: string): Promise<Property> => {
    const { data: property, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching property:', error)
      throw error
    }

    return property
  }

  const updateProperty = async (id: string, data: Partial<Property>): Promise<Property> => {
    const { data: property, error } = await supabase
      .from('properties')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating property:', error)
      throw error
    }

    return property
  }

  const deleteProperty = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting property:', error)
      throw error
    }
  }

  return {
    createProperty,
    getProperties,
    getProperty,
    updateProperty,
    deleteProperty,
  }
}
