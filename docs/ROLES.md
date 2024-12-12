# Role-Based Access Control (RBAC)

## Overview
This document outlines the role hierarchy and permissions in the Real Estate Offer Management platform.

## Role Categories

### 1. Real Estate Roles
These roles are for day-to-day users of the platform.

#### 1.1 Client
- **Access Level**: Basic User
- **Permissions**:
  - View:
    - Own profile
    - Assigned agent's profile
    - Assigned broker's profile
  - Update:
    - Own profile
  - Create:
    - Listings
    - Offers
- **Use Case**: End users looking to buy/sell properties

#### 1.2 Agent
- **Access Level**: Advanced User
- **Permissions**:
  - View:
    - Own profile
    - Assigned broker's profile
    - All assigned client profiles
  - Update:
    - Own profile
    - Assigned client profiles
  - Create:
    - Listings
    - Offers
- **Use Case**: Real estate agents managing client relationships

#### 1.3 Broker
- **Access Level**: Advanced User
- **Permissions**:
  - View:
    - Own profile
    - Assigned agent profiles
    - All client profiles under assigned agents
  - Update:
    - Own profile
    - Agent profiles
    - Client profiles (under agents)
  - Create:
    - Listings
    - Offers
- **Use Case**: Brokers overseeing multiple agents and their clients

### 2. White Label Reseller Roles
These roles are for businesses reselling the platform.

#### 2.1 Manager
- **Access Level**: Advanced User (White Label)
- **Permissions**:
  - Full CRUD operations on:
    - Users
    - Profiles
    - Listings
    - Offers
    - Agents
- **Use Case**: Marketing agencies reselling the platform to agents
- **Note**: Typically assigned to marketing agencies

#### 2.2 Admin
- **Access Level**: Advanced User (Platform Owner)
- **Permissions**:
  - Full CRUD operations on:
    - Users
    - Profiles
    - Listings
    - Offers
    - Agents
  - Platform configuration
- **Use Case**: Company owning the reseller license
- **Note**: Reserved for the platform-owning company

### 3. System Role

#### 3.1 Super Admin
- **Access Level**: God Mode
- **Permissions**:
  - Unrestricted access to all system features
  - Direct database access
  - Configuration changes
  - System modifications
- **Use Case**: Platform development and maintenance
- **Note**: Personal access for system owner

## Dashboard & Page Access

### 1. Client Dashboard
- **Main Dashboard Features**:
  - My Properties
  - My Offers
  - My Agent Contact
  - Market Listings
- **Accessible Pages**:
  - `/dashboard` (Client view)
  - `/properties/my-listings`
  - `/offers/my-offers`
  - `/market-listings`
  - `/profile`
  - `/messages`

### 2. Agent Dashboard
- **Main Dashboard Features**:
  - Client Management
  - Property Listings
  - Offer Management
  - Performance Metrics
  - Commission Tracking
- **Accessible Pages**:
  - `/dashboard` (Agent view)
  - `/clients`
  - `/properties/*`
  - `/offers/*`
  - `/analytics/performance`
  - `/profile`
  - `/messages`
  - `/calendar`

### 3. Broker Dashboard
- **Main Dashboard Features**:
  - Agent Overview
  - Agency Performance
  - Property Portfolio
  - Offer Analytics
  - Revenue Tracking
- **Accessible Pages**:
  - `/dashboard` (Broker view)
  - `/agents`
  - `/clients`
  - `/properties/*`
  - `/offers/*`
  - `/analytics/*`
  - `/reports`
  - `/profile`
  - `/messages`
  - `/settings/agency`

### 4. Manager Dashboard (White Label)
- **Main Dashboard Features**:
  - Business Performance
  - User Management
  - Platform Settings
  - White Label Configuration
  - Revenue Reports
- **Accessible Pages**:
  - `/dashboard` (Manager view)
  - `/users/*`
  - `/analytics/business`
  - `/settings/white-label`
  - `/billing`
  - `/support`
  - `/reports/advanced`
  - All lower role pages

### 5. Admin Dashboard
- **Main Dashboard Features**:
  - Platform Overview
  - Reseller Management
  - System Health
  - Global Settings
  - Advanced Analytics
- **Accessible Pages**:
  - `/dashboard` (Admin view)
  - `/platform/*`
  - `/resellers/*`
  - `/analytics/platform`
  - `/settings/global`
  - `/system/health`
  - `/support/admin`
  - All lower role pages

### 6. Super Admin Dashboard
- **Main Dashboard Features**:
  - System Overview
  - Database Management
  - User Management
  - Configuration
  - Monitoring
- **Accessible Pages**:
  - `/dashboard` (Super Admin view)
  - `/system/*`
  - `/database/*`
  - `/config/*`
  - `/logs/*`
  - `/monitoring/*`
  - All platform pages

## Implementation Notes

### Permission Hierarchy
```
Super Admin
└── Admin
    └── Manager
        └── Broker
            └── Agent
                └── Client
```

### Database Schema Considerations
- Role field in user table should be enum
- Relationships between roles should be tracked
- Audit logging for role-based actions

### Security Considerations
- Role verification on all protected routes
- Middleware for permission checks
- Rate limiting based on role
- Audit logging for sensitive operations

### UI/UX Guidelines
- Role-specific dashboards
- Clear visual indicators of user role
- Role-appropriate navigation
- Permission-based UI elements

## Implementation Guidelines

### Route Protection
```typescript
// Example route protection middleware
export async function validateRouteAccess(
  user: User,
  route: string
): Promise<boolean> {
  const roleRoutes = {
    CLIENT: ['/dashboard', '/properties/my-listings', '/offers/my-offers', ...],
    AGENT: ['/dashboard', '/clients', '/properties/*', ...],
    // ... other roles
  };

  return checkRoutePermission(user.role, route, roleRoutes);
}
```

### Dashboard Components
- Each role should have its own dashboard layout component
- Use role-based component rendering
- Implement proper loading states
- Include role-specific navigation

### Navigation Management
```typescript
// Example navigation configuration
const navigationConfig = {
  CLIENT: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Properties', href: '/properties/my-listings' },
    // ...
  ],
  AGENT: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Clients', href: '/clients' },
    // ...
  ],
  // ... other roles
};
```

### State Management
- Maintain role information in global state
- Use role-based data fetching
- Implement proper error boundaries
- Handle permission-based UI updates
