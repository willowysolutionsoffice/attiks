import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { readDatabase } from '@/lib/db';
import { projects as fallbackProjects, Project } from '@/data/projects';

function getProject(id: string): Project | undefined {
  try {
    const db = readDatabase();
    const found = db.projects.find((p) => p.id === id);
    if (found) return found as Project;
  } catch (err) {
    console.error('Failed to read database in ProjectDetail:', err);
  }
  return fallbackProjects.find((p) => p.id === id);
}

export async function generateStaticParams() {
  try {
    const db = readDatabase();
    if (db.projects && db.projects.length > 0) {
      return db.projects.map((p) => ({
        id: p.id,
      }));
    }
  } catch (err) {
    // fallback
  }
  return fallbackProjects.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return {
      title: 'Project Not Found | ATTIKS Architecture',
    };
  }

  return {
    title: `${project.title} — ${project.location}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ATTIKS Architecture`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return (
      <div style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '120px 20px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-canela)' }}>Project Not Found</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>The requested architectural project could not be located.</p>
          <Link href="/projects" className="btn-premium">
            &larr; View All Projects
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Fallback gallery images if gallery array is empty
  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image, '/comm_modern.webp', '/interior.webp', '/comm_downtown.webp'].filter(
          (img, idx, arr) => arr.indexOf(img) === idx
        );

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh' }}>
      <Navbar />

      <main>
        {/* Project Image & Hero Header */}
        <section style={{ position: 'relative', width: '100%', height: '68vh', minHeight: '500px' }}>
          <Image 
            src={project.image}
            alt={`${project.title} - ${project.category} in ${project.location}`}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '0 24px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '0.85rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
              {project.category} &bull; {project.year}
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', textAlign: 'center', fontFamily: 'var(--font-canela)', fontStyle: 'italic', margin: 0 }}>
              {project.title}
            </h1>
            <p style={{ marginTop: '16px', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4703F', fontWeight: 600 }}>
              {project.location}
            </p>
          </div>
        </section>

        {/* Project Details Section */}
        <section style={{ padding: '80px var(--section-padding) 60px', maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 520px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#C4703F', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              {project.category} Architecture
            </span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '24px', fontWeight: 600, textTransform: 'none', fontFamily: 'var(--font-canela)' }}>
              About {project.title}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.85', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
              {project.description}
            </p>

            {project.scope && (
              <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>Scope</span>
                  <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{project.scope}</span>
                </div>
                {project.area && (
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>Built-up Area</span>
                    <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 500 }}>{project.area}</span>
                  </div>
                )}
              </div>
            )}

            <div style={{ marginTop: '40px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-premium" style={{ background: '#fff', color: '#000', borderColor: '#fff' }}>
                Inquire About Project
              </Link>
              <Link href="/projects" className="btn-premium">
                &larr; All Projects
              </Link>
            </div>
          </div>

          {/* Highlights Card */}
          <div style={{ flex: '1 1 340px', background: '#111', padding: '36px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)', alignSelf: 'flex-start' }}>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>Features</span>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Project Highlights
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {(project.highlights || ['Contextual Material Palette', 'Passive Climate Architecture', 'Integrated Landscape Integration']).map((highlight, idx) => (
                <li key={idx} style={{ padding: '14px 0', borderBottom: idx < (project.highlights?.length || 3) - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', fontSize: '0.95rem' }}>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#C4703F', borderRadius: '50%', marginRight: '14px', flexShrink: 0 }} aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Project Gallery Section */}
        <section style={{ padding: '60px var(--section-padding) 120px', maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ marginBottom: '40px', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#C4703F', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Visual Showcase
            </span>
            <h2 style={{ fontSize: '2.2rem', margin: 0, fontWeight: 500, fontFamily: 'var(--font-canela)', fontStyle: 'italic' }}>
              Project Gallery
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {galleryImages.map((imgUrl, index) => (
              <div 
                key={index}
                style={{
                  position: 'relative',
                  height: '320px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'transform 0.4s ease, border-color 0.4s ease',
                }}
              >
                <Image
                  src={imgUrl}
                  alt={`${project.title} gallery view ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                  opacity: 0.8,
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                  {project.title} &bull; View 0{index + 1}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
