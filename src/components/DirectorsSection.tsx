'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LeadCaptureModal from '@/components/LeadCaptureModal';

export interface Director {
  id: string;
  name: string;
  role: string;
  description: string;
  category: string;
  image: string;
  objectPosition?: string;
}

export const defaultDirectors: Director[] = [
  {
    id: 'd-1',
    name: 'Ethan Rhodes',
    role: 'Managing Director & Principal Architect',
    description: 'Leading spatial strategy and climate-responsive master planning across residential and cultural commissions.',
    category: 'Architecture',
    image: '/images/image1.webp',
    objectPosition: 'center 20%',
  },
  {
    id: 'd-2',
    name: 'Ava Kim',
    role: 'Creative Director & Lead Architect',
    description: 'Spatial designer with a passionate focus on editorial proportions, contextual materiality, and natural daylight dynamics.',
    category: 'Architecture',
    image: '/images/image2.webp',
    objectPosition: 'center 15%',
  },
  {
    id: 'd-3',
    name: 'Noah West',
    role: 'Director of Structural Practice',
    description: 'Pioneering mass timber integration, passive ventilation systems, and vernacular masonry innovations.',
    category: 'Engineering',
    image: '/images/image3.webp',
    objectPosition: 'center 15%',
  },
  {
    id: 'd-4',
    name: 'Lia Carter',
    role: 'Director of Interior Architecture',
    description: 'Crafting bespoke tactile living spaces with curated artisanal finishes, monolithic stones, and timeless warmth.',
    category: 'Interiors',
    image: '/value_people.webp',
    objectPosition: 'center 25%',
  },
  {
    id: 'd-5',
    name: 'Marcus Vance',
    role: 'Director of Landscape & Ecology',
    description: 'Harmonizing built forms with native Kerala topography, coastal hydrology, and sustainable biodiversity.',
    category: 'Landscape',
    image: '/founder.webp',
    objectPosition: 'center 20%',
  },
  {
    id: 'd-6',
    name: 'Ava Sinclair',
    role: 'Director of Client Curation & Advisory',
    description: 'Guiding clients from visionary concept to realization with personalized, end-to-end architectural stewardship.',
    category: 'Advisory',
    image: '/images/image4.webp',
    objectPosition: 'center 15%',
  },
];

