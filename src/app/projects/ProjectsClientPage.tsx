'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { categories, Category, Project } from '@/data/projects';

export default function ProjectsClientPage({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [allProjects] = useState<Project[]>(initialProjects);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Lead capture modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setSelectedProject(null);
  }, []);

  const handleModalSuccess = useCallback(() => {
    if (selectedProject) {
      router.push(`/projects/${selectedProject.id}`);
    }
    setModalOpen(false);
    setSelectedProject(null);
  }, [selectedProject, router]);

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
                gap: '14px 22px',
                fontSize: 'clamp(18px, 1.25vw, 20px)',
                color: '#222222',
                letterSpacing: '0.01em',
                fontWeight: 400,
              }}
              role="toolbar"
              aria-label="Filter projects by category"
            >
              {categories.map((cat, index) => {
                const isSelected = selectedCategory === cat.value;
                const formattedLabel = cat.label.charAt(0).toUpperCase() + cat.label.slice(1);
                return (
                  <div key={cat.value} style={{ display: 'inline-flex', alignItems: 'center', gap: '22px' }}>
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
                        color: isSelected ? '#000000' : '#555555',
                        fontWeight: isSelected ? 700 : 400,
                        textDecoration: isSelected ? 'underline' : 'none',
                        textUnderlineOffset: '6px',
                        transition: 'color 0.2s ease, opacity 0.2s ease',
                        textTransform: 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) (e.currentTarget as HTMLButtonElement).style.opacity = '0.6';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                      }}
                    >
                      {formattedLabel}
                    </button>
                    {index < categories.length - 1 && (
                      <span style={{ color: '#888888', userSelect: 'none', fontSize: '1.2rem' }} aria-hidden="true">&bull;</span>
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
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleProjectClick(project)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleProjectClick(project);
                          }
                        }}
                        style={{
                          position: 'relative',
                          display: 'block',
                          width: '100%',
                          aspectRatio: '16 / 10.5',
                          overflow: 'hidden',
                          background: '#111111',
                          cursor: 'pointer',
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
                            transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                          className="project-grid-img"
                        />

                        {/* Bottom Gradient Overlay (Visible on Hover) */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.35s ease',
                            pointerEvents: 'none',
                          }}
                        />

                        {/* Bottom-Left Reference Typography (Visible on Hover) */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            padding: 'clamp(14px, 2.5vw, 22px)',
                            zIndex: 5,
                            pointerEvents: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px',
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                            transition: 'opacity 0.35s ease, transform 0.35s ease',
                          }}
                        >
                          <p
                            style={{
                              color: 'rgba(255, 255, 255, 0.95)',
                              fontSize: 'clamp(18px, 1.1vw, 20px)',
                              fontWeight: 500,
                              letterSpacing: '0.01em',
                              textTransform: 'none',
                              margin: 0,
                              fontFamily: 'var(--font-primary)',
                              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                            }}
                          >
                            {project.location} &bull; {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                          </p>
                          <h2
                            style={{
                              color: '#ffffff',
                              fontSize: 'clamp(1.35rem, 1.6vw, 1.65rem)',
                              fontWeight: 700,
                              margin: 0,
                              letterSpacing: '-0.02em',
                              fontFamily: 'var(--font-primary)',
                              textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                              textTransform: 'none',
                            }}
                          >
                            {project.title}
                          </h2>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        projectTitle={selectedProject?.title || ''}
        projectId={selectedProject?.id || ''}
      />

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

