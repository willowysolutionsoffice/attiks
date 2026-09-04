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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/blogs/${id}`, {
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

  const posts = await readLocalPosts();
  const found = posts.find((p) => p.id === id || p.slug === id);

  if (!found) {
    return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: found });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(2000),
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data, { status: backendRes.status });
    }
  } catch {
    // Backend offline, fallback locally
  }

  const posts = await readLocalPosts();
  const index = posts.findIndex((p) => p.id === id || p.slug === id);

  if (index === -1) {
    return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
  }

  posts[index] = {
    ...posts[index],
    ...body,
    id: posts[index].id,
  };

  await writeLocalPosts(posts);
  return NextResponse.json({ success: true, data: posts[index] });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/blogs/${id}`, {
      method: 'DELETE',
      signal: AbortSignal.timeout(2000),
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(data, { status: backendRes.status });
    }
  } catch {
    // Fallback locally
  }

  let posts = await readLocalPosts();
  posts = posts.filter((p) => p.id !== id && p.slug !== id);
  await writeLocalPosts(posts);

  return NextResponse.json({ success: true, message: 'Article deleted' });
}
