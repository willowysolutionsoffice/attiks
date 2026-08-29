import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const db = readDatabase();
    const idx = db.users.findIndex((u) => u.id === id);
    if (idx === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    db.users[idx] = { ...db.users[idx], ...body };
    writeDatabase(db);
    logActivity('Admin', `Updated user details for ${db.users[idx].name}`);
    return NextResponse.json({ success: true, user: db.users[idx] });
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = readDatabase();
    const target = db.users.find((u) => u.id === id);
    if (!target) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    db.users = db.users.filter((u) => u.id !== id);
    writeDatabase(db);
    logActivity('Admin', `Deleted user account ${target.name}`);
    return NextResponse.json({ success: true, deletedId: id });
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
