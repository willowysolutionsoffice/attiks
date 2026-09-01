'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { testimonials as initialTestimonials } from '@/data/projects';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  designation: string;
}

const seededTestimonials: Testimonial[] = initialTestimonials.map((t) => ({
  ...t,
}));

const COLUMNS: Column<Testimonial>[] = [
  { key: 'quote',       label: 'Quote',       render: 'truncate' },
  { key: 'author',      label: 'Author',      sortable: true },
  { key: 'designation', label: 'Designation', sortable: true },
];

const FIELDS: FieldDef[] = [
  { key: 'quote',       label: 'Quote',       type: 'textarea', placeholder: 'Client testimonial...' },
  { key: 'author',      label: 'Author',      type: 'text',     placeholder: 'Full name' },
  { key: 'designation', label: 'Designation', type: 'text',     placeholder: 'e.g. Director, Greenfield Developments' },
];

export default function TestimonialsAdminPage() {
  return (
    <DynamicAdminManager<Testimonial>
      title="Testimonials"
      subtitle="Client quotes — dynamic management with instant updates"
      storageKey="attiks_admin_testimonials"
      initialData={seededTestimonials}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="t-"
      exportFileName="testimonials.json"
      addLabel="Add Testimonial"
    />
  );
}
