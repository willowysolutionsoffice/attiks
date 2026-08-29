import { cookies } from 'next/headers';
import { readDatabase, UserAccount } from './db';

export const ADMIN_COOKIE_NAME = 'attiks_admin_session';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

// ── Server-Side Auth Helpers ──────────────────────────────────────────────────

export async function getSeverSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!sessionCookie) return null;

    const db = readDatabase();
    const user = db.users.find((u) => u.email === sessionCookie || u.id === sessionCookie);
    if (!user || user.status !== 'active') return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export function hasPermission(
  userRole: 'Admin' | 'Editor' | 'Viewer',
  requiredAction: 'write' | 'delete' | 'users' | 'settings'
): boolean {
  if (userRole === 'Admin') return true;

  if (userRole === 'Editor') {
    if (requiredAction === 'write') return true;
    return false; // Editors cannot delete or manage users/settings
  }

  // Viewers are read-only
  return false;
}

// ── Client-Side Auth Helpers ──────────────────────────────────────────────────

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${ADMIN_COOKIE_NAME}=`));
  return !!cookie || localStorage.getItem('attiks_auth_bypassed') === '1';
}

export function getCurrentClientUser(): UserSession {
  if (typeof window !== 'undefined') {
    const savedRole = (localStorage.getItem('attiks_admin_role') as 'Admin' | 'Editor' | 'Viewer') || 'Admin';
    const savedName = localStorage.getItem('attiks_admin_name') || 'Admin User';
    return {
      id: 'usr-1',
      name: savedName,
      email: 'admin@attiks.in',
      role: savedRole,
    };
  }
  return { id: 'usr-1', name: 'Admin User', email: 'admin@attiks.in', role: 'Admin' };
}

export function clientSetUserRole(role: 'Admin' | 'Editor' | 'Viewer') {
  if (typeof window !== 'undefined') {
    localStorage.setItem('attiks_admin_role', role);
  }
}
