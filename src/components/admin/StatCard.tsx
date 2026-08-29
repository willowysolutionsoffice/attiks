'use client';

import { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
  sub?: string;
}

export default function StatCard({ label, value, icon: Icon, sub }: Props) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-icon">
        <Icon size={20} />
      </div>
      <div className="admin-stat-value">{value}</div>
      <div className="admin-stat-label">{label}</div>
      {sub && (
        <div style={{ fontSize: '0.72rem', color: 'var(--admin-text-muted)', marginTop: '0.35rem' }}>
          {sub}
        </div>
      )}
    </div>
  );
}
