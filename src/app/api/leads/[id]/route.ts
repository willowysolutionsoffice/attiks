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
    const idx = db.leads.findIndex((l) => l.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    db.leads[idx] = { ...db.leads[idx], ...body };
    writeDatabase(db);
    logActivity('Admin', `Updated lead status for ${db.leads[idx].name}`);
    return NextResponse.json({ success: true, lead: db.leads[idx] });
  } catch {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = readDatabase();
    const target = db.leads.find((l) => l.id === id);
    if (!target) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    db.leads = db.leads.filter((l) => l.id !== id);
    writeDatabase(db);
    logActivity('Admin', `Deleted lead enquiry from ${target.name}`);
    return NextResponse.json({ success: true, deletedId: id });
  } catch {
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
