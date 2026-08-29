import fs from 'fs';
import path from 'path';
import { Project, Category, projects as seedProjects, testimonials as seedTestimonials } from '@/data/projects';

// Data Interfaces
export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName?: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experience?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  status: 'published' | 'draft';
  image: string;
}

export interface LeadEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'archived';
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  url: string;
  sizeBytes: number;
  format: string;
  dimensions: string;
  altText: string;
  uploadedAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
  lastActive: string;
}

export interface RolePermission {
  id: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  description: string;
  permissions: string[];
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  enableLeadsNotification: boolean;
  maintenanceMode: boolean;
}

// Complete Storage Schema
export interface DatabaseSchema {
  projects: (Project & { status?: 'published' | 'draft'; featured?: boolean })[];
  testimonials: { id: string; quote: string; author: string; designation: string }[];
  services: ServiceItem[];
  team: TeamMember[];
  blog: BlogPost[];
  leads: LeadEnquiry[];
  media: MediaAsset[];
  users: UserAccount[];
  roles: RolePermission[];
  settings: SiteSettings;
  activityLog: { id: string; user: string; action: string; timestamp: string }[];
}

// Initial Seed Data
const defaultDb: DatabaseSchema = {
  projects: seedProjects.map((p, idx) => ({
    ...p,
    status: idx < 10 ? 'published' : 'draft',
    featured: idx < 4,
  })),
  testimonials: seedTestimonials.map((t, idx) => ({
    id: `testi-${idx + 1}`,
    ...t,
  })),
  services: [
    {
      id: 'srv-1',
      title: 'Architectural Design',
      category: 'Core Service',
      description: 'Comprehensive master planning, residential, commercial, and institutional building design.',
      featured: true,
    },
    {
      id: 'srv-2',
      title: 'Interior Architecture',
      category: 'Interiors',
      description: 'Bespoke spatial design, custom furniture curation, material selection, and ambient lighting.',
      featured: true,
    },
    {
      id: 'srv-3',
      title: 'Landscape Architecture',
      category: 'Environment',
      description: 'Contextual outdoor spaces integrating natural flora, waterbodies, and passive cooling courtyards.',
      featured: true,
    },
    {
      id: 'srv-4',
      title: 'Heritage Conservation',
      category: 'Restoration',
      description: 'Restoration and contemporary adaptive reuse of traditional Kerala architecture and structures.',
      featured: false,
    },
  ],
  team: [
    {
      id: 'team-1',
      name: 'Ar. Anoop Kumar',
      role: 'Principal Architect & Founder',
      bio: 'Leading practice vision with over 18 years of experience in tropical and modern architecture.',
      image: '/images/hero-1.webp',
      experience: '18+ Years',
    },
    {
      id: 'team-2',
      name: 'Ar. Meera Ravindran',
      role: 'Senior Project Lead',
      bio: 'Specialist in sustainable residential designs, timber details, and passive solar planning.',
      image: '/images/hero-2.webp',
      experience: '12+ Years',
    },
    {
      id: 'team-3',
      name: 'Karan Sharma',
      role: 'Head of Interiors & Detailing',
      bio: 'Focuses on luxury hospitality and minimalist high-end residential interiors.',
      image: '/images/hero-3.webp',
      experience: '10+ Years',
    },
  ],
  blog: [
    {
      id: 'post-1',
      title: 'Passive Cooling Strategies in Tropical Architecture',
      slug: 'passive-cooling-tropical-architecture',
      summary: 'How courtyard ventilation and thermal mass laterite reduce energy footprints in humid climates.',
      content: 'Detailed study on tropical building orientation, natural breeze corridors, and timber louvers.',
      author: 'Ar. Anoop Kumar',
      publishedAt: '2026-07-15',
      status: 'published',
      image: '/architecture.webp',
    },
    {
      id: 'post-2',
      title: 'Material Honesty: Laterite, Teak, and Micro-Cement',
      slug: 'material-honesty-laterite-teak-cement',
      summary: 'Exploring contextual materiality and tactile longevity in modern Kerala homes.',
      content: 'In-depth analysis of locally sourced stone, reclaimed teakwood, and seamless floor finishes.',
      author: 'Ar. Meera Ravindran',
      publishedAt: '2026-08-02',
      status: 'published',
      image: '/coastal_palace.webp',
    },
  ],
  leads: [
    {
      id: 'lead-101',
      name: 'Siddharth Menon',
      email: 'siddharth@example.com',
      phone: '+91 98470 12345',
      service: 'Architectural Design',
      message: 'Looking to design a 5,000 sq.ft lakeside residential villa in Alleppey.',
      status: 'new',
      createdAt: '2026-08-24 14:30',
    },
    {
      id: 'lead-102',
      name: 'Dr. Ananya Roy',
      email: 'ananya.roy@example.com',
      phone: '+91 94471 98765',
      service: 'Interior Architecture',
      message: 'Require interior renovation for our boutique heritage resort in Fort Kochi.',
      status: 'contacted',
      createdAt: '2026-08-22 10:15',
    },
  ],
  media: [
    {
      id: 'med-1',
      fileName: 'architecture.webp',
      url: '/architecture.webp',
      sizeBytes: 420000,
      format: 'image/webp',
      dimensions: '1920x1080',
      altText: 'Greenfield Tech Park Campus',
      uploadedAt: '2026-01-10',
    },
    {
      id: 'med-2',
      fileName: 'coastal_palace.webp',
      url: '/coastal_palace.webp',
      sizeBytes: 680000,
      format: 'image/webp',
      dimensions: '2048x1365',
      altText: 'Varkala Coastal Villa View',
      uploadedAt: '2026-02-14',
    },
    {
      id: 'med-3',
      fileName: 'comm_modern.webp',
      url: '/comm_modern.webp',
      sizeBytes: 850000,
      format: 'image/webp',
      dimensions: '1920x1200',
      altText: 'Kerala Arts Center Entrance',
      uploadedAt: '2026-03-05',
    },
    {
      id: 'med-4',
      fileName: 'hero.webp',
      url: '/hero.webp',
      sizeBytes: 67400,
      format: 'image/webp',
      dimensions: '1920x1080',
      altText: 'Attiks Architecture Hero',
      uploadedAt: '2026-04-12',
    },
  ],
  users: [
    {
      id: 'usr-1',
      name: 'Admin User',
      email: 'admin@attiks.in',
      role: 'Admin',
      status: 'active',
      lastActive: 'Just now',
    },
    {
      id: 'usr-2',
      name: 'Content Editor',
      email: 'editor@attiks.in',
      role: 'Editor',
      status: 'active',
      lastActive: '2 hours ago',
    },
    {
      id: 'usr-3',
      name: 'Design Reviewer',
      email: 'viewer@attiks.in',
      role: 'Viewer',
      status: 'active',
      lastActive: 'Yesterday',
    },
  ],
  roles: [
    {
      id: 'role-admin',
      role: 'Admin',
      description: 'Unrestricted access to all modules, settings, users, and delete privileges.',
      permissions: ['dashboard:read', 'projects:write', 'projects:delete', 'content:write', 'media:write', 'users:write', 'settings:write'],
    },
    {
      id: 'role-editor',
      role: 'Editor',
      description: 'Can manage projects, services, blog, media, and leads. Cannot modify users or site settings.',
      permissions: ['dashboard:read', 'projects:write', 'content:write', 'media:write', 'leads:read'],
    },
    {
      id: 'role-viewer',
      role: 'Viewer',
      description: 'Read-only access across the dashboard and analytics.',
      permissions: ['dashboard:read', 'projects:read', 'content:read', 'media:read', 'leads:read'],
    },
  ],
  settings: {
    siteTitle: 'ATTIKS | Modern Architectural Masterpieces',
    tagline: 'Contextual, Enduring Architecture Shaped by Climate and Material',
    contactEmail: 'info@attiks.in',
    contactPhone: '+91-0483-2941308',
    address: '#1/523, Krishna Building, NH 66, Azhinhilam PO, Calicut, Kerala',
    enableLeadsNotification: true,
    maintenanceMode: false,
  },
  activityLog: [
    { id: 'act-1', user: 'Admin User', action: 'Created project "Greenfield Tech Park"', timestamp: '2026-08-25 16:30' },
    { id: 'act-2', user: 'Content Editor', action: 'Updated blog post "Passive Cooling Strategies"', timestamp: '2026-08-25 14:10' },
    { id: 'act-3', user: 'Admin User', action: 'Replied to lead enquiry from Siddharth Menon', timestamp: '2026-08-24 17:45' },
  ],
};

const DB_FILE_PATH = path.join(process.cwd(), '.data', 'database.json');
let dbCache: DatabaseSchema | null = null;

function ensureDbDirectoryExists() {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readDatabase(): DatabaseSchema {
  if (dbCache) {
    return dbCache;
  }
  try {
    ensureDbDirectoryExists();
    if (!fs.existsSync(DB_FILE_PATH)) {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(defaultDb, null, 2), 'utf-8');
      dbCache = defaultDb;
      return defaultDb;
    }
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    dbCache = JSON.parse(raw);
    return dbCache!;
  } catch (error) {
    console.error('Error reading database file, returning default schema:', error);
    return defaultDb;
  }
}

export function writeDatabase(data: DatabaseSchema): void {
  try {
    ensureDbDirectoryExists();
    dbCache = data;
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
}

export function logActivity(user: string, action: string): void {
  const db = readDatabase();
  const newLog = {
    id: `act-${Date.now()}`,
    user,
    action,
    timestamp: new Date().toLocaleString(),
  };
  db.activityLog = [newLog, ...db.activityLog].slice(0, 30);
  writeDatabase(db);
}
