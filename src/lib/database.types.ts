export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      properties: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          address: string
          city: string
          state: string
          zip_code: string
          price: number
          bedrooms: number | null
          bathrooms: number | null
          square_feet: number | null
          year_built: number | null
          property_type: string | null
          status: string
          description: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          address: string
          city: string
          state: string
          zip_code: string
          price: number
          bedrooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          year_built?: number | null
          property_type?: string | null
          status?: string
          description?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          price?: number
          bedrooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          year_built?: number | null
          property_type?: string | null
          status?: string
          description?: string | null
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
