import { NextResponse } from 'next/server';
import { readDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = readDatabase();

    const totalProjects = db.projects.length;
    const publishedProjects = db.projects.filter((p) => p.status !== 'draft').length;
    const draftProjects = db.projects.filter((p) => p.status === 'draft').length;
    const featuredProjects = db.projects.filter((p) => p.featured).length;

    const totalServices = db.services.length;
    const totalTeamMembers = db.team.length;
    const totalBlogPosts = db.blog.length;
    
    const totalLeads = db.leads.length;
    const newLeads = db.leads.filter((l) => l.status === 'new').length;

    const totalMediaAssets = db.media.length;
    const mediaStorageBytes = db.media.reduce((acc, m) => acc + (m.sizeBytes || 0), 0);

    const categoryBreakdown: Record<string, number> = {};
    db.projects.forEach((p) => {
      categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalProjects,
        publishedProjects,
        draftProjects,
        featuredProjects,
        totalServices,
        totalTeamMembers,
        totalBlogPosts,
        totalLeads,
        newLeads,
        totalMediaAssets,
        mediaStorageBytes,
      },
      categoryBreakdown,
      recentProjects: db.projects.slice(0, 5),
      recentLeads: db.leads.slice(0, 5),
      activityLog: db.activityLog.slice(0, 8),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
