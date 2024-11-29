export interface Offer {
  id: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  property_id: string;
  property_address?: string;
  amount: number;
  status: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface CreateOfferInput {
  property_id: string;
  amount: number;
  name?: string;
  email?: string;
  phone?: string;
}
