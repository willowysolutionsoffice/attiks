import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, leads: db.leads });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDatabase();
    const newLead = {
      id: body.id || `lead-${Date.now()}`,
      name: body.name || 'Anonymous Client',
      email: body.email || 'client@example.com',
      phone: body.phone || '',
      service: body.service || 'General Enquiry',
      message: body.message || '',
      status: 'new' as const,
      createdAt: new Date().toLocaleString(),
    };
    db.leads.unshift(newLead);
    writeDatabase(db);
    logActivity('Website', `Received new contact enquiry from ${newLead.name}`);
    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to record lead' }, { status: 500 });
  }
}
