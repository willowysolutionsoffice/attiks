'use client';

import { useEffect, useState, useRef } from 'react';
import { Upload, Trash2, AlertTriangle, CheckCircle, Image as ImageIcon, FileText, Search } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { MediaAsset } from '@/lib/db';

export default function MediaAdminPage() {
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<MediaAsset | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function loadMedia() {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success) setMediaList(data.media);
    } catch (err) {
      console.error('Failed to load media assets:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMedia();
  }, []);

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) loadMedia();
    } catch (err) {
      console.error('Failed to upload media asset:', err);
    }
    e.target.value = '';
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/media?id=${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== deleteTarget.id));
        if (selectedAsset?.id === deleteTarget.id) setSelectedAsset(null);
      }
    } catch (err) {
      console.error('Failed to delete media asset:', err);
    }
    setDeleteTarget(null);
  }

  const filteredMedia = mediaList.filter(
    (m) => !search || m.fileName.toLowerCase().includes(search.toLowerCase()) || m.altText.toLowerCase().includes(search.toLowerCase())
  );

  // Image Audit Metrics
  const oversizedFiles = mediaList.filter((m) => m.sizeBytes > 2 * 1024 * 1024);
  const missingAltText = mediaList.filter((m) => !m.altText.trim());

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Media Library & Image Audit</h1>
          <p className="admin-page-subtitle">Manage architectural photos, portfolio renders, format checks, and alt metadata</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleUploadClick}>
          <Upload size={14} />
          Upload Image
        </button>
      </div>

      {/* Audit Warning Banners */}
      {(oversizedFiles.length > 0 || missingAltText.length > 0) && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {oversizedFiles.length > 0 && (
            <div className="admin-error-banner" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <AlertTriangle size={16} />
              <span>Audit Alert: {oversizedFiles.length} image(s) exceed 2 MB. Prefer optimized WebP format for faster load times.</span>
            </div>
          )}
          {missingAltText.length > 0 && (
            <div className="admin-error-banner" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(196,112,63,0.15)', borderColor: 'rgba(196,112,63,0.3)', color: 'var(--admin-accent)' }}>
              <AlertTriangle size={16} />
              <span>SEO Notice: {missingAltText.length} asset(s) missing alt description text.</span>
            </div>
          )}
        </div>
      )}

      {/* Toolbar */}
      <div className="admin-table-wrap" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-table-toolbar">
          <span className="admin-table-title">{filteredMedia.length} Assets</span>
          <label className="admin-search">
            <Search size={14} style={{ color: 'var(--admin-text-muted)' }} />
            <input placeholder="Search assets by file name or alt text…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
        </div>
      </div>

      {/* Grid Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="admin-skeleton" style={{ height: 180 }} />
          ))
        ) : filteredMedia.length === 0 ? (
          <div className="admin-empty" style={{ gridColumn: '1 / -1' }}>No media assets found.</div>
        ) : (
          filteredMedia.map((asset) => {
            const isOversized = asset.sizeBytes > 2 * 1024 * 1024;
            const sizeMB = (asset.sizeBytes / (1024 * 1024)).toFixed(2) + ' MB';

            return (
              <div
                key={asset.id}
                className="admin-table-wrap"
                style={{
                  padding: '0.75rem',
                  position: 'relative',
                  borderColor: selectedAsset?.id === asset.id ? 'var(--admin-accent)' : 'var(--admin-border)',
                }}
              >
                <div style={{ position: 'relative', height: 140, overflow: 'hidden', background: '#000', borderRadius: 2, marginBottom: '0.6rem' }}>
                  <img src={asset.url} alt={asset.altText} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {isOversized && (
                    <span
                      title="Oversized asset (>2MB)"
                      style={{ position: 'absolute', top: 6, right: 6, background: 'var(--admin-danger)', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: 2 }}
                    >
                      {sizeMB}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {asset.fileName}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'var(--admin-text-muted)', marginTop: 4 }}>
                  <span>{asset.dimensions || '1920x1080'}</span>
                  <span>{sizeMB}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 8, borderTop: '1px solid var(--admin-border)' }}>
                  <button
                    className="admin-btn-icon"
                    onClick={() => setSelectedAsset(asset)}
                    title="View & Edit Metadata"
                  >
                    <FileText size={14} />
                  </button>
                  <button
                    className="admin-btn-icon danger"
                    onClick={() => setDeleteTarget(asset)}
                    title="Delete Asset"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Media Asset"
          message={`Delete "${deleteTarget.fileName}" permanently?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
