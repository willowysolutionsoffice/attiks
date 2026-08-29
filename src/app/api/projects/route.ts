import { NextResponse } from 'next/server';
import { readDatabase, writeDatabase, logActivity } from '@/lib/db';
import { Project } from '@/data/projects';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';

    const db = readDatabase();
    let items = db.projects;

    if (search) {
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.location.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    if (category) {
      items = items.filter((p) => p.category === category);
    }

    if (status) {
      items = items.filter((p) => p.status === status);
    }

    return NextResponse.json({ success: true, count: items.length, projects: items });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = readDatabase();

    const newProject: Project & { status?: 'published' | 'draft'; featured?: boolean } = {
      id: body.id || `proj-${Date.now()}`,
      title: body.title || 'New Architectural Project',
      category: body.category || 'residential',
      location: body.location || 'Kerala, India',
      year: body.year || String(new Date().getFullYear()),
      image: body.image || '/architecture.webp',
      description: body.description || '',
      highlights: Array.isArray(body.highlights) ? body.highlights : body.highlights ? [body.highlights] : [],
      gallery: Array.isArray(body.gallery) ? body.gallery : body.gallery ? [body.gallery] : [],
      scope: body.scope || 'Architecture & Design',
      area: body.area || '',
      status: body.status || 'published',
      featured: Boolean(body.featured),
    };

    db.projects.unshift(newProject);
    writeDatabase(db);
    logActivity('Admin', `Created project "${newProject.title}"`);

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
