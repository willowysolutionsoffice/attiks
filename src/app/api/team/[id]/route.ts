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
    const idx = db.team.findIndex((t) => t.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Team member not found' }, { status: 404 });

    db.team[idx] = { ...db.team[idx], ...body };
    writeDatabase(db);
    logActivity('Admin', `Updated team member "${db.team[idx].name}"`);
    return NextResponse.json({ success: true, teamMember: db.team[idx] });
  } catch {
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = readDatabase();
    const target = db.team.find((t) => t.id === id);
    if (!target) return NextResponse.json({ error: 'Team member not found' }, { status: 404 });

    db.team = db.team.filter((t) => t.id !== id);
    writeDatabase(db);
    logActivity('Admin', `Deleted team member "${target.name}"`);
    return NextResponse.json({ success: true, deletedId: id });
  } catch {
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
