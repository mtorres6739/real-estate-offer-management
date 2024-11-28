export interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  description: string;
  images: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
  status: 'available' | 'under_contract' | 'sold';
}

export interface Offer {
  id: string;
  property_id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  message?: string;
  created_at: string;
  updated_at: string;
  expires_at?: string;
  conditions?: string[];
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'buyer' | 'seller' | 'agent' | 'admin';
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilter {
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minSquareFeet?: number;
  status?: Property['status'];
}
