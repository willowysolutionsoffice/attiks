'use client';

import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

export interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  options?: string[];        // for type=select
  required?: boolean;
  placeholder?: string;
}

interface Props {
  title: string;
  fields: FieldDef[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  loading?: boolean;
  error?: string | null;
  submitLabel?: string;
}

export default function FormModal({
  title,
  fields,
  values,
  onChange,
  onSubmit,
  onClose,
  loading = false,
  error,
  submitLabel = 'Save',
}: Props) {
  const firstRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null);

  // Focus first field on open
  useEffect(() => {
    setTimeout(() => firstRef.current?.focus(), 50);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <div className="admin-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <span className="admin-modal-title">{title}</span>
          <button className="admin-btn-icon" onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="admin-modal-body">
            {error && <div className="admin-error-banner">{error}</div>}

            {fields.map((field, i) => (
              <div key={field.key} className="admin-field">
                <label className="admin-label" htmlFor={`modal-field-${field.key}`}>
                  {field.label}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    id={`modal-field-${field.key}`}
                    className="admin-textarea"
                    value={values[field.key] ?? ''}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    ref={i === 0 ? (el) => { firstRef.current = el; } : undefined}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={`modal-field-${field.key}`}
                    className="admin-select"
                    value={values[field.key] ?? ''}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    ref={i === 0 ? (el) => { firstRef.current = el; } : undefined}
                  >
                    <option value="">Select…</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`modal-field-${field.key}`}
                    type={field.type}
                    className="admin-input"
                    value={values[field.key] ?? ''}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    ref={i === 0 ? (el) => { firstRef.current = el; } : undefined}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="admin-modal-footer">
            <button type="button" className="admin-btn admin-btn-ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? 'Saving…' : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
