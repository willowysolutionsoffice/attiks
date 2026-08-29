'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import FormModal, { FieldDef } from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { BlogPost } from '@/lib/db';

const FIELDS: FieldDef[] = [
  { key: 'title', label: 'Article Title', type: 'text', placeholder: 'Passive Cooling Strategies...' },
  { key: 'author', label: 'Author Name', type: 'text', placeholder: 'Ar. Anoop Kumar' },
  { key: 'publishedAt', label: 'Publication Date', type: 'text', placeholder: '2026-08-25' },
  { key: 'image', label: 'Cover Image URL', type: 'text', placeholder: '/architecture.webp' },
  { key: 'summary', label: 'Summary / Excerpt', type: 'textarea', placeholder: 'Brief overview for cards...' },
  { key: 'content', label: 'Full Content', type: 'textarea', placeholder: 'Main article body text...' },
];

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    title: '', author: '', publishedAt: '', image: '', summary: '', content: '', status: 'published'
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  async function loadPosts() {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (err) {
      console.error('Failed to load blog posts:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function openCreate() {
    setFormValues({
      title: '', author: 'ATTIKS Editorial', publishedAt: new Date().toISOString().split('T')[0],
      image: '/architecture.webp', summary: '', content: '', status: 'published'
    });
    setEditingId(null);
    setModal('create');
  }

  function openEdit(post: BlogPost) {
    setFormValues({
      title: post.title, author: post.author, publishedAt: post.publishedAt,
      image: post.image, summary: post.summary, content: post.content, status: post.status
    });
    setEditingId(post.id);
    setModal('edit');
  }

  async function handleSave() {
    try {
      if (modal === 'edit' && editingId) {
        const res = await fetch(`/api/blog/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        if (res.ok) loadPosts();
      } else {
        const res = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        if (res.ok) loadPosts();
      }
    } catch (err) {
      console.error('Failed to save blog post:', err);
    }
    setModal(null);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/blog/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) setPosts((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    } catch (err) {
      console.error('Failed to delete blog post:', err);
    }
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Blog & Media Articles</h1>
          <p className="admin-page-subtitle">Publish architectural insights, press features, and publications</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={14} />
          New Article
        </button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Published Date</th>
                <th>Status</th>
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}><td colSpan={6}><div className="admin-skeleton" style={{ height: 36 }} /></td></tr>
                ))
              ) : posts.length === 0 ? (
                <tr><td colSpan={6}><div className="admin-empty">No blog articles published.</div></td></tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td><img src={post.image || '/architecture.webp'} alt="" className="admin-table-img" /></td>
                    <td><span style={{ fontWeight: 500 }}>{post.title}</span></td>
                    <td>{post.author}</td>
                    <td>{post.publishedAt}</td>
                    <td>
                      <span className={`admin-badge ${post.status === 'published' ? 'admin-badge-residential' : 'admin-badge-default'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="admin-btn-icon" onClick={() => openEdit(post)} title="Edit"><Edit2 size={14} /></button>
                        <button className="admin-btn-icon danger" onClick={() => setDeleteTarget(post)} title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <FormModal
          title={modal === 'create' ? 'Publish Article' : 'Edit Article'}
          fields={FIELDS}
          values={formValues}
          onChange={(k, v) => setFormValues((prev) => ({ ...prev, [k]: v }))}
          onSubmit={handleSave}
          onClose={() => setModal(null)}
          submitLabel={modal === 'create' ? 'Publish' : 'Save Changes'}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Blog Article"
          message={`Are you sure you want to delete "${deleteTarget.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
