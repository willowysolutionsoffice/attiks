import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, services: db.services });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDatabase();
    const newService = {
      id: body.id || `srv-${Date.now()}`,
      title: body.title || 'New Service',
      category: body.category || 'General',
      description: body.description || '',
      iconName: body.iconName || 'Compass',
      featured: Boolean(body.featured),
    };
    db.services.push(newService);
    writeDatabase(db);
    logActivity('Admin', `Added service "${newService.title}"`);
    return NextResponse.json({ success: true, service: newService }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
