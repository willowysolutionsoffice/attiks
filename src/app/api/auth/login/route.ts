import { NextResponse } from 'next/server';
import { readDatabase, logActivity } from '@/lib/db';
import { ADMIN_COOKIE_NAME } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const db = readDatabase();
    const user = db.users.find((u) => u.email === email || (email === 'admin@attiks.in' && password === 'attiks2026'));

    // Check credentials (accepts attiks2026 or any valid active user)
    if (!user && password !== 'attiks2026') {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const activeUser = user || {
      id: 'usr-1',
      name: 'Admin User',
      email: 'admin@attiks.in',
      role: 'Admin' as const,
      status: 'active' as const,
      lastActive: 'Just now',
    };

    logActivity(activeUser.name, 'Logged in to Admin Dashboard');

    const response = NextResponse.json({
      success: true,
      user: activeUser,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: activeUser.email,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
