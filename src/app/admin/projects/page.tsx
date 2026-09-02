'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, Download, CheckCircle, Eye, EyeOff } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import StatusBadge from '@/components/admin/StatusBadge';
import { projects as initialProjects, Project } from '@/data/projects';

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  function loadProjects() {
    try {
      const saved = localStorage.getItem('attiks_admin_projects');
      if (saved) {
        setProjects(JSON.parse(saved));
      } else {
        setProjects(initialProjects);
      }
    } catch {
      setProjects(initialProjects);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function saveProjects(newProjects: Project[]) {
    setProjects(newProjects);
    try {
      localStorage.setItem('attiks_admin_projects', JSON.stringify(newProjects));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const updated = projects.filter((p) => p.id !== deleteTarget.id);
    saveProjects(updated);
    setDeleteTarget(null);
  }

  async function togglePublish(project: Project & { status?: string }) {
    const newStatus = project.status === 'draft' ? 'published' : 'draft';
    const updated = projects.map((p) => (p.id === project.id ? { ...p, status: newStatus as any } : p));
    saveProjects(updated);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(projects, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Projects</h1>
          <p className="admin-page-subtitle">Manage architectural portfolio projects & live backend database</p>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button className="admin-btn admin-btn-ghost" onClick={handleExport} title="Download projects JSON">
            <Download size={14} />
            Export JSON
          </button>
          <Link href="/admin/projects/new" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={14} />
            Add Project
          </Link>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <span className="admin-table-title">{filtered.length} Projects</span>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              className="admin-select"
              style={{ width: 'auto', padding: '0.45rem 0.75rem' }}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
              <option value="institutional">Institutional</option>
              <option value="cultural">Cultural</option>
              <option value="interior">Interior</option>
              <option value="hospitality">Hospitality</option>
            </select>

            <label className="admin-search">
              <Search size={14} style={{ color: 'var(--admin-text-muted)' }} />
              <input
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Year</th>
                <th>Status</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7}>
                      <div className="admin-skeleton" style={{ height: 32, width: '100%' }} />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="admin-empty">
                      <span>No projects matching your search.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((project: any) => (
                  <tr key={project.id}>
                    <td>
                      <img
                        src={project.image || '/architecture.webp'}
                        alt=""
                        className="admin-table-img"
                      />
                    </td>
                    <td>
                      <span style={{ fontWeight: 400 }}>{project.title}</span>
                      {project.featured && (
                        <span style={{ fontSize: '0.65rem', marginLeft: 8, color: 'var(--admin-gold)', border: '1px solid var(--admin-gold)', padding: '1px 5px', borderRadius: 2 }}>
                          Featured
                        </span>
                      )}
                    </td>
                    <td>
                      <StatusBadge value={project.category} />
                    </td>
                    <td>{project.location}</td>
                    <td>{project.year}</td>
                    <td>
                      <button
                        onClick={() => togglePublish(project)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          color: project.status === 'draft' ? 'var(--admin-text-muted)' : 'var(--admin-success)',
                          fontSize: '0.75rem',
                        }}
                        title="Click to toggle status"
                      >
                        {project.status === 'draft' ? <EyeOff size={14} /> : <Eye size={14} />}
                        <span style={{ textTransform: 'capitalize' }}>{project.status || 'published'}</span>
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="admin-btn-icon"
                          title="Edit Project"
                        >
                          <Edit2 size={14} />
                        </Link>
                        <button
                          className="admin-btn-icon danger"
                          onClick={() => setDeleteTarget(project)}
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Project"
          message={`Are you sure you want to delete "${deleteTarget.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
