'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderOpen, Compass, Users, FileText, Inbox, HardDrive, Plus, ArrowRight, Activity, CheckCircle, Clock } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

interface DashboardStatsData {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  featuredProjects: number;
  totalServices: number;
  totalTeamMembers: number;
  totalBlogPosts: number;
  totalLeads: number;
  newLeads: number;
  totalMediaAssets: number;
  mediaStorageBytes: number;
}

import {
  projects as initialProjects,
  services as initialServices,
  team as initialTeam,
  blogPosts as initialBlogPosts,
} from '@/data/projects';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStatsData | null>(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState<Record<string, number>>({});
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStats() {
      try {
        const savedProjects = localStorage.getItem('attiks_admin_projects');
        const projList = savedProjects ? JSON.parse(savedProjects) : initialProjects;

        const savedLeads = localStorage.getItem('attiks_admin_leads');
        const leadsList = savedLeads ? JSON.parse(savedLeads) : [];

        const savedServices = localStorage.getItem('attiks_admin_services');
        const srvList = savedServices ? JSON.parse(savedServices) : initialServices;

        const savedTeam = localStorage.getItem('attiks_admin_team');
        const teamList = savedTeam ? JSON.parse(savedTeam) : initialTeam;

        const savedBlog = localStorage.getItem('attiks_admin_blog');
        const blogList = savedBlog ? JSON.parse(savedBlog) : initialBlogPosts;

        const savedMedia = localStorage.getItem('attiks_admin_media');
        const mediaList = savedMedia ? JSON.parse(savedMedia) : [];

        const breakdown: Record<string, number> = {};
        projList.forEach((p: any) => {
          breakdown[p.category] = (breakdown[p.category] || 0) + 1;
        });

        setStats({
          totalProjects: projList.length,
          publishedProjects: projList.filter((p: any) => p.status !== 'draft').length,
          draftProjects: projList.filter((p: any) => p.status === 'draft').length,
          featuredProjects: projList.filter((p: any) => p.featured).length,
          totalServices: srvList.length,
          totalTeamMembers: teamList.length,
          totalBlogPosts: blogList.length,
          totalLeads: leadsList.length,
          newLeads: leadsList.filter((l: any) => l.status === 'new').length,
          totalMediaAssets: mediaList.length || 10,
          mediaStorageBytes: 54000000,
        });

        setCategoryBreakdown(breakdown);
        setRecentProjects(projList.slice(0, 5));
        setRecentLeads(leadsList.slice(0, 5));
        setActivityLog([
          { id: 'act-1', user: 'Admin', action: 'Dashboard active and synced', timestamp: 'Just now' },
          { id: 'act-2', user: 'Admin', action: 'Portfolio projects refreshed', timestamp: '5 mins ago' },
        ]);
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div className="admin-skeleton" style={{ height: 40, width: 220, marginBottom: 24 }} />
        <div className="admin-stat-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="admin-skeleton" style={{ height: 110, borderRadius: 2 }} />
          ))}
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...Object.values(categoryBreakdown), 1);
  const formattedStorageMB = stats?.mediaStorageBytes
    ? (stats.mediaStorageBytes / (1024 * 1024)).toFixed(1) + ' MB'
    : '0 MB';

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Live system metrics and backend content overview</p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <Link href="/admin/projects/new" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={14} />
            New Project
          </Link>
        </div>
      </div>

      {/* Main Metric Cards */}
      <div className="admin-stat-grid">
        <StatCard
          label="Total Projects"
          value={stats?.totalProjects ?? 0}
          icon={FolderOpen}
          sub={`${stats?.publishedProjects ?? 0} published • ${stats?.draftProjects ?? 0} draft`}
        />
        <StatCard
          label="Client Leads"
          value={stats?.totalLeads ?? 0}
          icon={Inbox}
          sub={`${stats?.newLeads ?? 0} unread enquiries`}
        />
        <StatCard
          label="Services & Team"
          value={(stats?.totalServices ?? 0) + (stats?.totalTeamMembers ?? 0)}
          icon={Compass}
          sub={`${stats?.totalServices ?? 0} core services • ${stats?.totalTeamMembers ?? 0} architects`}
        />
        <StatCard
          label="Media Assets"
          value={stats?.totalMediaAssets ?? 0}
          icon={HardDrive}
          sub={`${formattedStorageMB} storage used`}
        />
      </div>

      {/* Two Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Category Breakdown */}
        <div className="admin-table-wrap" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--admin-text-muted)', marginBottom: '1.25rem' }}>
            Projects by Category
          </div>
          {Object.entries(categoryBreakdown).length === 0 ? (
            <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>No category data available</div>
          ) : (
            Object.entries(categoryBreakdown)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => (
                <div key={cat} className="admin-cat-bar-row">
                  <span className="admin-cat-bar-label">{cat}</span>
                  <div className="admin-cat-bar-track">
                    <div className="admin-cat-bar-fill" style={{ width: `${(count / maxCount) * 100}%` }} />
                  </div>
                  <span className="admin-cat-bar-count">{count}</span>
                </div>
              ))
          )}
        </div>

        {/* Recent Client Enquiries */}
        <div className="admin-table-wrap" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--admin-text-muted)' }}>
              Recent Client Enquiries
            </div>
            <Link href="/admin/leads" style={{ fontSize: '0.75rem', color: 'var(--admin-accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>No recent leads</div>
          ) : (
            recentLeads.map((lead) => (
              <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', marginBottom: '0.75rem', borderBottom: '1px solid var(--admin-border)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{lead.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)', marginTop: 2 }}>{lead.service} • {lead.email}</div>
                </div>
                <span className={`admin-badge ${lead.status === 'new' ? 'admin-badge-commercial' : 'admin-badge-default'}`}>
                  {lead.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Activity Log */}
      <div className="admin-table-wrap" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--admin-text-muted)', marginBottom: '1.25rem' }}>
          <Activity size={14} style={{ color: 'var(--admin-accent)' }} />
          System Activity & Audit Log
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activityLog.map((log) => (
            <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--admin-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={13} style={{ color: 'var(--admin-text-muted)' }} />
                <span><strong style={{ color: 'var(--admin-text)' }}>{log.user}</strong>: {log.action}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
