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
    const idx = db.blog.findIndex((b) => b.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });

    db.blog[idx] = { ...db.blog[idx], ...body };
    writeDatabase(db);
    logActivity('Admin', `Updated blog post "${db.blog[idx].title}"`);
    return NextResponse.json({ success: true, post: db.blog[idx] });
  } catch {
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = readDatabase();
    const target = db.blog.find((b) => b.id === id);
    if (!target) return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });

    db.blog = db.blog.filter((b) => b.id !== id);
    writeDatabase(db);
    logActivity('Admin', `Deleted blog post "${target.title}"`);
    return NextResponse.json({ success: true, deletedId: id });
  } catch {
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
