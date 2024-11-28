export interface NotificationChannel {
  new_offers: boolean;
  offer_updates: boolean;
  property_updates: boolean;
}

export interface EmailNotifications extends NotificationChannel {
  weekly_digest: boolean;
  marketing: boolean;
}

export interface NotificationPreferences {
  email: EmailNotifications;
  sms: NotificationChannel;
  push: NotificationChannel;
}

export interface PrivacySettings {
  profile_visibility: 'public' | 'registered' | 'private';
  contact_info_visibility: 'public' | 'registered' | 'private';
  show_email: boolean;
  show_phone: boolean;
  show_address: boolean;
}

export interface AccountPreferences {
  timezone: string;
  language: string;
  currency: string;
}

export interface Address {
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country: string;
}

export interface ProfessionalInfo {
  license_number?: string;
  license_state?: string;
  license_expiry?: string;
  specialties?: string[];
  years_of_experience?: number;
  certifications?: string;
  brokerage?: string;
}

export interface PersonalInfo {
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  title?: string;
  company?: string;
  bio?: string;
  website?: string;
}

export interface UserProfile extends Address, PersonalInfo {
  id: string;
  role: string;
  avatar_url?: string;
  notification_preferences: NotificationPreferences;
  privacy_settings: PrivacySettings;
  account_preferences: AccountPreferences;
  professional_info?: ProfessionalInfo;
  created_at: string;
  updated_at: string;
}
