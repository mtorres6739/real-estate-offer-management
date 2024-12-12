# Project Notes

## Technology Stack

- Next.js: v15.0.3
- React: v18.2.0
- Database: Supabase
- Authentication: Supabase Auth (@supabase/auth-helpers-nextjs v0.10.0)

## Important Configurations

### Next.js
- Using App Router
- Server Components enabled
- Dynamic route params handling in Next.js 15.0.3 requires special attention for server components

### Database
- Using RLS (Row Level Security) for access control
- User roles stored in both auth metadata and user_profiles table
- Current roles: SUPER_ADMIN, ADMIN, CLIENT

## Known Issues & Solutions

### User Roles
- User roles are synchronized between auth metadata and user_profiles table
- SUPER_ADMIN role is automatically assigned to torres.mathew@gmail.com
- RLS policies use auth.jwt() to avoid infinite recursion

### Dynamic Routes
- params.id in dynamic routes must be properly handled in Next.js 15.0.3
- Current implementation needs updating to match Next.js 15.0.3 requirements for server components
- Location of issue: src/app/(protected)/dashboard/offers/[id]/page.tsx
