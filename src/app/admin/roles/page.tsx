'use client';

import { useEffect, useState } from 'react';
import { Shield, Check, Lock } from 'lucide-react';
import { RolePermission } from '@/lib/db';

export default function RolesAdminPage() {
  const [roles, setRoles] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoles() {
      try {
        const res = await fetch('/api/roles');
        const data = await res.json();
        if (data.success) setRoles(data.roles);
      } catch (err) {
        console.error('Failed to load RBAC roles:', err);
      } finally {
        setLoading(false);
      }
    }
    loadRoles();
  }, []);

  const allModules = [
    { key: 'dashboard:read', label: 'View Dashboard & Analytics' },
    { key: 'projects:write', label: 'Create & Edit Projects' },
    { key: 'projects:delete', label: 'Delete Projects' },
    { key: 'content:write', label: 'Manage Services & Team' },
    { key: 'media:write', label: 'Upload & Audit Media Assets' },
    { key: 'users:write', label: 'Manage System User Accounts' },
    { key: 'settings:write', label: 'Update Site & System Settings' },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Role-Based Access Control (RBAC)</h1>
          <p className="admin-page-subtitle">Permissions matrix defining access control levels for Admin, Editor, and Viewer roles</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="admin-skeleton" style={{ height: 160 }} />
          ))
        ) : (
          roles.map((r) => (
            <div key={r.id} className="admin-table-wrap" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <Shield size={18} style={{ color: r.role === 'Admin' ? 'var(--admin-accent)' : r.role === 'Editor' ? 'var(--admin-gold)' : 'var(--admin-text-muted)' }} />
                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{r.role}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                {r.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {allModules.map((mod) => {
                  const hasPerm = r.permissions.includes(mod.key);
                  return (
                    <div key={mod.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span>{mod.label}</span>
                      {hasPerm ? (
                        <span style={{ color: 'var(--admin-success)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Check size={13} /> Granted
                        </span>
                      ) : (
                        <span style={{ color: 'var(--admin-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Lock size={12} /> Restricted
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
