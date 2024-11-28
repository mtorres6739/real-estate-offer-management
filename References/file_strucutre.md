# Real Estate Offer Management Platform File Structure

```plaintext
├── public/                    # Static assets (images, icons, etc.)
│   ├── images/                # Image assets
│   ├── logos/                 # Brand logos
│   ├── uploads/               # User-uploaded images/files
│   └── favicon.ico            # Favicon
├── src/                       # Source code
│   ├── components/            # Reusable UI components
│   │   ├── layout/            # Layout components (e.g., Navbar, Footer)
│   │   └── ui/                # Generic UI components (Button, Input, Modal)
│   ├── features/              # Feature-specific folders
│   │   ├── listings/          # Property listings (create, view, edit)
│   │   │   ├── components/    # Listing-specific components
│   │   │   ├── hooks/         # Hooks for listing logic
│   │   │   └── pages/         # Listing-related pages
│   │   ├── offers/            # Offer management (submission, review)
│   │   │   ├── components/    # Offer-specific components
│   │   │   ├── hooks/         # Hooks for offer logic
│   │   │   └── pages/         # Offer-related pages
│   │   └── dashboard/         # Seller dashboard functionality
│   │       ├── components/    # Dashboard components
│   │       ├── hooks/         # Dashboard hooks
│   │       └── pages/         # Dashboard-specific pages
│   ├── hooks/                 # Shared custom hooks
│   ├── lib/                   # Utilities, helpers, and API wrappers
│   │   ├── api/               # API clients for backend endpoints
│   │   └── auth/              # Authentication helpers
│   ├── pages/                 # Next.js routing
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages (login, register)
│   │   ├── listings/          # Public listing pages (e.g., listing/[id])
│   │   ├── offers/            # Offer submission pages
│   │   └── dashboard/         # Dashboard pages
│   ├── styles/                # Styling
│   │   ├── globals.css        # Global styles
│   │   └── components/        # Component-specific styles
│   ├── store/                 # State management (if applicable)
│   └── utils/                 # General-purpose utility functions
├── .env                       # Environment variables
├── next.config.js             # Next.js configuration
├── package.json               # Package dependencies and scripts
└── tsconfig.json              # TypeScript configuration (if using TypeScript)

### Why Structure It This Way?

#### **`src` Folder**:
- Keeps the app's source code separate from config files at the root, providing clarity.
- Improves navigation when working in larger projects.

#### **Feature-Based Organization**:
- Group related code (e.g., components, hooks, and utils) by feature under `features/`.
- This makes it easier to scale as the app grows without cluttering global folders like `components`.

#### **Reusable Components**:
- Generic components (e.g., `Button`, `Modal`) go in `components/ui/`.
- Larger structural components (e.g., `Header`, `Footer`) go in `components/layout/`.

#### **Global Utilities and Libraries**:
- Use `lib/` for reusable utilities like API clients, authentication helpers, or database connections.

#### **State Management**:
- Use `store/` for Redux, Zustand, or other state libraries to centralize logic.

#### **Scoped Styling**:
- Component-specific styles in `styles/` or as CSS Modules.
- Global styles and variables in `styles/globals.css`.

#### **`public` for Static Files**:
- Makes static assets like images and fonts easily accessible via the `/public` folder.

### Feature-Specific Organization

Each feature in our application is organized in a self-contained manner under the `src/features` directory. Here's how we structure each feature:

```plaintext
src/features/
├── dashboard/                 # Dashboard feature
│   ├── components/           # Dashboard-specific components
│   │   └── layout.tsx       # Dashboard layout component
│   ├── hooks/               # Dashboard-specific hooks
│   └── pages/               # Dashboard page components
│
├── listings/                 # Property listings feature
│   ├── components/          # Listing-specific components
│   ├── hooks/              # Listing-specific hooks
│   └── pages/              # Listing page components
│
└── auth/                    # Authentication feature
    ├── components/         # Auth-specific components
    └── pages/             # Auth page components
