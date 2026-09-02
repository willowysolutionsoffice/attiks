'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

interface DirectorsSectionProps {
  directors?: Director[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function DirectorsSection({
  directors = defaultDirectors,
  eyebrow = 'Leadership',
  title = 'Meet Our Directors',
  description = 'A dedicated circle of principal architects, structural visionaries, and spatial innovators guiding every commission.',
}: DirectorsSectionProps) {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedDirector, setSelectedDirector] = useState<Director | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const totalCards = directors.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getScrollAmount = () => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.querySelector('.director-card-container') as HTMLElement;
      if (firstCard) {
        return firstCard.offsetWidth + 20;
      }
    }
    return 340;
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      const scrollAmt = getScrollAmount();
      carouselRef.current.scrollBy({ left: -scrollAmt, behavior: 'smooth' });
    }
    setCurrentSlideIndex((prev) => (prev <= 0 ? totalCards - 1 : prev - 1));
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmt = getScrollAmount();
      carouselRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
    setCurrentSlideIndex((prev) => (prev >= totalCards - 1 ? 0 : prev + 1));
  };

  // Sync index on manual touch scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollAmt = getScrollAmount();
      if (scrollAmt > 0) {
        const index = Math.round(el.scrollLeft / scrollAmt);
        setCurrentSlideIndex(Math.min(Math.max(0, index), totalCards - 1));
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [totalCards]);

  const handleCardClick = (director: Director) => {
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
        padding: isMobile ? '40px 20px 50px' : '50px clamp(24px, 5vw, 64px) 70px',
        color: '#111111',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      aria-labelledby="directors-heading"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Top Header Section */}
        <div
          style={{
            marginBottom: isMobile ? '24px' : '36px',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(18px, 1.1vw, 20px)',
              letterSpacing: '0.12em',
              color: '#777777',
              marginBottom: '10px',
              textTransform: 'uppercase',
              fontWeight: 400,
            }}
          >
            {eyebrow}
          </p>

          <div>
            <motion.h2
              id="directors-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                fontSize: isMobile ? '2.1rem' : 'clamp(2.5rem, 4.5vw, 3.8rem)',
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
                  marginTop: '10px',
                  marginBottom: 0,
                  maxWidth: '720px',
                  fontWeight: 350,
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div
            ref={carouselRef}
            className="directors-track"
            style={{
              display: 'flex',
              gap: isMobile ? '16px' : '24px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              padding: isMobile ? '8px 0 20px 0' : '12px 0 28px 0',
              boxSizing: 'border-box',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {directors.map((director) => {
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
                    flex: isMobile ? '0 0 82vw' : '0 0 clamp(290px, calc((100% - 72px) / 4), 380px)',
                    height: isMobile ? '450px' : 'clamp(460px, 56vh, 520px)',
                    borderRadius: '24px',
                    background: '#ffffff',
                    boxShadow: 'none',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    padding: '10px',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    scrollSnapAlign: 'start',
                    transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'all 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Portrait Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: isActive ? '46%' : '100%',
                      borderRadius: '18px',
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
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 30vw, 25vw"
                      style={{
                        objectFit: 'cover',
                        objectPosition: director.objectPosition || 'center 20%',
                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>

                  {/* Info Panel Reveal */}
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '12px 6px 4px',
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
                          fontWeight: 400,
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
                          fontSize: '18px',
                          color: '#555555',
                          lineHeight: 1.5,
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
                        gap: '8px',
                        marginTop: '8px',
                        paddingTop: '6px',
                      }}
                    >
                      {/* Category Pill Tag */}
                      <span
                        style={{
                          background: '#f2f2f2',
                          color: '#333333',
                          padding: '6px 14px',
                          borderRadius: '9999px',
                          fontSize: '18px',
                          fontWeight: 400,
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
                          fontSize: '18px',
                          fontWeight: 400,
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

        {/* Bottom Left Controls Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: isMobile ? '16px' : '24px',
            paddingTop: '4px',
            width: '100%',
          }}
        >
          {/* Left Arrow Controls & Counter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px' }}>
            <ArrowBtn onClick={handlePrev} direction="prev" label="Previous directors" />
            <span
              style={{
                fontSize: 'clamp(18px, 1.1vw, 20px)',
                color: '#444444',
                letterSpacing: '0.04em',
                minWidth: '56px',
                textAlign: 'center',
                fontFamily: 'var(--font-primary)',
                fontWeight: 400,
              }}
            >
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
            </span>
            <ArrowBtn onClick={handleNext} direction="next" label="Next directors" />
          </div>
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
      `}</style>
    </section>
  );
}
