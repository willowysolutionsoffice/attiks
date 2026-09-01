'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { team as initialTeam, TeamMember } from '@/data/projects';

const COLUMNS: Column<TeamMember>[] = [
  { key: 'image', label: 'Photo', render: 'image' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true, render: 'badge' },
  { key: 'experience', label: 'Experience', sortable: true },
  { key: 'bio', label: 'Bio', render: 'truncate' },
];

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Ar. Anoop Kumar' },
  { key: 'role', label: 'Designation / Role', type: 'text', placeholder: 'Principal Architect' },
  { key: 'experience', label: 'Experience', type: 'text', placeholder: '18+ Years' },
  { key: 'image', label: 'Photo URL', type: 'text', placeholder: '/images/hero-1.webp' },
  { key: 'bio', label: 'Biography', type: 'textarea', placeholder: 'Professional background...' },
];

export default function TeamAdminPage() {
  return (
    <DynamicAdminManager<TeamMember>
      title="Team &amp; Architects"
      subtitle="Architectural partners and studio staff profiles"
      storageKey="attiks_admin_team"
      initialData={initialTeam}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="team-"
      exportFileName="team.json"
      addLabel="Add Architect"
    />
  );
}
