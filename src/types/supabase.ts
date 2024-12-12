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
      offers: {
        Row: {
          id: string
          created_at: string
          user_id: string
          property_id: string
          property_address: string | null
          offer_amount: number
          status: 'pending' | 'accepted' | 'rejected'
          deleted_at: string | null
          properties?: {
            address: string
            city: string
            state: string
            zip_code: string
          } | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          property_id: string
          property_address?: string | null
          offer_amount: number
          status?: 'pending' | 'accepted' | 'rejected'
          deleted_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          property_id?: string
          property_address?: string | null
          offer_amount?: number
          status?: 'pending' | 'accepted' | 'rejected'
          deleted_at?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          role: 'user' | 'agent' | 'admin'
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          role?: 'user' | 'agent' | 'admin'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          role?: 'user' | 'agent' | 'admin'
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
