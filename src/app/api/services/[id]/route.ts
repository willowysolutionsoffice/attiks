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
    const idx = db.services.findIndex((s) => s.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    db.services[idx] = { ...db.services[idx], ...body };
    writeDatabase(db);
    logActivity('Admin', `Updated service "${db.services[idx].title}"`);
    return NextResponse.json({ success: true, service: db.services[idx] });
  } catch {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = readDatabase();
    const target = db.services.find((s) => s.id === id);
    if (!target) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    db.services = db.services.filter((s) => s.id !== id);
    writeDatabase(db);
    logActivity('Admin', `Deleted service "${target.title}"`);
    return NextResponse.json({ success: true, deletedId: id });
  } catch {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
