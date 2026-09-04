import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { MediaArticle } from '@/lib/media';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DATA_FILE = path.join(DATA_DIR, 'media-posts.json');

async function readLocalPosts(): Promise<MediaArticle[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeLocalPosts(posts: MediaArticle[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const backendRes = await fetch(`${BACKEND_URL}/api/blogs?${searchParams.toString()}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(1500),
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data, { status: backendRes.status });
    }
  } catch {
    // Fall through to local fallback
  }

  const local = await readLocalPosts();
  return NextResponse.json({
    success: true,
    data: { items: local, total: local.length },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    try {
      const backendRes = await fetch(`${BACKEND_URL}/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(2000),
      });

      if (backendRes.ok) {
        const data = await backendRes.json();
        return NextResponse.json(data, { status: backendRes.status });
      }
    } catch {
      // Backend offline, persist locally
    }

    const posts = await readLocalPosts();
    const newPost: MediaArticle = {
      id: body.id || `media-${Date.now()}`,
      title: body.title || 'Untitled Article',
      slug: body.slug || (body.title || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: body.category || 'Article',
      author: body.author || 'Attiks Architecture',
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      image: body.image || '/architecture.webp',
      summary: body.summary || '',
      content: body.content || '',
      status: body.status || 'published',
      featured: Boolean(body.featured),
      order: posts.length + 1,
    };

    posts.unshift(newPost);
    await writeLocalPosts(posts);

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
