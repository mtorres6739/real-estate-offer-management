import { useAuth } from '@/lib/auth/contexts/AuthContext';
import { UserRole } from '@/types/user';

export function useRolePermissions() {
  const { user } = useAuth();

  if (!user) {
    return {
      currentRole: UserRole.CLIENT,
      canAccessUsers: false,
      canAccessOffers: false,
      canAccessAnalytics: false,
      canAccessSettings: false,
    };
  }

  const currentRole = (user.role || UserRole.CLIENT) as UserRole;

  return {
    currentRole,
    canAccessUsers: [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.BROKER].includes(currentRole),
    canAccessOffers: [UserRole.AGENT, UserRole.BROKER, UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(currentRole),
    canAccessAnalytics: [UserRole.AGENT, UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(currentRole),
    canAccessSettings: [UserRole.ADMIN, UserRole.SUPER_ADMIN].includes(currentRole),
  };
}
