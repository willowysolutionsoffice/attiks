'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import LeadCaptureModal from '@/components/LeadCaptureModal';

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
}

const initialEvents: EventItem[] = [
  {
    id: 'e-1',
    title: 'Kochi-Muziris Biennale Architectural Pavilion',
    category: 'exhibition',
    date: '2026',
    location: 'Kochi, Kerala',
    image: '/architecture.webp',
  },
  {
    id: 'e-2',
    title: 'Vernacular Masonry & Climate Symposium',
    category: 'symposium',
    date: '2026',
    location: 'Calicut, Kerala',
    image: '/value_people.webp',
  },
  {
    id: 'e-3',
    title: 'Monsoon Living & Tropical Spatial Design',
    category: 'workshop',
    date: '2025',
    location: 'Varkala, Kerala',
    image: '/coastal_palace.webp',
  },
  {
    id: 'e-4',
    title: 'Sustainable Timber & Earth Construction Lab',
    category: 'research',
    date: '2025',
    location: 'Wayanad, Kerala',
    image: '/forest.webp',
  },
  {
    id: 'e-5',
    title: 'Contemporary Urban Infill Showcase',
    category: 'panel discussion',
    date: '2025',
    location: 'Thrissur, Kerala',
    image: '/comm_modern.webp',
  },
  {
    id: 'e-6',
    title: 'Coastal Topography & Horizon Architecture',
    category: 'installation',
    date: '2024',
    location: 'Kovalam, Kerala',
    image: '/comm_beach.webp',
  },
];

export default function ProjectShowcaseGrid({ customEvents }: { initialProjects?: any; customEvents?: EventItem[] }) {
  const events = customEvents && customEvents.length > 0 ? customEvents : initialEvents;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (event: EventItem) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const handleModalSuccess = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <section
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '20px clamp(24px, 5vw, 64px) 100px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
      aria-label="Events & Studio Gallery Showcase"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        {/* Clean 3x2 Grid matching reference card layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            width: '100%',
          }}
          className="events-gallery-grid"
        >
          {events.map((event, idx) => {
            const isHovered = hoveredId === event.id;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: '-20px' }}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(event)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(event);
                  }
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10.5',
                  overflow: 'hidden',
                  background: '#151515',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    transform: isHovered ? 'scale(1.04)' : 'scale(1)',
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
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                  }}
                />

                {/* Bottom-Left Minimal Typography (Visible ONLY on Hover) */}
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
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      textTransform: 'none',
                      margin: 0,
                      fontFamily: 'var(--font-primary)',
                      textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                    }}
                  >
                    {event.location} &bull; {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </p>
                  <h3
                    style={{
                      color: '#ffffff',
                      fontSize: 'clamp(1.3rem, 1.6vw, 1.6rem)',
                      fontWeight: 400,
                      margin: 0,
                      letterSpacing: '-0.02em',
                      fontFamily: 'var(--font-primary)',
                      textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                      lineHeight: 1.25,
                      textTransform: 'none',
                    }}
                  >
                    {event.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        projectTitle={selectedEvent?.title || ''}
        projectId={selectedEvent?.id || ''}
      />

      <style jsx>{`
        @media (max-width: 1024px) {
          .events-gallery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 640px) {
          .events-gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
