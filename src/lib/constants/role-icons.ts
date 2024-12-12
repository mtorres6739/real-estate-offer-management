import {
  UserIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

export const ROLE_ICONS = {
  CLIENT: UserIcon,
  AGENT: UserGroupIcon,
  BROKER: BuildingOfficeIcon,
  MANAGER: BriefcaseIcon,
  ADMIN: ShieldCheckIcon,
  SUPER_ADMIN: KeyIcon,
} as const;

// Role descriptions for tooltips or accessibility
export const ROLE_DESCRIPTIONS = {
  CLIENT: 'Basic user who can view their profiles and make listings/offers',
  AGENT: 'Advanced user who can manage assigned clients and make listings/offers',
  BROKER: 'Advanced user who can manage agents and their clients',
  MANAGER: 'Manages overall operations',
  ADMIN: 'Administrative access to the system',
  SUPER_ADMIN: 'Full system access and control',
} as const;

// Role colors for visual distinction
export const ROLE_COLORS = {
  CLIENT: 'text-blue-600',
  AGENT: 'text-green-600',
  BROKER: 'text-purple-600',
  MANAGER: 'text-orange-600',
  ADMIN: 'text-red-600',
  SUPER_ADMIN: 'text-gray-900',
} as const;
