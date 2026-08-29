'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, Calendar, Trash2, CheckCircle } from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { LeadEnquiry } from '@/lib/db';

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<LeadEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<LeadEnquiry | null>(null);

  async function loadLeads() {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) setLeads(data.leads);
    } catch (err) {
      console.error('Failed to load leads:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function updateStatus(id: string, newStatus: 'new' | 'contacted' | 'archived') {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/leads/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) setLeads((prev) => prev.filter((l) => l.id !== deleteTarget.id));
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
    setDeleteTarget(null);
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Client Leads & Contact Enquiries</h1>
          <p className="admin-page-subtitle">Track project enquiries submitted via the website contact form</p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Service Requested</th>
                <th>Contact Information</th>
                <th>Message Snippet</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th style={{ width: 100 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}><td colSpan={7}><div className="admin-skeleton" style={{ height: 36 }} /></td></tr>
                ))
              ) : leads.length === 0 ? (
                <tr><td colSpan={7}><div className="admin-empty">No enquiries received yet.</div></td></tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td><span style={{ fontWeight: 500 }}>{lead.name}</span></td>
                    <td><span className="admin-badge admin-badge-commercial">{lead.service}</span></td>
                    <td>
                      <div style={{ fontSize: '0.78rem' }}>
                        <div><Mail size={12} style={{ display: 'inline', marginRight: 4 }} />{lead.email}</div>
                        {lead.phone && <div style={{ color: 'var(--admin-text-muted)', marginTop: 2 }}><Phone size={12} style={{ display: 'inline', marginRight: 4 }} />{lead.phone}</div>}
                      </div>
                    </td>
                    <td><span title={lead.message} style={{ maxWidth: 280, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.message}</span></td>
                    <td><span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>{lead.createdAt}</span></td>
                    <td>
                      <select
                        className="admin-select"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as any)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td>
                      <button className="admin-btn-icon danger" onClick={() => setDeleteTarget(lead)} title="Delete Lead">
                        <Trash2 size={14} />
                      </button>
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
          title="Delete Lead Record"
          message={`Remove lead record for "${deleteTarget.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
