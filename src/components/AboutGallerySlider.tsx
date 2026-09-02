'use client';

import { useState, useEffect } from 'react';
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
        width: '44px',
        height: '44px',
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
        width="15"
        height="15"
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

function ProjectCardItem({ project, onCardClick, isMobile }: { project: Project; onCardClick: (project: Project) => void; isMobile: boolean }) {
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
        aspectRatio: isMobile ? '16 / 11' : '16 / 10.5',
        borderRadius: '0px',
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

      {/* Bottom Gradient for Legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)',
          pointerEvents: 'none',
          opacity: isMobile || hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Bottom-Left Clean Editorial Typography */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: isMobile ? '16px 18px' : '22px 24px',
          zIndex: 5,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          opacity: isMobile || hovered ? 1 : 0,
          transform: isMobile || hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: 'clamp(18px, 1.1vw, 20px)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 2px 6px rgba(0,0,0,0.6)',
          }}
        >
          {project.location} &bull; {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
        </p>
        <h3
          className="font-display"
          style={{
            color: '#ffffff',
            fontSize: isMobile ? '1.25rem' : 'clamp(1.2rem, 1.5vw, 1.5rem)',
            fontWeight: 400,
            margin: 0,
            letterSpacing: '-0.01em',
            lineHeight: 1.25,
            textShadow: '0 2px 10px rgba(0,0,0,0.7)',
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
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const activeProjects = projects.filter((p) => p.status !== 'draft');
  const projectList = activeProjects.length > 0 ? activeProjects : projects;

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Build slides: 1 card per slide on Mobile, 2 cards per slide on Desktop
  const slides: Project[][] = [];
  if (isMobile) {
    for (let i = 0; i < projectList.length; i++) {
      slides.push([projectList[i]]);
    }
  } else {
    for (let i = 0; i < projectList.length; i += 2) {
      if (i + 1 < projectList.length) {
        slides.push([projectList[i], projectList[i + 1]]);
      } else {
        slides.push([projectList[i], projectList[0]]);
      }
    }
  }

  const totalSlides = slides.length || 1;

  // Reset slide index if exceeding bounds on resize
  useEffect(() => {
    if (currentSlideIndex >= totalSlides) {
      setCurrentSlideIndex(0);
    }
  }, [totalSlides, currentSlideIndex]);

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

  const currentPair = slides[currentSlideIndex] || [projectList[0]];

  return (
    <section
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: isMobile ? '40px 20px 50px' : '50px clamp(24px, 5vw, 64px) 70px',
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
        {/* Responsive Cards Slide (1 card on mobile, 2 cards on desktop) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSlideIndex}-${isMobile ? 'm' : 'd'}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '16px' : '24px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {currentPair.map((project, idx) => (
              <ProjectCardItem
                key={`${project.id}-${idx}`}
                project={project}
                onCardClick={handleCardClick}
                isMobile={isMobile}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Controls Row: Arrows & Counter Placed on Left Site */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: isMobile ? '24px' : '32px',
            paddingTop: '8px',
            flexWrap: 'wrap',
            gap: '16px',
            width: '100%',
          }}
        >
          {/* Left-Aligned Arrow Controls & Slide Counter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '12px' : '16px',
            }}
          >
            <ArrowBtn onClick={handlePrev} direction="prev" label="Previous projects" />
            <span
              style={{
                fontSize: 'clamp(18px, 1.1vw, 20px)',
                color: '#444444',
                letterSpacing: '0.04em',
                minWidth: '64px',
                textAlign: 'center',
                fontWeight: 400,
              }}
            >
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <ArrowBtn onClick={handleNext} direction="next" label="Next projects" />
          </div>

          {/* View All Projects Link */}
          <Link
            href="/projects"
            style={{
              fontSize: 'clamp(18px, 1.15vw, 20px)',
              fontWeight: 400,
              color: '#000000',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              textTransform: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.55'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >
            <span>View all projects</span>
            <span>&rarr;</span>
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
    </section>
  );
}
