'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { projects as seedProjects, categories, Category, Project } from '@/data/projects';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>(seedProjects);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLiveProjects() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setAllProjects(data.projects);
        }
      } catch (err) {
        console.error('Failed to load live projects from API:', err);
      }
    }
    fetchLiveProjects();
  }, []);

  const filteredProjects = selectedCategory
    ? allProjects.filter((p) => p.category === selectedCategory)
    : allProjects;

  const displayTitle = selectedCategory
    ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
    : 'All projects';

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#111111' }}>
      <Navbar />

      <main>
        {/* Hero Header & Filter Section with Architectural Spacing */}
        <section
          style={{
            background: '#ffffff',
            padding: '170px clamp(24px, 4vw, 56px) 70px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
          aria-label="Projects Showcase Header"
        >
          <div style={{ maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
            {/* Animated Dynamic Title matching exact reference */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={displayTitle}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-display"
                style={{
                  fontSize: 'clamp(2.8rem, 5.5vw, 4.2rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#000000',
                  margin: '0 0 32px 0',
                  letterSpacing: '-0.02em',
                  textTransform: 'none',
                }}
              >
                {displayTitle}
              </motion.h1>
            </AnimatePresence>

            {/* Dot-separated Inline Category Filter Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px 18px',
                fontSize: 'clamp(0.95rem, 1.35vw, 1.2rem)',
                color: '#222222',
                letterSpacing: '0.01em',
                fontWeight: 400,
              }}
              role="toolbar"
              aria-label="Filter projects by category"
            >
              {categories.map((cat, index) => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <div key={cat.value} style={{ display: 'inline-flex', alignItems: 'center', gap: '18px' }}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCategory(isSelected ? null : (cat.value as Category))
                      }
                      aria-pressed={isSelected}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        fontSize: 'inherit',
                        fontFamily: 'inherit',
                        color: isSelected ? '#000000' : '#444444',
                        fontWeight: isSelected ? 700 : 400,
                        textDecoration: isSelected ? 'underline' : 'none',
                        textUnderlineOffset: '6px',
                        transition: 'color 0.2s ease, opacity 0.2s ease',
                        textTransform: 'lowercase',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) (e.currentTarget as HTMLButtonElement).style.opacity = '0.6';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                      }}
                    >
                      {cat.label}
                    </button>
                    {index < categories.length - 1 && (
                      <span style={{ color: '#888888', userSelect: 'none', fontSize: '1rem' }} aria-hidden="true">.</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3-Column Showcase Grid */}
        <section
          style={{
            background: '#ffffff',
            padding: '0 clamp(24px, 4vw, 56px) 140px',
            boxSizing: 'border-box',
          }}
          aria-label="Projects Grid"
        >
          <div style={{ maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
                width: '100%',
              }}
              className="projects-3col-grid"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => {
                  const isHovered = hoveredId === project.id;
                  return (
                    <motion.div
                      layout
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                        className="project-grid-card"
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
                          className="project-grid-img"
                        />

                        {/* Gradient Overlay & Hover Details (Displays Name on Hover) */}
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
                          className="project-grid-overlay"
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
                          <h2
                            style={{
                              color: '#ffffff',
                              fontSize: '1.25rem',
                              fontWeight: 600,
                              margin: 0,
                              letterSpacing: '-0.01em',
                              textTransform: 'none',
                            }}
                          >
                            {project.title}
                          </h2>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @media (max-width: 1024px) {
          .projects-3col-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .projects-3col-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
