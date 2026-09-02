'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

const titles: Record<string, string> = {
  '/admin/dashboard':    'Dashboard',
  '/admin/projects':     'Projects',
  '/admin/services':     'Services',
  '/admin/team':         'Team & Leadership',
  '/admin/blog':         'Blog & Publications',
  '/admin/media':        'Media Library',
  '/admin/leads':        'Client Enquiries',
  '/admin/users':        'User Management',
  '/admin/roles':        'Roles & Permissions',
  '/admin/settings':     'General Settings',
  '/admin/testimonials': 'Testimonials',
  '/admin/categories':   'Categories',
  '/admin':              'Overview',
};

interface Props {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: Props) {
  const pathname = usePathname();
  const title = Object.entries(titles).findLast(([key]) => pathname.startsWith(key))?.[1] ?? 'Admin';

  return (
    <header className="admin-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          className="admin-btn-icon desktop-hide"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {title}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--admin-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 400,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          A
        </div>
      </div>
    </header>
  );
}
