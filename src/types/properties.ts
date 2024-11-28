export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  year_built: number;
  status: string;
  description?: string;
  notes?: string;
  agent_id: string;
  agent_name?: string;
  agent_email?: string;
  agent_phone?: string;
  created_at: string;
  updated_at: string;
}
