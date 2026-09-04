'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Quote, CheckCircle2, X } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  designation: string;
  order?: number;
  active?: boolean;
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [formData, setFormData] = useState({ quote: '', author: '', designation: '' });
  const [saving, setSaving] = useState(false);

  // Delete State
  const [deleteTarget, setDeleteTarget] = useState<TestimonialItem | null>(null);

  async function loadTestimonials() {
    setLoading(true);
    try {
      const res = await fetch('/api/testimonials');
      const json = await res.json();
      const list = Array.isArray(json.data) ? json.data : json.data?.items || [];
      setTestimonials(list);
    } catch {
      setError('Failed to load testimonials.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  function handleOpenAdd() {
    setEditingItem(null);
    setFormData({ quote: '', author: '', designation: '' });
    setModalOpen(true);
  }

  function handleOpenEdit(item: TestimonialItem) {
    setEditingItem(item);
    setFormData({ quote: item.quote, author: item.author, designation: item.designation });
    setModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.quote.trim() || !formData.author.trim() || !formData.designation.trim()) {
      return;
    }
    setSaving(true);
    try {
      if (editingItem) {
        // Edit
        const res = await fetch(`/api/testimonials/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setTestimonials((prev) =>
            prev.map((t) => (t.id === editingItem.id ? { ...t, ...formData } : t))
          );
          setModalOpen(false);
        }
      } else {
        // Create
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, order: testimonials.length + 1, active: true }),
        });
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setTestimonials((prev) => [...prev, json.data]);
          } else {
            loadTestimonials();
          }
          setModalOpen(false);
        }
      }
    } catch (err: any) {
      console.error('Save testimonial error:', err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id;
    setTestimonials((prev) => prev.filter((t) => t.id !== targetId));
    setDeleteTarget(null);

    try {
      await fetch(`/api/testimonials/${targetId}`, { method: 'DELETE' });
    } catch {
      loadTestimonials();
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: 500, margin: 0, color: 'var(--admin-text)' }}>
            Client Testimonials
          </h1>
          <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
            Manage client testimonials displayed on the homepage showcase.
          </span>
        </div>

        <button
          onClick={handleOpenAdd}
          className="admin-btn admin-btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <Plus size={15} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid of Testimonials */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="admin-table-wrap" style={{ padding: '1.5rem', height: 180 }}>
              <div className="admin-skeleton" style={{ height: 20, width: '40%', marginBottom: 12 }} />
              <div className="admin-skeleton" style={{ height: 50, width: '100%', marginBottom: 12 }} />
              <div className="admin-skeleton" style={{ height: 16, width: '60%' }} />
            </div>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="admin-table-wrap" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <Quote size={32} style={{ color: 'var(--admin-text-muted)', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: '0 0 6px', color: 'var(--admin-text)' }}>
            No Testimonials Found
          </h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--admin-text-muted)', margin: '0 0 16px' }}>
            Click &ldquo;Add Testimonial&rdquo; to create your first client quote for the homepage.
          </p>
          <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
            Add Testimonial
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="admin-table-wrap"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <Quote size={20} style={{ color: '#09090b', opacity: 0.3, marginBottom: '0.75rem' }} />
                <p
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.55,
                    color: 'var(--admin-text)',
                    margin: '0 0 1.25rem',
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderTop: '1px solid var(--admin-border)',
                  paddingTop: '1rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--admin-text)' }}>
                    {item.author}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
                    {item.designation}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    className="admin-btn-icon"
                    onClick={() => handleOpenEdit(item)}
                    title="Edit Testimonial"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    className="admin-btn-icon danger"
                    onClick={() => setDeleteTarget(item)}
                    title="Delete Testimonial"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.55)',
            backdropFilter: 'blur(6px)',
            padding: '20px',
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 520,
              padding: '2.25rem',
              background: '#ffffff',
              border: '1px solid #e4e4e7',
              borderRadius: 8,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              color: '#09090b',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: '#f4f4f5',
                border: '1px solid #e4e4e7',
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#71717a',
                cursor: 'pointer',
              }}
            >
              <X size={15} />
            </button>

            <h2 style={{ fontSize: '1.3rem', fontWeight: 500, margin: '0 0 1.25rem', color: '#09090b' }}>
              {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
            </h2>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="admin-label">Client Quote *</label>
                <textarea
                  className="admin-textarea"
                  rows={4}
                  required
                  placeholder="Enter the client's testimonial..."
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="admin-label">Author Name *</label>
                  <input
                    type="text"
                    className="admin-input"
                    required
                    placeholder="e.g. Arjun Menon"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label className="admin-label">Project / Location / Role</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="e.g. Private Villa, Kochi or Soori Residence"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-ghost"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn admin-btn-primary"
                  style={{ background: '#09090b', color: '#fff' }}
                >
                  {saving ? 'Saving...' : editingItem ? 'Update Testimonial' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <ConfirmDialog
          title="Delete Testimonial"
          message={`Are you sure you want to delete the testimonial from "${deleteTarget.author}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
