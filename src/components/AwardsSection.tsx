'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { Award, awardsData } from '@/data/awards';

interface AwardsSectionProps {
  awards?: Award[];
  autoPlay?: boolean;
  interval?: number;
  title?: string;
  subtitle?: string;
}

export default function AwardsSection({
  awards = awardsData,
  autoPlay = true,
  interval = 5500,
  title = 'Global Recognition',
  subtitle = 'Honoring our persistent devotion to architectural clarity, contextual materiality, and climate-positive living.',
}: AwardsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive calculation & mobile detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerView(1);
        setIsMobile(true);
      } else if (width < 1024) {
        setItemsPerView(2);
        setIsMobile(false);
      } else {
        setItemsPerView(3);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, awards.length - itemsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay ONLY on Desktop / Tablet; completely disabled on mobile
  useEffect(() => {
    if (!autoPlay || isMobile || isPaused || maxIndex === 0) return;
    const timer = setInterval(() => {
      nextSlide();
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isMobile, isPaused, interval, maxIndex, nextSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch Swipe Gesture Handler (One-by-one card scroll)
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  return (
    <section
      aria-label="Recognition and Honors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: isMobile ? '56px 20px 48px' : '90px clamp(24px, 5vw, 80px) 80px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        outline: 'none',
        borderTop: '1px solid #f0ede8',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Section Header */}
        <div
          style={{
            marginBottom: isMobile ? '28px' : '44px',
            maxWidth: '720px',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display"
            style={{
              fontSize: isMobile ? '2.1rem' : 'clamp(2.4rem, 4vw, 3.4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#000000',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              margin: '0 0 12px 0',
            }}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: 'clamp(18px, 1.15vw, 20px)',
              lineHeight: 1.6,
              color: '#666666',
              margin: 0,
            }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Carousel Viewport (1 by 1 on Mobile, 2 on Tablet, 3 on Desktop) */}
        <div
          ref={containerRef}
          style={{
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            touchAction: 'pan-y',
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            animate={{
              x: `-${(currentIndex * 100) / awards.length}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 32,
            }}
            style={{
              display: 'flex',
              width: `${(awards.length / itemsPerView) * 100}%`,
              margin: `0 -${isMobile ? 8 : 12}px`,
              boxSizing: 'border-box',
              cursor: 'grab',
            }}
          >
            {awards.map((award) => (
              <div
                key={award.id}
                style={{
                  flex: `0 0 ${100 / awards.length}%`,
                  padding: `0 ${isMobile ? 8 : 12}px`,
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ebe6df',
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                    transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.borderColor = '#000000';
                      e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 0, 0, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#ebe6df';
                      e.currentTarget.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.03)';
                    }
                  }}
                >
                  {/* Top Image Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: isMobile ? '200px' : '230px',
                      overflow: 'hidden',
                      backgroundColor: '#f3efe9',
                    }}
                  >
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Gradient overlay for badges */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 45%, rgba(0,0,0,0.2) 100%)',
                      }}
                    />

                    {/* Top Badges */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        right: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        zIndex: 2,
                      }}
                    >
                      <span
                        style={{
                          padding: '5px 12px',
                          borderRadius: '20px',
                          background: 'rgba(0, 0, 0, 0.55)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          fontSize: '13px',
                          fontWeight: 400,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: '#ffffff',
                        }}
                      >
                        {award.organization}
                      </span>

                      <span
                        style={{
                          padding: '5px 12px',
                          borderRadius: '20px',
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          color: '#000000',
                          fontSize: '13px',
                          fontWeight: 400,
                          letterSpacing: '0.04em',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                      >
                        {award.year}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Content Body */}
                  <div
                    style={{
                      padding: isMobile ? '20px 18px 22px' : '24px 22px 26px',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <h3
                      className="font-display"
                      style={{
                        fontSize: isMobile ? '1.3rem' : '1.45rem',
                        fontWeight: 400,
                        lineHeight: 1.3,
                        color: '#000000',
                        margin: '0 0 8px 0',
                      }}
                    >
                      {award.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '18px',
                        lineHeight: 1.6,
                        color: '#666666',
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      {award.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Navigation & Indicator Bar */}
        <div
          style={{
            marginTop: isMobile ? '24px' : '36px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left Arrow Controls (Sleek and compact on Mobile) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '8px' : '12px',
            }}
          >
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous card"
              style={{
                width: isMobile ? '42px' : '46px',
                height: isMobile ? '42px' : '46px',
                borderRadius: '50%',
                border: '1.5px solid #000000',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
                color: '#000000',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }
              }}
            >
              <svg width={isMobile ? '15' : '16'} height={isMobile ? '15' : '16'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next card"
              style={{
                width: isMobile ? '42px' : '46px',
                height: isMobile ? '42px' : '46px',
                borderRadius: '50%',
                border: '1.5px solid #000000',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
                color: '#000000',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000000';
                }
              }}
            >
              <svg width={isMobile ? '15' : '16'} height={isMobile ? '15' : '16'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Mobile counter indicator */}
            {isMobile && (
              <span
                style={{
                  marginLeft: '8px',
                  fontSize: '16px',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: '#666666',
                }}
              >
                0{currentIndex + 1} / 0{awards.length}
              </span>
            )}
          </div>

          {/* Desktop/Tablet-only Sleek Progress Indicators (Completely Hidden on Mobile) */}
          {!isMobile && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              aria-label="Carousel pagination"
            >
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={currentIndex === idx ? 'true' : 'false'}
                  style={{
                    width: currentIndex === idx ? '24px' : '6px',
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: currentIndex === idx ? '#000000' : '#e0deda',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
