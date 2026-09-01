'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { RolePermission } from '@/data/projects';

const initialRoles: RolePermission[] = [
  {
    id: 'role-1',
    role: 'Admin',
    description: 'Full studio access across all projects, team, media, and site settings.',
    permissions: ['all:manage', 'projects:write', 'team:write', 'media:write'],
  },
  {
    id: 'role-2',
    role: 'Editor',
    description: 'Can curate project details, media gallery, and journal essays.',
    permissions: ['projects:write', 'media:write', 'blog:write'],
  },
  {
    id: 'role-3',
    role: 'Viewer',
    description: 'Read-only viewing of dashboard analytics, project lists, and client inquiries.',
    permissions: ['projects:read', 'leads:read'],
  },
];

const COLUMNS: Column<RolePermission>[] = [
  { key: 'role', label: 'Role Title', sortable: true, render: 'badge' },
  { key: 'description', label: 'Description', render: 'truncate' },
];

const FIELDS: FieldDef[] = [
  { key: 'role', label: 'Role Title', type: 'select', options: ['Admin', 'Editor', 'Viewer'] },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Permission description...' },
];

export default function RolesAdminPage() {
  return (
    <DynamicAdminManager<RolePermission>
      title="Roles &amp; Permissions"
      subtitle="Security authorization levels for studio members"
      storageKey="attiks_admin_roles"
      initialData={initialRoles}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="role-"
      exportFileName="roles.json"
      addLabel="Define Role"
    />
  );
}
