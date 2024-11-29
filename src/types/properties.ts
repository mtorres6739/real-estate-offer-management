export interface Property {
  id: string
  created_at: string
  updated_at: string
  user_id: string
  address: string
  price: number
  description?: string
  status: 'Active' | 'Pending' | 'Sold' | 'Inactive'
  bedrooms?: number
  bathrooms?: number
  square_feet?: number
  year_built?: number
  property_type?: string
  notes?: string
  city: string
  state: string
  zip_code: string
  latitude?: number
  longitude?: number
  attom_id?: string
  street_number?: string
  street_name?: string
}

export interface PropertyFormData {
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
  description?: string
  notes?: string
  latitude?: number
  longitude?: number
  attom_id?: string
  street_number?: string
  street_name?: string
  status?: 'Active' | 'Pending' | 'Sold' | 'Inactive'
}
