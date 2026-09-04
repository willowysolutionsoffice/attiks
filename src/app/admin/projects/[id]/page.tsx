import { Suspense } from 'react';
import EditProjectClient from './EditProjectClient';
export const dynamic = 'force-dynamic';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
          Loading architectural project...
        </div>
      }
    >
      <EditProjectClient id={id} />
    </Suspense>
  );
}
