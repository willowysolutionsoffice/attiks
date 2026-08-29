import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, team: db.team });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDatabase();
    const newMember = {
      id: body.id || `team-${Date.now()}`,
      name: body.name || 'New Architect',
      role: body.role || 'Architectural Designer',
      bio: body.bio || '',
      image: body.image || '/images/hero-1.webp',
      experience: body.experience || '5+ Years',
    };
    db.team.push(newMember);
    writeDatabase(db);
    logActivity('Admin', `Added team member "${newMember.name}"`);
    return NextResponse.json({ success: true, teamMember: newMember }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add team member' }, { status: 500 });
  }
}
