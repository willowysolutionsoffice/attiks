'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { LeadEnquiry } from '@/data/projects';

const initialLeads: LeadEnquiry[] = [
  {
    id: 'lead-1',
    name: 'Rahul Varma',
    email: 'rahul.varma@example.com',
    phone: '+91 98470 12345',
    service: 'Residential Masterplanning',
    message: 'Interested in commissioning a sustainable tropical villa design in Wayanad.',
    status: 'new',
    createdAt: '2026-08-28',
  },
  {
    id: 'lead-2',
    name: 'Dr. Fatima Hussain',
    email: 'fatima.h@example.com',
    phone: '+91 94460 67890',
    service: 'Interior Architecture',
    message: 'Looking for contextual interior curation for a contemporary penthouse in Kochi.',
    status: 'contacted',
    createdAt: '2026-08-25',
  },
];

const COLUMNS: Column<LeadEnquiry>[] = [
  { key: 'name', label: 'Client Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone' },
  { key: 'service', label: 'Interested Service', render: 'badge' },
  { key: 'status', label: 'Status', sortable: true, render: 'badge' },
  { key: 'createdAt', label: 'Received', sortable: true },
];

const FIELDS: FieldDef[] = [
  { key: 'name', label: 'Client Name', type: 'text', placeholder: 'Full Name' },
  { key: 'email', label: 'Email Address', type: 'text', placeholder: 'client@example.com' },
  { key: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 98765 43210' },
  { key: 'service', label: 'Service of Interest', type: 'text', placeholder: 'Residential Architecture' },
  { key: 'status', label: 'Lead Status', type: 'select', options: ['new', 'contacted', 'archived'] },
  { key: 'message', label: 'Enquiry Message', type: 'textarea', placeholder: 'Enquiry details...' },
];

export default function LeadsAdminPage() {
  return (
    <DynamicAdminManager<LeadEnquiry>
      title="Client Inquiries &amp; Leads"
      subtitle="Track project enquiries submitted via the website contact form"
      storageKey="attiks_admin_leads"
      initialData={initialLeads}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="lead-"
      exportFileName="leads.json"
      addLabel="Record Lead"
    />
  );
}
