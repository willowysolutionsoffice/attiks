'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { services as initialServices, ServiceItem } from '@/data/projects';

const COLUMNS: Column<ServiceItem>[] = [
  { key: 'title', label: 'Service Title', sortable: true },
  { key: 'category', label: 'Category', sortable: true, render: 'badge' },
  { key: 'description', label: 'Description', render: 'truncate' },
];

const FIELDS: FieldDef[] = [
  { key: 'title', label: 'Service Title', type: 'text', placeholder: 'e.g. Architectural Design' },
  { key: 'category', label: 'Category', type: 'text', placeholder: 'e.g. Core Service' },
  { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Scope of service...' },
];

export default function ServicesAdminPage() {
  return (
    <DynamicAdminManager<ServiceItem>
      title="Services &amp; Capabilities"
      subtitle="Architectural and design offerings"
      storageKey="attiks_admin_services"
      initialData={initialServices}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="srv-"
      exportFileName="services.json"
      addLabel="Add Service"
    />
  );
}
