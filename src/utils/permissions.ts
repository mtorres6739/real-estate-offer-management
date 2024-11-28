import { User, UserRole, DEFAULT_ROLE_PERMISSIONS } from '@/types/user';

export function canUserPerformAction(user: User, action: keyof typeof DEFAULT_ROLE_PERMISSIONS[UserRole]) {
  return DEFAULT_ROLE_PERMISSIONS[user.role][action];
}

export function canUserManageRole(currentUserRole: UserRole, targetRole: UserRole): boolean {
  const roleHierarchy = {
    [UserRole.SUPER_ADMIN]: 0,
    [UserRole.ADMIN]: 1,
    [UserRole.BROKER]: 2,
    [UserRole.AGENT]: 3,
    [UserRole.CLIENT]: 4,
  };

  // Users can only manage roles below them in the hierarchy
  return roleHierarchy[currentUserRole] < roleHierarchy[targetRole];
}

export function canUserCrossTalk(
  currentUser: User,
  targetUser: User,
  assignedUsers?: { userId: string; assignedTo: string }[]
): boolean {
  // Super Admin can talk to everyone
  if (currentUser.role === UserRole.SUPER_ADMIN) {
    return true;
  }

  // Admin can talk to everyone except Super Admin
  if (currentUser.role === UserRole.ADMIN) {
    return targetUser.role !== UserRole.SUPER_ADMIN;
  }

  // Handle Broker permissions
  if (currentUser.role === UserRole.BROKER) {
    switch (targetUser.role) {
      case UserRole.CLIENT:
        // Broker can only talk to their own clients or clients of their agents
        return assignedUsers?.some(
          (assignment) =>
            assignment.userId === targetUser.id &&
            (assignment.assignedTo === currentUser.id ||
              assignedUsers.some(
                (agentAssignment) =>
                  agentAssignment.userId === assignment.assignedTo &&
                  agentAssignment.assignedTo === currentUser.id
              ))
        ) || false;
      case UserRole.AGENT:
        // Broker can talk to their own agents
        return assignedUsers?.some(
          (assignment) =>
            assignment.userId === targetUser.id && assignment.assignedTo === currentUser.id
        ) || false;
      case UserRole.BROKER:
        return true; // Brokers can talk to other brokers
      case UserRole.ADMIN:
      case UserRole.SUPER_ADMIN:
        return true; // Brokers can talk to admins and super admins
      default:
        return false;
    }
  }

  // Handle Agent permissions
  if (currentUser.role === UserRole.AGENT) {
    switch (targetUser.role) {
      case UserRole.CLIENT:
        // Agent can only talk to their own clients
        return assignedUsers?.some(
          (assignment) =>
            assignment.userId === targetUser.id && assignment.assignedTo === currentUser.id
        ) || false;
      case UserRole.AGENT:
        return true; // Agents can talk to other agents
      case UserRole.BROKER:
        // Agent can talk to their assigned broker
        return currentUser.assignedTo === targetUser.id;
      case UserRole.ADMIN:
      case UserRole.SUPER_ADMIN:
        return true; // Agents can talk to admins and super admins
      default:
        return false;
    }
  }

  // Handle Client permissions
  if (currentUser.role === UserRole.CLIENT) {
    // Clients can only talk to their assigned agent/broker and admins/super admins
    if (targetUser.role === UserRole.SUPER_ADMIN) {
      return true;
    }
    return currentUser.assignedTo === targetUser.id;
  }

  return false;
}

export function getUsersManageableByRole(currentUserRole: UserRole): UserRole[] {
  switch (currentUserRole) {
    case UserRole.SUPER_ADMIN:
      return [UserRole.ADMIN, UserRole.BROKER, UserRole.AGENT, UserRole.CLIENT];
    case UserRole.ADMIN:
      return [UserRole.BROKER, UserRole.AGENT, UserRole.CLIENT];
    case UserRole.BROKER:
      return [UserRole.AGENT, UserRole.CLIENT];
    case UserRole.AGENT:
      return [UserRole.CLIENT];
    default:
      return [];
  }
}
