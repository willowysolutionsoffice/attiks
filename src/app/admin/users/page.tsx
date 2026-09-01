'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { UserAccount } from '@/data/projects';

const initialUsers: UserAccount[] = [
  {
    id: 'usr-1',
    name: 'Principal Architect',
    email: 'admin@attiks.in',
    role: 'Admin',
    status: 'active',
    lastActive: 'Just now',
  },
  {
    id: 'usr-2',
    name: 'Content Lead',
    email: 'editor@attiks.in',
    role: 'Editor',
    status: 'active',
    lastActive: '2 hours ago',
  },
];

const COLUMNS: Column<UserAccount>[] = [
  { key: 'name', label: 'User Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true, render: 'badge' },
  { key: 'status', label: 'Status', sortable: true, render: 'badge' },
  { key: 'lastActive', label: 'Last Active', sortable: true },
];

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Name' },
  { key: 'email', label: 'Email Address', type: 'text', placeholder: 'user@attiks.in' },
  { key: 'role', label: 'Role', type: 'select', options: ['Admin', 'Editor', 'Viewer'] },
  { key: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] },
];

export default function UsersAdminPage() {
  return (
    <DynamicAdminManager<UserAccount>
      title="User Accounts &amp; Access"
      subtitle="Manage practice collaborators and administrators"
      storageKey="attiks_admin_users"
      initialData={initialUsers}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="usr-"
      exportFileName="users.json"
      addLabel="Add User"
    />
  );
}
