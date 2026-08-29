'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  title?: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
  loading = false,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCancel]);

  return (
    <div className="admin-overlay" role="alertdialog" aria-modal="true" onClick={onCancel}>
      <div className="admin-modal admin-modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <AlertTriangle size={16} style={{ color: 'var(--admin-danger)' }} />
            <span className="admin-modal-title">{title}</span>
          </div>
        </div>

        <div className="admin-modal-body">
          <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-muted)', lineHeight: 1.6 }}>
            {message}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'rgba(224,82,82,0.8)' }}>
            This action cannot be undone.
          </p>
        </div>

        <div className="admin-modal-footer">
          <button className="admin-btn admin-btn-ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