interface DirectorsSectionProps {
  directors?: Director[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function DirectorsSection({
  directors = defaultDirectors,
  eyebrow = '04 / Leadership',
  title = 'Meet Our Directors',
  description = 'A dedicated circle of principal architects, structural visionaries, and spatial innovators guiding every commission.',
}: DirectorsSectionProps) {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const handleCardClick = (director: Director) => {
    // Toggle active on mobile/click
    if (activeHoverId === director.id) {
      setActiveHoverId(null);
    } else {
      setActiveHoverId(director.id);
    }
  };

  const handleViewProfile = (e: React.MouseEvent, director: Director) => {
    e.stopPropagation();
    setSelectedDirector(director);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDirector(null);
  };

  const handleModalSuccess = () => {
    setModalOpen(false);
    setSelectedDirector(null);
  };

  return (
    <section
      id="directors-section"
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: 'clamp(80px, 8vw, 140px) 0',
        color: '#111111',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
      aria-labelledby="directors-heading"
    >
      {/* Top Header Section */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 var(--section-padding)',
          marginBottom: 'clamp(40px, 5vw, 64px)',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'clamp(15px, 1vw, 17px)',
            letterSpacing: '0.12em',
            color: '#777777',
            marginBottom: '16px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div>
            <motion.h2
              id="directors-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                fontWeight: 300,
                fontFamily: 'var(--font-canela), serif',
                fontStyle: 'italic',
                color: '#000000',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                margin: 0,
                textTransform: 'none',
              }}
            >
              {title}
            </motion.h2>

            {description && (
              <p
                style={{
                  fontSize: 'clamp(18px, 1.15vw, 20px)',
                  color: '#555555',
                  lineHeight: 1.6,
                  marginTop: '16px',
                  marginBottom: 0,
                  maxWidth: '680px',
                  fontWeight: 350,
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================
          HORIZONTAL CAROUSEL TRACK WITH FLOATING CIRCULAR ARROWS
          ============================================================ */}
      <div style={{ position: 'relative', width: '100%' }}>
        {/* Navigation Left Arrow */}
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Previous directors"
          className="director-nav-btn director-nav-left"
          style={{
            position: 'absolute',
            left: 'clamp(16px, 3vw, 40px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
        >
          <ChevronLeft size={22} color="#000000" strokeWidth={2} />
        </button>

        {/* Navigation Right Arrow */}
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Next directors"
          className="director-nav-btn director-nav-right"
          style={{
            position: 'absolute',
            right: 'clamp(16px, 3vw, 40px)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#ffffff',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
          }}
        >
          <ChevronRight size={22} color="#000000" strokeWidth={2} />
        </button>

        {/* Carousel Scroll Track */}
        <div
          ref={carouselRef}
          className="directors-track"
          style={{
            display: 'flex',
            gap: 'clamp(20px, 2.2vw, 32px)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            padding: '24px clamp(24px, 4vw, 56px) 36px',
            boxSizing: 'border-box',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {directors.map((director, index) => {
            const isActive = activeHoverId === director.id;

            return (
              <div
                key={director.id}
                onMouseEnter={() => setActiveHoverId(director.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                onClick={() => handleCardClick(director)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(director);
                  }
                }}
                className={`director-card-container ${isActive ? 'is-active' : ''}`}
                style={{
                  position: 'relative',
                  flex: '0 0 clamp(290px, 23vw, 340px)',
                  height: 'clamp(470px, 58vh, 530px)',
                  borderRadius: '28px',
                  background: '#ffffff',
                  boxShadow: isActive
                    ? '0 20px 48px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06)'
                    : '0 12px 36px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(0, 0, 0, 0.04)',
                  padding: '10px',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  scrollSnapAlign: 'start',
                  transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden',
                }}
              >
                {/* Portrait Image Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: isActive ? '50%' : '100%',
                    borderRadius: isActive ? '20px' : '20px',
                    overflow: 'hidden',
                    background: '#1a1a1a',
                    flexShrink: 0,
                    transition: 'height 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <Image
                    src={director.image}
                    alt={`${director.name} — ${director.role}`}
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 22vw"
                    style={{
                      objectFit: 'cover',
                      objectPosition: director.objectPosition || 'center 20%',
                      transform: isActive ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>

                {/* Info Panel Reveal (Exact Reference Layout) */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '14px 8px 6px',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(12px)',
                    transition: 'opacity 0.45s ease 0.06s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.06s',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  {/* Name & Bio */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: 'clamp(1.35rem, 1.5vw, 1.55rem)',
                        fontWeight: 700,
                        color: '#000000',
                        margin: 0,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        textTransform: 'none',
                      }}
                    >
                      {director.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: 'clamp(14px, 0.95vw, 15px)',
                        color: '#555555',
                        lineHeight: 1.45,
                        margin: '6px 0 0 0',
                        fontWeight: 400,
                        textTransform: 'none',
                      }}
                    >
                      {director.description}
                    </p>
                  </div>

                  {/* Bottom Actions Row: Tag on left, Button on right */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      marginTop: '10px',
                      paddingTop: '8px',
                    }}
                  >
                    {/* Category Pill Tag */}
                    <span
                      style={{
                        background: '#f2f2f2',
                        color: '#333333',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        fontSize: '13px',
                        fontWeight: 600,
                        fontFamily: 'var(--font-primary)',
                        letterSpacing: '0.01em',
                        textTransform: 'none',
                        display: 'inline-block',
                      }}
                    >
                      {director.category}
                    </span>

                    {/* View Profile CTA Button */}
                    <button
                      type="button"
                      onClick={(e) => handleViewProfile(e, director)}
                      style={{
                        background: '#555555',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 18px',
                        borderRadius: '9999px',
                        fontSize: '13px',
                        fontWeight: 600,
                        fontFamily: 'var(--font-primary)',
                        cursor: 'pointer',
                        transition: 'background 0.25s ease, transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#000000';
                        e.currentTarget.style.transform = 'scale(1.04)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#555555';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Capture Modal on "View Profile" */}
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={handleModalClose}
        onSubmitSuccess={handleModalSuccess}
        projectTitle={selectedDirector ? `Consultation with ${selectedDirector.name} (${selectedDirector.role})` : 'Director Consultation'}
        projectId={selectedDirector?.id || 'director-inquiry'}
      />

      <style jsx>{`
        .directors-track::-webkit-scrollbar {
          display: none;
        }

        .director-nav-btn:hover {
          transform: translateY(-50%) scale(1.08) !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18) !important;
        }

        @media (max-width: 768px) {
          .director-nav-btn {
            display: none !important;
          }
          .director-card-container {
            flex: 0 0 82vw !important;
            height: 480px !important;
          }
        }
      `}</style>
    </section>
  );
}
