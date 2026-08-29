'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import FormModal, { FieldDef } from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { ServiceItem } from '@/lib/db';

const FIELDS: FieldDef[] = [
  { key: 'title', label: 'Service Title', type: 'text', placeholder: 'e.g. Masterplanning' },
  { key: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Core Service' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Scope of service...' },
];

export default function ServicesAdminPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({ title: '', category: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);

  async function loadServices() {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success) setServices(data.services);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  function openCreate() {
    setFormValues({ title: '', category: '', description: '' });
    setEditingId(null);
    setModal('create');
  }

  function openEdit(item: ServiceItem) {
    setFormValues({ title: item.title, category: item.category, description: item.description });
    setEditingId(item.id);
    setModal('edit');
  }

  async function handleSave() {
    try {
      if (modal === 'edit' && editingId) {
        const res = await fetch(`/api/services/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        if (res.ok) loadServices();
      } else {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        if (res.ok) loadServices();
      }
    } catch (err) {
      console.error('Failed to save service:', err);
    }
    setModal(null);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/services/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) setServices((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    } catch (err) {
      console.error('Failed to delete service:', err);
    }
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Services</h1>
          <p className="admin-page-subtitle">Manage core architectural & interior service offerings</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={14} />
          Add Service
        </button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}><td colSpan={4}><div className="admin-skeleton" style={{ height: 32 }} /></td></tr>
                ))
              ) : services.length === 0 ? (
                <tr><td colSpan={4}><div className="admin-empty">No services found.</div></td></tr>
              ) : (
                services.map((srv) => (
                  <tr key={srv.id}>
                    <td><span style={{ fontWeight: 500 }}>{srv.title}</span></td>
                    <td><span className="admin-badge admin-badge-commercial">{srv.category}</span></td>
                    <td><span title={srv.description} style={{ maxWidth: 360, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{srv.description}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="admin-btn-icon" onClick={() => openEdit(srv)} title="Edit"><Edit2 size={14} /></button>
                        <button className="admin-btn-icon danger" onClick={() => setDeleteTarget(srv)} title="Delete"><Trash2 size={14} /></button>
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
          title={modal === 'create' ? 'Add Service' : 'Edit Service'}
          fields={FIELDS}
          values={formValues}
          onChange={(k, v) => setFormValues((prev) => ({ ...prev, [k]: v }))}
          onSubmit={handleSave}
          onClose={() => setModal(null)}
          submitLabel={modal === 'create' ? 'Create' : 'Save Changes'}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Service"
          message={`Remove "${deleteTarget.title}" from core services?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
