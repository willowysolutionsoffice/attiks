'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';

export default function ProjectShowcaseGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    async function loadShowcaseProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          const featured = data.projects.filter((p: any) => p.featured || p.status === 'published');
          setProjects(featured.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to load showcase projects:', err);
      }
    }
    loadShowcaseProjects();
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '60px clamp(24px, 4vw, 56px) 100px',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
      aria-labelledby="selected-works-heading"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        {/* Lead-in Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '36px',
          }}
        >
          <h2
            id="selected-works-heading"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#000000',
              margin: 0,
              letterSpacing: '-0.01em',
              textTransform: 'none',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#000000',
                display: 'inline-block',
              }}
              aria-hidden="true"
            />
            Selected Works
          </h2>

          <Link
            href="/projects"
            style={{
              fontSize: '0.92rem',
              fontWeight: 600,
              color: '#000000',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
            }}
          >
            all projects &rsaquo;
          </Link>
        </div>

        {/* 3x2 Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            width: '100%',
          }}
          className="showcase-3x2-grid"
        >
          {projects.map((project, idx) => {
            const isHovered = hoveredId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: '-40px' }}
              >
                <Link
                  href={`/projects/${project.id}`}
                  style={{
                    position: 'relative',
                    display: 'block',
                    width: '100%',
                    aspectRatio: '16 / 10.5',
                    overflow: 'hidden',
                    background: '#111111',
                    textDecoration: 'none',
                  }}
                  className="showcase-item"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Image
                    src={project.image || '/architecture.webp'}
                    alt={`${project.title} - ${project.category} in ${project.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="showcase-img"
                  />

                  {/* Hover Overlay Displaying Project Name & Details */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)',
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 0.35s ease-in-out',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '24px 20px',
                      boxSizing: 'border-box',
                      zIndex: 5,
                      pointerEvents: 'none',
                    }}
                    className="showcase-overlay"
                  >
                    <p
                      style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: '0.78rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '6px',
                        fontWeight: 500,
                      }}
                    >
                      {project.location} &bull; {project.category}
                    </p>
                    <h3
                      style={{
                        color: '#ffffff',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        margin: 0,
                        textTransform: 'none',
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .showcase-3x2-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .showcase-3x2-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