```

This organization allows each feature to:
- Maintain its own components, hooks, and utilities
- Be developed and tested independently
- Have clear boundaries with other features
- Be easily located and maintained by developers

Components in these feature directories are then imported by the appropriate pages in the `src/app` directory, keeping our Next.js routing clean while maintaining good code organization.

### Key Folders for Authentication

#### **`pages/api/auth/`**:
- Use this for API routes related to authentication. For example:
  - `pages/api/auth/login.js`: Handles login requests.
  - `pages/api/auth/register.js`: Handles user registration.
  - `pages/api/auth/logout.js`: Handles user logout.
  - `pages/api/auth/session.js`: Manages session validation.

#### **`lib/auth/`**:
- Centralizes authentication logic, such as:
  - **Token Management**: Functions for storing, retrieving, and refreshing tokens.
  - **Session Helpers**: Check if a user is authenticated.
  - **Password Management**: Hashing, comparing passwords (if using a custom backend).

#### **`pages/auth/`**:
- Authentication-related pages for users, e.g.:
  - `pages/auth/login.js`: Login form.
  - `pages/auth/register.js`: Registration form.
  - `pages/auth/forgot-password.js`: Password reset page.

#### **Authentication Hooks** (inside `hooks/` or `lib/auth/`):
- Example: `useAuth()` hook for managing user state and actions like login/logout.
- Example: `useRequireAuth()` to protect routes by redirecting unauthenticated users.

#### **Protected Routes**:
- Add a higher-order component (HOC) or middleware to secure certain pages. Place this in `lib/auth/` or `components/`.

---

### Basic Implementation Workflow

#### **Backend**:
- Use API routes in `pages/api/auth/` to handle:
  - User login, registration, and session management.
  - JWT-based authentication for token validation.

#### **Frontend**:
- Use `useAuth()` to handle:
  - Login and registration requests.
  - Storing user tokens in cookies or `localStorage` securely.
  - Validating and managing user state.

#### **Protecting Routes**:
- Example HOC for protected routes:

```javascript
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push('/auth/login');
      }
    }, [user, loading]);

    if (loading || !user) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}

### Next.js App Router Integration

Since we're using Next.js App Router, our pages are actually organized in the `src/app` directory following Next.js conventions, but they import and use components and logic from our feature-based structure. Here's how it maps:

```plaintext
src/app/
├── (auth)/                    # Maps to src/features/auth
│   ├── login/
│   ├── register/
│   └── callback/
├── (protected)/               # Maps to src/features/dashboard
│   └── dashboard/
└── properties/               # Maps to src/features/listings

```

The actual page components in `src/app` are kept minimal, mainly handling routing and layout, while importing the business logic and UI components from our feature-based structure in `src/features/`. This gives us the best of both worlds:
- Next.js App Router's powerful routing and layout features
- Clean, feature-based organization of our business logic and components

### Error Handling Components

We've organized our error handling components in a dedicated directory:

```plaintext
src/components/error/
├── 404.tsx                    # 404 Not Found page
├── 500.tsx                    # 500 Server Error page
├── error.tsx                  # Generic error boundary
└── not-found.tsx             # Next.js 13+ not found component
```

These components are used throughout the application for consistent error handling and user feedback. The error components are imported by the appropriate pages in the `app` directory when needed, maintaining separation of concerns while leveraging Next.js's error handling features.

### Example File Strucutre with Authentication in Mind
├── src/
│   ├── lib/
│   │   └── auth/
│   │       ├── authClient.js         # API client for authentication
│   │       ├── session.js            # Manage sessions (e.g., JWT handling)
│   │       └── bcryptHelpers.js      # Password hashing and validation
│   ├── hooks/
│   │   └── useAuth.js                # Hook for managing user state
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── login.js              # Login page
│   │   │   ├── register.js           # Register page
│   │   │   └── forgot-password.js    # Forgot password page
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── login.js          # API route for login
│   │   │       ├── register.js       # API route for registration
│   │   │       └── logout.js         # API route for logout
│   │   ├── protected-page.js         # Example of a protected page
│   └── components/
│       ├── auth/                     # Components for authentication (e.g., forms)
│       └── layout/                   # Layouts with authentication logic
├── .env                              # Secrets (e.g., JWT_SECRET, DB connection)
