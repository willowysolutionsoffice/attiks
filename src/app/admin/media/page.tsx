'use client';

import DynamicAdminManager from '@/components/admin/DynamicAdminManager';
import { Column } from '@/components/admin/DataTable';
import { FieldDef } from '@/components/admin/FormModal';
import { MediaAsset } from '@/data/projects';

const initialMedia: MediaAsset[] = [
  {
    id: 'med-1',
    fileName: 'villa_showcase.webp',
    url: '/villa_showcase.webp',
    sizeBytes: 143902,
    format: 'image/webp',
    dimensions: '1920x1080',
    altText: 'Soori Residence Exterior',
    uploadedAt: '2026-01-10',
  },
  {
    id: 'med-2',
    fileName: 'value_people.webp',
    url: '/value_people.webp',
    sizeBytes: 160868,
    format: 'image/webp',
    dimensions: '1920x1280',
    altText: 'Attiks Architecture Studio Values',
    uploadedAt: '2026-02-14',
  },
  {
    id: 'med-3',
    fileName: 'comm_modern.webp',
    url: '/comm_modern.webp',
    sizeBytes: 162968,
    format: 'image/webp',
    dimensions: '1920x1200',
    altText: 'Kerala Arts Center Entrance',
    uploadedAt: '2026-03-05',
  },
];

const COLUMNS: Column<MediaAsset>[] = [
  { key: 'url', label: 'Preview', render: 'image' },
  { key: 'fileName', label: 'File Name', sortable: true },
  { key: 'format', label: 'Format', sortable: true, render: 'badge' },
  { key: 'dimensions', label: 'Dimensions', sortable: true },
  { key: 'altText', label: 'Alt Text', render: 'truncate' },
  { key: 'uploadedAt', label: 'Uploaded', sortable: true },
];

const FIELDS: FieldDef[] = [
  { key: 'fileName', label: 'File Name', type: 'text', placeholder: 'photo.webp' },
  { key: 'url', label: 'Image URL / Path', type: 'text', placeholder: '/uploads/my-photo.webp' },
  { key: 'format', label: 'Format', type: 'text', placeholder: 'image/webp' },
  { key: 'dimensions', label: 'Dimensions', type: 'text', placeholder: '1920x1080' },
  { key: 'altText', label: 'Alt Text / Description', type: 'text', placeholder: 'Architectural render view' },
  { key: 'uploadedAt', label: 'Date', type: 'text', placeholder: '2026-09-01' },
];

export default function MediaAdminPage() {
  return (
    <DynamicAdminManager<MediaAsset>
      title="Media &amp; Asset Library"
      subtitle="Digital assets, architectural photography, and renderings"
      storageKey="attiks_admin_media"
      initialData={initialMedia}
      columns={COLUMNS}
      fields={FIELDS}
      idPrefix="med-"
      exportFileName="media.json"
      addLabel="Register Asset"
    />
  );
}
