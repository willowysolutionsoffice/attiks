'use client';

const BADGE_CLASSES: Record<string, string> = {
  commercial:    'admin-badge-commercial',
  residential:   'admin-badge-residential',
  institutional: 'admin-badge-institutional',
  cultural:      'admin-badge-cultural',
  interior:      'admin-badge-interior',
  hospitality:   'admin-badge-hospitality',
};

export default function StatusBadge({ value }: { value: string }) {
  const cls = BADGE_CLASSES[value.toLowerCase()] ?? 'admin-badge-default';
  return <span className={`admin-badge ${cls}`}>{value}</span>;
}
