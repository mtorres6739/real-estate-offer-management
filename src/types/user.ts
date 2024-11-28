export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  BROKER = 'BROKER',
  AGENT = 'AGENT',
  CLIENT = 'CLIENT',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phone?: string;
  assignedTo?: string; // ID of the broker/agent this user is assigned to
  createdAt: string;
  updatedAt: string;
}

export interface UserPermissions {
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canAssignClients: boolean;
  canCrosstalkWithSuperAdmin: boolean;
  canCrosstalkWithAdmins: boolean;
  canCrosstalkWithBrokers: boolean;
  canCrosstalkWithAgents: boolean;
  canCrosstalkWithClients: boolean;
}

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  [UserRole.SUPER_ADMIN]: {
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canAssignClients: true,
    canCrosstalkWithSuperAdmin: true,
    canCrosstalkWithAdmins: true,
    canCrosstalkWithBrokers: true,
    canCrosstalkWithAgents: true,
    canCrosstalkWithClients: true,
  },
  [UserRole.ADMIN]: {
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canAssignClients: true,
    canCrosstalkWithSuperAdmin: true,
    canCrosstalkWithAdmins: true,
    canCrosstalkWithBrokers: true,
    canCrosstalkWithAgents: true,
    canCrosstalkWithClients: true,
  },
  [UserRole.BROKER]: {
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canAssignClients: true,
    canCrosstalkWithSuperAdmin: true,
    canCrosstalkWithAdmins: true,
    canCrosstalkWithBrokers: true,
    canCrosstalkWithAgents: true,
    canCrosstalkWithClients: false, // Only their own clients
  },
  [UserRole.AGENT]: {
    canCreateUsers: true,
    canEditUsers: true,
    canDeleteUsers: false,
    canAssignClients: false,
    canCrosstalkWithSuperAdmin: true,
    canCrosstalkWithAdmins: true,
    canCrosstalkWithBrokers: false,
    canCrosstalkWithAgents: true,
    canCrosstalkWithClients: false, // Only their own clients
  },
  [UserRole.CLIENT]: {
    canCreateUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canAssignClients: false,
    canCrosstalkWithSuperAdmin: true,
    canCrosstalkWithAdmins: false,
    canCrosstalkWithBrokers: false,
    canCrosstalkWithAgents: false,
    canCrosstalkWithClients: false,
  },
};
