import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let url = '';
    let fileName = '';
    let sizeBytes = 0;
    let mimeType = 'image/webp';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = path.extname(file.name) || '.webp';
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      fileName = `img_${Date.now()}_${cleanName}`;
      sizeBytes = file.size;
      mimeType = file.type || 'image/webp';

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      url = `/uploads/${fileName}`;
    } else {
      // JSON base64 / Data URL fallback
      const body = await request.json();
      if (!body.dataUrl) {
        return NextResponse.json({ error: 'No image dataUrl provided' }, { status: 400 });
      }

      const matches = body.dataUrl.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        return NextResponse.json({ error: 'Invalid data URL format' }, { status: 400 });
      }

      mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      const ext = mimeType.split('/')[1] || 'webp';
      fileName = `img_${Date.now()}.${ext}`;
      sizeBytes = buffer.length;

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);

      url = `/uploads/${fileName}`;
    }

    // Save metadata in database.json media list
    const db = readDatabase();
    const newMedia = {
      id: `med-${Date.now()}`,
      fileName: fileName,
      url: url,
      sizeBytes: sizeBytes,
      format: mimeType,
      dimensions: '1920x1080',
      altText: fileName,
      uploadedAt: new Date().toISOString().split('T')[0],
    };

    db.media.unshift(newMedia);
    writeDatabase(db);
    logActivity('Admin', `Uploaded image file "${fileName}"`);

    return NextResponse.json({
      success: true,
      url: url,
      fileName: fileName,
      media: newMedia,
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
