'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import FormModal, { FieldDef } from '@/components/admin/FormModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { TeamMember } from '@/lib/db';

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Ar. Anoop Kumar' },
  { key: 'role', label: 'Architectural Designation', type: 'text', placeholder: 'Principal Architect' },
  { key: 'experience', label: 'Years of Experience', type: 'text', placeholder: '15+ Years' },
  { key: 'image', label: 'Photo URL', type: 'text', placeholder: '/images/hero-1.webp' },
  { key: 'bio', label: 'Biography', type: 'textarea', placeholder: 'Professional background...' },
];

export default function TeamAdminPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<'create' | 'edit' | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({ name: '', role: '', experience: '', image: '', bio: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

  async function loadTeam() {
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (data.success) setTeam(data.team);
    } catch (err) {
      console.error('Failed to load team members:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeam();
  }, []);

  function openCreate() {
    setFormValues({ name: '', role: '', experience: '', image: '', bio: '' });
    setEditingId(null);
    setModal('create');
  }

  function openEdit(member: TeamMember) {
    setFormValues({ name: member.name, role: member.role, experience: member.experience || '', image: member.image, bio: member.bio });
    setEditingId(member.id);
    setModal('edit');
  }

  async function handleSave() {
    try {
      if (modal === 'edit' && editingId) {
        const res = await fetch(`/api/team/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        if (res.ok) loadTeam();
      } else {
        const res = await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        if (res.ok) loadTeam();
      }
    } catch (err) {
      console.error('Failed to save team member:', err);
    }
    setModal(null);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/team/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) setTeam((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    } catch (err) {
      console.error('Failed to delete team member:', err);
    }
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Team & Architects</h1>
          <p className="admin-page-subtitle">Manage architectural partners, leads, and staff profiles</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openCreate}>
          <Plus size={14} />
          Add Architect
        </button>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Photo</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Experience</th>
                <th>Bio</th>
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}><td colSpan={6}><div className="admin-skeleton" style={{ height: 36 }} /></td></tr>
                ))
              ) : team.length === 0 ? (
                <tr><td colSpan={6}><div className="admin-empty">No team members registered.</div></td></tr>
              ) : (
                team.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <img src={member.image || '/images/hero-1.webp'} alt="" className="admin-table-img" style={{ borderRadius: '50%', width: 36, height: 36 }} />
                    </td>
                    <td><span style={{ fontWeight: 500 }}>{member.name}</span></td>
                    <td><span className="admin-badge admin-badge-residential">{member.role}</span></td>
                    <td>{member.experience || 'N/A'}</td>
                    <td><span title={member.bio} style={{ maxWidth: 280, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.bio}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="admin-btn-icon" onClick={() => openEdit(member)} title="Edit"><Edit2 size={14} /></button>
                        <button className="admin-btn-icon danger" onClick={() => setDeleteTarget(member)} title="Delete"><Trash2 size={14} /></button>
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
          title={modal === 'create' ? 'Add Architect' : 'Edit Architect'}
          fields={FIELDS}
          values={formValues}
          onChange={(k, v) => setFormValues((prev) => ({ ...prev, [k]: v }))}
          onSubmit={handleSave}
          onClose={() => setModal(null)}
          submitLabel={modal === 'create' ? 'Add Member' : 'Save Changes'}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete Architect Profile"
          message={`Remove "${deleteTarget.name}" from team directory?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
