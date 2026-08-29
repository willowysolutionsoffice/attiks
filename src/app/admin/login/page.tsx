'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Authentication is disabled; redirect directly to admin overview
    router.replace('/admin');
  }, [router]);

  return null;
}
