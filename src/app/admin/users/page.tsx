'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Shield, UserCheck } from 'lucide-react';
import FormModal, { FieldDef } from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { UserAccount } from '@/lib/db';

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Ar. Anoop Kumar' },
  { key: 'email', label: 'Email Address', type: 'text', placeholder: 'admin@attiks.in' },
  { key: 'role', label: 'Assigned Role', type: 'select', options: ['Admin', 'Editor', 'Viewer'] },
];

export default function UsersAdminPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({ name: '', email: '', role: 'Editor' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserAccount | null>(null);

  async function loadUsers() {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error('Failed to load user accounts:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function openCreate() {
    setFormValues({ name: '', email: '', role: 'Editor' });
    setEditingId(null);
    setModal('create');
  }

  function openEdit(user: UserAccount) {
    setFormValues({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setModal('edit');
  }

  async function handleSave() {
    try {
      if (modal === 'edit' && editingId) {
        const res = await fetch(`/api/users/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        if (res.ok) loadUsers();
      } else {
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        if (res.ok) loadUsers();
      }
    } catch (err) {
      console.error('Failed to save user account:', err);
    }
    setModal(null);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/users/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    } catch (err) {
      console.error('Failed to delete user account:', err);
    }
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">User Management</h1>
          <p className="admin-page-subtitle">Control team access credentials, roles, and administrative accounts</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={14} />
          Create User
        </button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Active</th>
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}><td colSpan={6}><div className="admin-skeleton" style={{ height: 36 }} /></td></tr>
                ))
              ) : users.length === 0 ? (
                <tr><td colSpan={6}><div className="admin-empty">No user accounts found.</div></td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td><span style={{ fontWeight: 500 }}>{user.name}</span></td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`admin-badge ${user.role === 'Admin' ? 'admin-badge-commercial' : user.role === 'Editor' ? 'admin-badge-residential' : 'admin-badge-default'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td><span style={{ fontSize: '0.78rem', color: 'var(--admin-success)' }}>{user.status}</span></td>
                    <td><span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>{user.lastActive}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="admin-btn-icon" onClick={() => openEdit(user)} title="Edit Role"><Edit2 size={14} /></button>
                        <button className="admin-btn-icon danger" onClick={() => setDeleteTarget(user)} title="Delete User"><Trash2 size={14} /></button>
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
          title={modal === 'create' ? 'Create User Account' : 'Edit User Account'}
          fields={FIELDS}
          values={formValues}
          onChange={(k, v) => setFormValues((prev) => ({ ...prev, [k]: v }))}
          onSubmit={handleSave}
          onClose={() => setModal(null)}
          submitLabel={modal === 'create' ? 'Create Account' : 'Save Changes'}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete User Account"
          message={`Revoke access for "${deleteTarget.name}" (${deleteTarget.email})?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
