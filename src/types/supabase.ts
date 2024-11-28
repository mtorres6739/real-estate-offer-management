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
          property_address: string
          offer_amount: number
          status: 'pending' | 'accepted' | 'rejected'
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          property_address: string
          offer_amount: number
          status?: 'pending' | 'accepted' | 'rejected'
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          property_address?: string
          offer_amount?: number
          status?: 'pending' | 'accepted' | 'rejected'
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
