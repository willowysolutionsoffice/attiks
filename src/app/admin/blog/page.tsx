'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { blogPosts as initialBlogPosts, BlogPost } from '@/data/projects';

const COLUMNS: Column<BlogPost>[] = [
  { key: 'image', label: 'Cover', render: 'image' },
  { key: 'title', label: 'Article Title', sortable: true },
  { key: 'author', label: 'Author', sortable: true },
  { key: 'status', label: 'Status', sortable: true, render: 'badge' },
  { key: 'publishedAt', label: 'Published Date', sortable: true },
];

const FIELDS: FieldDef[] = [
  { key: 'title', label: 'Title', type: 'text', placeholder: 'Article Title' },
  { key: 'slug', label: 'Slug', type: 'text', placeholder: 'article-url-slug' },
  { key: 'author', label: 'Author', type: 'text', placeholder: 'Ar. Anoop Kumar' },
  { key: 'publishedAt', label: 'Date', type: 'text', placeholder: '2026-08-01' },
  { key: 'status', label: 'Status', type: 'select', options: ['published', 'draft'] },
  { key: 'image', label: 'Cover Image URL', type: 'text', placeholder: '/architecture.webp' },
  { key: 'summary', label: 'Summary', type: 'textarea', placeholder: 'Short excerpt...' },
];

export default function BlogAdminPage() {
  return (
    <DynamicAdminManager<BlogPost>
      title="Journal &amp; Articles"
      subtitle="Architectural insights, essays, and press releases"
      storageKey="attiks_admin_blog"
      initialData={initialBlogPosts}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="blog-"
      exportFileName="blog.json"
      addLabel="New Article"
    />
  );
}
