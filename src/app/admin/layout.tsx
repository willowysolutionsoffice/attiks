'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { getSessionAction } from '@/actions/auth.actions';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // If on login page, skip verification
    if (pathname === '/admin/login') {
      setCheckingAuth(false);
      return;
    }

    let isMounted = true;

    async function verifySession() {
      try {
        const session = await getSessionAction();
        if (!isMounted) return;

        if (session && session.success && session.authenticated) {
          setIsAuthenticated(true);
          setCheckingAuth(false);
        } else {
          // Unauthenticated or expired session
          setIsAuthenticated(false);
          setCheckingAuth(false);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('attiks_admin_session');
            localStorage.removeItem('attiks_admin_user');
          }
          const redirectParam = encodeURIComponent(pathname);
          router.replace(`/admin/login?redirect=${redirectParam}`);
        }
      } catch (err) {
        if (isMounted) {
          setIsAuthenticated(false);
          setCheckingAuth(false);
          if (typeof window !== 'undefined') {
            localStorage.removeItem('attiks_admin_session');
            localStorage.removeItem('attiks_admin_user');
          }
          router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
        }
      }
    }

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  // If on login page, render standalone without admin shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If checking authentication, display loading screen to prevent content flash
  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--admin-bg, #fbfbfb)',
          color: 'var(--admin-text, #09090b)',
        }}
      >
        <Loader2 size={24} className="animate-spin" style={{ color: '#09090b' }} />
      </div>
    );
  }

  // If not authenticated, return null while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="admin-shell">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="admin-main">
        <AdminHeader onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
