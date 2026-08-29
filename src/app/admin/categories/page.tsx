'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { categories as initialCategories } from '@/data/projects';

interface Category {
  id: string;
  label: string;
  value: string;
}

const seededCategories: Category[] = initialCategories.map((c, i) => ({
  id: `cat-${i}`,
  label: c.label,
  value: c.value,
}));

const COLUMNS: Column<Category>[] = [
  { key: 'label', label: 'Label', sortable: true, render: 'badge' },
  { key: 'value', label: 'Value (slug)', sortable: true },
];

const FIELDS: FieldDef[] = [
  { key: 'label', label: 'Display Label', type: 'text', placeholder: 'e.g. Commercial' },
  { key: 'value', label: 'Slug (value)',  type: 'text', placeholder: 'e.g. commercial' },
];

export default function CategoriesAdminPage() {
  return (
    <DynamicAdminManager<Category>
      title="Categories"
      subtitle="Project type categories — dynamic and editable without restriction"
      storageKey="attiks_admin_categories"
      initialData={seededCategories}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="cat-"
      exportFileName="categories.json"
      addLabel="Add Category"
    />
  );
}
