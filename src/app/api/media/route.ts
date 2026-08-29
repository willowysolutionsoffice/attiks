import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, media: db.media });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDatabase();
    const newMedia = {
      id: body.id || `med-${Date.now()}`,
      fileName: body.fileName || 'new-asset.webp',
      url: body.url || '/architecture.webp',
      sizeBytes: body.sizeBytes || 450000,
      format: body.format || 'image/webp',
      dimensions: body.dimensions || '1920x1080',
      altText: body.altText || 'Architectural Showcase Image',
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    db.media.unshift(newMedia);
    writeDatabase(db);
    logActivity('Admin', `Uploaded media asset "${newMedia.fileName}"`);
    return NextResponse.json({ success: true, mediaAsset: newMedia }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to upload media asset' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing media ID' }, { status: 400 });

    const db = readDatabase();
    const target = db.media.find((m) => m.id === id);
    if (!target) return NextResponse.json({ error: 'Media asset not found' }, { status: 404 });

    db.media = db.media.filter((m) => m.id !== id);
    writeDatabase(db);
    logActivity('Admin', `Deleted media asset "${target.fileName}"`);
    return NextResponse.json({ success: true, deletedId: id });
  } catch {
    return NextResponse.json({ error: 'Failed to delete media asset' }, { status: 500 });
  }
}
