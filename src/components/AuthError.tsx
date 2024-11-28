'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AuthError({
  error,
}: {
  error: string | null;
}) {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return null;
}
