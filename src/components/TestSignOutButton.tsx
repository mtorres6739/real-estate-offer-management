'use client';

import { useAuth } from '@/lib/auth/contexts/AuthContext';

export default function TestSignOutButton() {
  const auth = useAuth();

  console.log(' [TestSignOutButton] Rendering with auth:', auth);

  const handleClick = () => {
    console.log(' [TestSignOutButton] Button clicked');
    if (!auth || !auth.signOut) {
      console.error(' [TestSignOutButton] No auth context or signOut function');
      return;
    }

    console.log(' [TestSignOutButton] Calling signOut...');
    auth.signOut()
      .then(() => console.log(' [TestSignOutButton] Sign out successful'))
      .catch(error => console.error(' [TestSignOutButton] Sign out failed:', error));
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
    >
      Test Sign Out
    </button>
  );
}
