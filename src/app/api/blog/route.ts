import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';

export async function GET() {
  const db = readDatabase();
  return NextResponse.json({ success: true, posts: db.blog });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDatabase();
    const newPost = {
      id: body.id || `post-${Date.now()}`,
      title: body.title || 'New Blog Article',
      slug: body.slug || (body.title ? body.title.toLowerCase().replace(/\s+/g, '-') : `article-${Date.now()}`),
      summary: body.summary || '',
      content: body.content || '',
      author: body.author || 'ATTIKS Editorial',
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      status: body.status || 'published',
      image: body.image || '/architecture.webp',
    };
    db.blog.unshift(newPost);
    writeDatabase(db);
    logActivity('Admin', `Created blog post "${newPost.title}"`);
    return NextResponse.json({ success: true, post: newPost }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
