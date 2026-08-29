import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, users: db.users });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDatabase();
    const newUser = {
      id: body.id || `usr-${Date.now()}`,
      name: body.name || 'New Admin User',
      email: body.email || 'user@attiks.in',
      role: body.role || 'Editor',
      status: 'active' as const,
      lastActive: 'Never',
    };
    db.users.push(newUser);
    writeDatabase(db);
    logActivity('Admin', `Created user account for ${newUser.name} (${newUser.role})`);
    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
