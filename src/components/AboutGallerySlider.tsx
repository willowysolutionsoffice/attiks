'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Project } from '@/data/projects';
import LeadCaptureModal from '@/components/LeadCaptureModal';

function ArrowBtn({ onClick, direction, label }: { onClick: () => void; direction: 'prev' | 'next'; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        border: '1.5px solid #000000',
        background: hovered ? '#000000' : 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.25s ease, border-color 0.25s ease',
        flexShrink: 0,
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 18 18"
        fill="none"
        stroke={hovered ? '#ffffff' : '#000000'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'stroke 0.25s ease' }}
      >
        {direction === 'prev'
          ? <path d="M11 4 L6 9 L11 14" />
          : <path d="M7 4 L12 9 L7 14" />
        }
      </svg>
    </button>
  );
}

function ProjectCardItem({ project, onCardClick }: { project: Project; onCardClick: (project: Project) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onCardClick(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick(project);
        }
      }}
      style={{
        textDecoration: 'none',
        display: 'block',
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10.5',
        overflow: 'hidden',
        background: '#111111',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={project.image || '/architecture.webp'}
        alt={`${project.title} - ${project.location}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Bottom Gradient for Legibility (Shows on Hover) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)',
          pointerEvents: 'none',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Bottom-Left Minimal Typography (Visible ONLY on Hover) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          padding: 'clamp(18px, 3vw, 28px)',
          zIndex: 5,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
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
        <h3
          style={{
            color: '#ffffff',
            fontSize: 'clamp(1.4rem, 1.8vw, 1.8rem)',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.02em',
            fontFamily: 'var(--font-primary)',
            textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            textTransform: 'none',
          }}
        >
          {project.title}
        </h3>
      </div>
    </div>
  );
}

export default function AboutGallerySlider({ projects = [] }: { projects?: Project[] }) {
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const activeProjects = projects.filter((p) => p.status !== 'draft');
  const projectList = activeProjects.length > 0 ? activeProjects : projects;

  // Group projects into pairs (2 per slide)
  const slides: Project[][] = [];
  for (let i = 0; i < projectList.length; i += 2) {
    if (i + 1 < projectList.length) {
      slides.push([projectList[i], projectList[i + 1]]);
    } else {
      slides.push([projectList[i], projectList[0]]); // ensure 2 cards per slide
    }
  }

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = slides.length || 1;

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const handleModalSuccess = () => {
    if (selectedProject) {
      router.push(`/projects/${selectedProject.id}`);
    }
    setModalOpen(false);
    setSelectedProject(null);
  };

  const currentPair = slides[currentSlideIndex] || [projectList[0], projectList[1]];

  return (
    <section
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '50px clamp(24px, 5vw, 64px) 70px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
      aria-label="Projects Showcase Slider"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        {/* Dual Cards Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              width: '100%',
              boxSizing: 'border-box',
            }}
            className="projects-slider-grid"
          >
            {currentPair.map((project, idx) => (
              <ProjectCardItem
                key={`${project.id}-${idx}`}
                project={project}
                onCardClick={handleCardClick}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Controls Row */}
        <div
          className="projects-slider-controls"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '32px',
            paddingTop: '8px',
          }}
        >
          {/* Arrow Controls & Slide Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ArrowBtn onClick={handlePrev} direction="prev" label="Previous projects" />
            <span style={{ fontSize: 'clamp(18px, 1.1vw, 20px)', color: '#444444', letterSpacing: '0.04em', minWidth: '64px', textAlign: 'center', fontFamily: 'var(--font-primary)' }}>
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <ArrowBtn onClick={handleNext} direction="next" label="Next projects" />
          </div>

          {/* View All Projects Link */}
          <Link
            href="/projects"
            style={{
              fontSize: 'clamp(18px, 1.15vw, 20px)',
              fontWeight: 500,
              color: '#000000',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              textTransform: 'none',
              fontFamily: 'var(--font-primary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >
            View all projects &rarr;
          </Link>
        </div>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        projectTitle={selectedProject?.title || ''}
        projectId={selectedProject?.id || ''}
      />

      <style jsx>{`
        @media (max-width: 768px) {
          .projects-slider-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .projects-slider-controls {
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
