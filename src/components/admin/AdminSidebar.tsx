'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  FolderOpen,
  Compass,
  Users,
  FileText,
  Image as ImageIcon,
  Inbox,
  UserCheck,
  Shield,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';

interface NavItem {
  title: string;
  path: string;
  icon: React.ComponentType<{ size?: number }>;
}

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Projects',  path: '/admin/projects',  icon: FolderOpen },
  { title: 'Services',  path: '/admin/services',  icon: Compass },
  { title: 'Team',      path: '/admin/team',      icon: Users },
  { title: 'Blog',      path: '/admin/blog',      icon: FileText },
  { title: 'Media',     path: '/admin/media',     icon: ImageIcon },
  { title: 'Leads',     path: '/admin/leads',     icon: Inbox },
];

const systemNavItems: NavItem[] = [
  { title: 'Users',    path: '/admin/users',    icon: UserCheck },
  { title: 'Roles',    path: '/admin/roles',    icon: Shield },
  { title: 'Settings', path: '/admin/settings', icon: Settings },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    router.push('/');
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={onClose}
          style={{ display: 'block' }}
        />
      )}

      <aside className={`admin-sidebar${isOpen ? ' open' : ''}`}>
        {/* Logo */}
        <div className="admin-sidebar-logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <Image
              src="/images/logo-light.png"
              alt="Attiks Logo"
              width={120}
              height={30}
              style={{ objectFit: 'contain', height: '24px', width: 'auto' }}
            />
            <span style={{ fontSize: '0.65rem', color: 'var(--admin-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', borderLeft: '1px solid var(--admin-border)', paddingLeft: '0.5rem', fontWeight: 500 }}>
              Admin
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="admin-nav">
          <div className="admin-nav-section">
            <span className="admin-nav-label">Management</span>
            {mainNavItems.map((item) => {
              const isActive =
                item.path === '/admin/dashboard'
                  ? pathname === '/admin' || pathname === '/admin/dashboard'
                  : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`admin-nav-link${isActive ? ' active' : ''}`}
                  onClick={onClose}
                >
                  <item.icon size={16} />
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="admin-divider" style={{ margin: '0.75rem 0.75rem' }} />

          <div className="admin-nav-section">
            <span className="admin-nav-label">System & Access</span>
            {systemNavItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`admin-nav-link${isActive ? ' active' : ''}`}
                  onClick={onClose}
                >
                  <item.icon size={16} />
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="admin-divider" style={{ margin: '0.75rem 0.75rem' }} />

          <div className="admin-nav-section">
            <span className="admin-nav-label">Public Website</span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-nav-link"
            >
              <ExternalLink size={16} />
              View Live Site
            </a>
          </div>
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <button className="admin-nav-link" onClick={handleLogout}>
            <LogOut size={16} />
            Exit Admin
          </button>
        </div>
      </aside>
    </>
  );
}
