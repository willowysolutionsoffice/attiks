'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2, Upload } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const mainFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);

  const [formValues, setFormValues] = useState({
    title: '',
    category: 'residential',
    location: '',
    year: '',
    image: '',
    scope: '',
    area: '',
    description: '',
    highlights: '',
    gallery: '',
    status: 'published',
    featured: false,
  });

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        if (data.success && data.project) {
          const p = data.project;
          setFormValues({
            title: p.title || '',
            category: p.category || 'residential',
            location: p.location || '',
            year: p.year || '',
            image: p.image || '',
            scope: p.scope || '',
            area: p.area || '',
            description: p.description || '',
            highlights: Array.isArray(p.highlights) ? p.highlights.join('\n') : p.highlights || '',
            gallery: Array.isArray(p.gallery) ? p.gallery.join('\n') : p.gallery || '',
            status: p.status || 'published',
            featured: Boolean(p.featured),
          });
        }
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProject();
  }, [id]);

  async function handleMainImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormValues((prev) => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error('Failed to upload main image:', err);
    } finally {
      setUploadingMain(false);
      e.target.value = '';
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    try {
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          newUrls.push(data.url);
        }
      }

      if (newUrls.length > 0) {
        setFormValues((prev) => {
          const currentGallery = prev.gallery
            ? prev.gallery.split('\n').map((g) => g.trim()).filter((g) => g.length > 0)
            : [];
          const updated = [...currentGallery, ...newUrls].join('\n');
          return { ...prev, gallery: updated };
        });
      }
    } catch (err) {
      console.error('Failed to upload gallery images:', err);
    } finally {
      setUploadingGallery(false);
      e.target.value = '';
    }
  }

  function handleRemoveGalleryItem(indexToRemove: number) {
    const currentList = formValues.gallery
      ? formValues.gallery.split('\n').map((g) => g.trim()).filter((g) => g.length > 0)
      : [];
    const updated = currentList.filter((_, idx) => idx !== indexToRemove);
    setFormValues({ ...formValues, gallery: updated.join('\n') });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formValues,
        highlights: formValues.highlights
          ? formValues.highlights.split('\n').map((h) => h.trim()).filter((h) => h.length > 0)
          : [],
        gallery: formValues.gallery
          ? formValues.gallery.split('\n').map((g) => g.trim()).filter((g) => g.length > 0)
          : [],
      };

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/projects');
      }
    } catch (err) {
      console.error('Failed to update project:', err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/projects');
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '2rem 0' }}>
        <div className="admin-skeleton" style={{ height: 40, width: 260, marginBottom: 20 }} />
        <div className="admin-skeleton" style={{ height: 400, width: '100%' }} />
      </div>
    );
  }

  const galleryList = formValues.gallery
    ? formValues.gallery.split('\n').map((g) => g.trim()).filter((g) => g.length > 0)
    : [];

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={mainFileInputRef}
        onChange={handleMainImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={galleryFileInputRef}
        onChange={handleGalleryUpload}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />

      <div className="admin-page-header">
        <div>
          <Link
            href="/admin/projects"
            style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <h1 className="admin-page-title">Edit Project</h1>
          <p className="admin-page-subtitle">Update details for "{formValues.title}"</p>
        </div>
        <button className="admin-btn admin-btn-danger" onClick={() => setDeleteConfirm(true)}>
          <Trash2 size={14} />
          Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-table-wrap" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div className="admin-field">
            <label className="admin-label">Project Title *</label>
            <input
              type="text"
              className="admin-input"
              value={formValues.title}
              onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
              required
            />
          </div>

          <div className="admin-field">
            <label className="admin-label">Project Category *</label>
            <select
              className="admin-select"
              value={formValues.category}
              onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="institutional">Institutional</option>
              <option value="cultural">Cultural</option>
              <option value="interior">Interior</option>
              <option value="hospitality">Hospitality</option>
            </select>
          </div>

          <div className="admin-field">
            <label className="admin-label">Location</label>
            <input
              type="text"
              className="admin-input"
              value={formValues.location}
              onChange={(e) => setFormValues({ ...formValues, location: e.target.value })}
            />
          </div>

          <div className="admin-field">
            <label className="admin-label">Completion Year</label>
            <input
              type="text"
              className="admin-input"
              value={formValues.year}
              onChange={(e) => setFormValues({ ...formValues, year: e.target.value })}
            />
          </div>

          {/* Main Cover Image Field & Upload Button */}
          <div className="admin-field" style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className="admin-label" style={{ margin: 0 }}>Project Main Cover Image *</label>
              <button
                type="button"
                className="admin-btn admin-btn-ghost"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => mainFileInputRef.current?.click()}
                disabled={uploadingMain}
              >
                <Upload size={13} />
                {uploadingMain ? 'Uploading Image...' : 'Upload Image File'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="text"
                className="admin-input"
                style={{ flex: 1 }}
                value={formValues.image}
                onChange={(e) => setFormValues({ ...formValues, image: e.target.value })}
                required
              />
              {formValues.image && (
                <div style={{ width: 64, height: 40, position: 'relative', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--admin-border)', flexShrink: 0, background: '#000' }}>
                  <img src={formValues.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          </div>

          <div className="admin-field">
            <label className="admin-label">Built Area (sq.ft)</label>
            <input
              type="text"
              className="admin-input"
              value={formValues.area}
              onChange={(e) => setFormValues({ ...formValues, area: e.target.value })}
            />
          </div>

          <div className="admin-field">
            <label className="admin-label">Project Scope</label>
            <input
              type="text"
              className="admin-input"
              value={formValues.scope}
              onChange={(e) => setFormValues({ ...formValues, scope: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-field" style={{ marginBottom: '1.25rem' }}>
          <label className="admin-label">Project Description</label>
          <textarea
            className="admin-textarea"
            rows={4}
            value={formValues.description}
            onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
          />
        </div>

        <div className="admin-field" style={{ marginBottom: '1.25rem' }}>
          <label className="admin-label">Project Key Highlights (One per line)</label>
          <textarea
            className="admin-textarea"
            rows={3}
            value={formValues.highlights}
            onChange={(e) => setFormValues({ ...formValues, highlights: e.target.value })}
          />
        </div>

        {/* Project Gallery Field & Upload Button */}
        <div className="admin-field" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <label className="admin-label" style={{ margin: 0 }}>Project Gallery Images</label>
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              onClick={() => galleryFileInputRef.current?.click()}
              disabled={uploadingGallery}
            >
              <Upload size={13} />
              {uploadingGallery ? 'Uploading Gallery...' : 'Upload Gallery Image(s)'}
            </button>
          </div>

          <textarea
            className="admin-textarea"
            rows={3}
            value={formValues.gallery}
            onChange={(e) => setFormValues({ ...formValues, gallery: e.target.value })}
          />

          {/* Live Gallery Thumbnail Preview */}
          {galleryList.length > 0 && (
            <div style={{ marginTop: '0.85rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)', display: 'block', marginBottom: 6 }}>
                Gallery Preview ({galleryList.length} images):
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.75rem' }}>
                {galleryList.map((imgUrl, idx) => (
                  <div key={idx} style={{ position: 'relative', height: 75, borderRadius: 3, overflow: 'hidden', border: '1px solid var(--admin-border)', background: '#000' }}>
                    <img src={imgUrl} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryItem(idx)}
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        background: 'rgba(0,0,0,0.75)',
                        color: '#ff4d4f',
                        border: 'none',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', padding: '1rem', background: 'var(--admin-surface-2)', borderRadius: 2 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="checkbox"
              checked={formValues.featured}
              onChange={(e) => setFormValues({ ...formValues, featured: e.target.checked })}
            />
            <span>Feature on Home Showcase Grid</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="radio"
              name="status"
              value="published"
              checked={formValues.status === 'published'}
              onChange={() => setFormValues({ ...formValues, status: 'published' })}
            />
            <span>Published</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
            <input
              type="radio"
              name="status"
              value="draft"
              checked={formValues.status === 'draft'}
              onChange={() => setFormValues({ ...formValues, status: 'draft' })}
            />
            <span>Draft</span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <Link href="/admin/projects" className="admin-btn admin-btn-ghost">
            Cancel
          </Link>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting || uploadingMain || uploadingGallery}>
            <Save size={14} />
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {deleteConfirm && (
        <ConfirmDialog
          title="Delete Project"
          message={`Are you sure you want to permanently delete "${formValues.title}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
