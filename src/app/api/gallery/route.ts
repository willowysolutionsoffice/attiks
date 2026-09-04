import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { GalleryPost, defaultGalleryPosts } from '@/data/gallery';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'gallery-posts.json');

async function readPosts(): Promise<GalleryPost[]> {
  try {
    const content = await readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // If file does not exist, return defaults
  }
  return defaultGalleryPosts;
}

async function writePosts(posts: GalleryPost[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const posts = await readPosts();
    return NextResponse.json({ success: true, data: posts });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, caption, description, location, aspectRatio } = body;

    if (!image) {
      return NextResponse.json({ success: false, error: 'Image is required' }, { status: 400 });
    }

    const posts = await readPosts();
    const newPost: GalleryPost = {
      id: `post-${Date.now()}`,
      image,
      caption: caption || 'Architectural Highlight',
      description: description || '',
      location: location || '',
      aspectRatio: aspectRatio || 'auto',
      createdAt: new Date().toISOString().split('T')[0],
      active: true,
      order: posts.length + 1,
    };

    // Prepend so newest post appears first
    const updated = [newPost, ...posts];
    await writePosts(updated);

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
