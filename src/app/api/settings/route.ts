import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, settings: db.settings });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const db = readDatabase();
    db.settings = { ...db.settings, ...body };
    writeDatabase(db);
    logActivity('Admin', 'Updated site configuration settings');
    return NextResponse.json({ success: true, settings: db.settings });
  } catch {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
