'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';

const heroSlides = [
  {
    id: '1',
    image: '/villa_showcase.webp',
    quote: 'According to Vitruvius, the architect should strive to fulfill each of these three attributes — firmness, commodity, and delight.',
    isQuote: true,
    headingTop: 'Building',
    headingBottom: 'Beyond',
    rightTitle: 'Architecture can mean',
    rightDesc: 'A practice shaping contextual, enduring spaces informed by climate, material, and spatial experience.',
    ctaText: 'View projects',
    ctaHref: '/projects',
  },
  {
    id: '2',
    image: '/architecture.webp',
    quote: 'Architecture is the learned game, correct and magnificent, of forms assembled in the light.',
    isQuote: true,
    headingTop: 'Crafting',
    headingBottom: 'Spaces',
    rightTitle: 'Enduring & Contextual',
    rightDesc: 'Designing residential, commercial, and cultural institutions with deep sensitivity to local culture and climate.',
    ctaText: 'View projects',
    ctaHref: '/projects',
  },
  {
    id: '3',
    image: '/coastal_palace.webp',
    quote: 'Form follows function — that has been misunderstood. Form and function should be one, joined in a spiritual union.',
    isQuote: true,
    headingTop: 'Timeless',
    headingBottom: 'Living',
    rightTitle: 'Harmonious Design',
    rightDesc: 'Seamlessly blurring the boundaries between interior living and exterior natural landscapes.',
    ctaText: 'View projects',
    ctaHref: '/projects',
  },
  {
    id: '4',
    image: '/forest.webp',
    quote: 'The dialogue between built structures and untouched nature produces architecture that matures with grace.',
    isQuote: true,
    headingTop: 'Rooted in',
    headingBottom: 'Nature',
    rightTitle: 'Vernacular Craft',
    rightDesc: 'Innovative ecological architecture grounded in authentic materials and modern structural precision.',
    ctaText: 'View projects',
    ctaHref: '/projects',
  },
];

export default function Hero({ projects }: { projects?: Project[] }) {
  const activeProjects = projects
    ? projects.filter((p) => p.status !== 'draft')
    : [];

  const slides = activeProjects.length > 0
    ? activeProjects.map((p) => {
        // Split title into headingTop and headingBottom
        const words = p.title.trim().split(/\s+/);
        let headingTop = p.title;
        let headingBottom = '';
        if (words.length > 1) {
          const mid = Math.ceil(words.length / 2);
          headingTop = words.slice(0, mid).join(' ');
          headingBottom = words.slice(mid).join(' ');
        } else {
          headingBottom = p.category.charAt(0).toUpperCase() + p.category.slice(1);
        }

        return {
          id: p.id,
          image: p.image || '/architecture.webp',
          quote: p.highlights && p.highlights.length > 0
            ? p.highlights.join(' • ')
            : `${p.category} • ${p.location} • ${p.year}`,
          isQuote: false,
          headingTop,
          headingBottom,
          rightTitle: p.scope || (p.category.charAt(0).toUpperCase() + p.category.slice(1)),
          rightDesc: p.description,
          ctaText: 'View project',
          ctaHref: `/projects/${p.id}`,
        };
      })
    : heroSlides;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide cycle every 4.5s with clean reset on slide change
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const slide = slides[currentSlide] || slides[0];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#0a0a0a',
        boxSizing: 'border-box',
      }}
      aria-label="Hero Architectural Showcase"
    >
      {/* Preloaded Stacked Background Images with Instant Cross-Fade (Zero Buffering / Zero Black Gap) */}
      {slides.map((s, idx) => {
        const isActive = idx === currentSlide;
        return (
          <motion.div
            key={s.id}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 1.04,
            }}
            transition={{
              opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: isActive ? 2 : 1,
              pointerEvents: 'none',
            }}
          >
            <Image
              src={s.image}
              alt={`${s.headingTop} ${s.headingBottom} - Attiks Architecture`}
              fill
              priority
              sizes="100vw"
              quality={85}
              style={{ objectFit: 'cover' }}
            />
            {/* Cinematic Gradient Overlays for High Legibility */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.85) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 20% 70%, rgba(0,0,0,0.65) 0%, transparent 60%)',
              }}
            />
          </motion.div>
        );
      })}

      {/* ============================================================
          TOP-LEFT QUOTE / SPEC OVERLAY
          ============================================================ */}
      <div
        className="hero-quote-overlay"
        style={{
          position: 'absolute',
          top: '120px',
          left: 'clamp(20px, 4vw, 56px)',
          zIndex: 10,
          maxWidth: 'clamp(280px, 85vw, 600px)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.quote}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'var(--color-accent, #C4703F)',
                textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              }}
            >
              {slide.isQuote ? 'Vision' : 'Project Highlights'}
            </span>
            <blockquote
              style={{
                margin: 0,
                padding: 0,
                border: 'none',
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: 'clamp(0.95rem, 1.3vw, 1.35rem)',
                lineHeight: 1.4,
                fontWeight: slide.isQuote ? 300 : 400,
                fontFamily: slide.isQuote ? 'var(--font-canela)' : 'var(--font-sans)',
                fontStyle: slide.isQuote ? 'italic' : 'normal',
                letterSpacing: slide.isQuote ? '0.02em' : '0.12em',
                textShadow: '0 2px 12px rgba(0,0,0,0.7)',
                textTransform: slide.isQuote ? 'none' : 'uppercase',
              }}
            >
              {slide.isQuote ? `“${slide.quote}”` : slide.quote}
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================
          BOTTOM HERO CONTENT: HEADLINES + CTA & RIGHT CALLOUT
          ============================================================ */}
      <div
        className="hero-bottom-content"
        style={{
          position: 'absolute',
          bottom: '48px',
          left: '0',
          width: '100%',
          padding: '0 clamp(20px, 4vw, 56px)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Headline + Pill CTA Button */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '750px', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.headingTop + slide.headingBottom}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                style={{
                  margin: 0,
                  lineHeight: 0.95,
                  display: 'flex',
                  flexDirection: 'column',
                  textShadow: '0 4px 24px rgba(0,0,0,0.7)',
                }}
              >
                <span
                  className="hero-title-top"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(2.0rem, 6.0vw, 4.2rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.03em',
                    display: 'block',
                  }}
                >
                  {slide.headingTop}
                </span>
                <span
                  className="font-display hero-title-bottom"
                  style={{
                    fontSize: 'clamp(2.0rem, 6.0vw, 4.2rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  {slide.headingBottom}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Pill CTA Button */}
          <div className="hero-cta-btn" style={{ marginTop: '20px' }}>
            <Link
              href={slide.ctaHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                background: 'rgba(0, 0, 0, 0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.45)',
                borderRadius: '9999px',
                padding: '6px 6px 6px 20px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: 'clamp(0.88rem, 1.1vw, 1.02rem)',
                fontWeight: 500,
                letterSpacing: '0.01em',
                transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0, 0, 0, 0.8)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#ffffff';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0, 0, 0, 0.55)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255, 255, 255, 0.45)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              <span>{slide.ctaText}</span>
              <span
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                &rsaquo;
              </span>
            </Link>
          </div>
        </div>

        {/* Right: Architecture Callout Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.rightTitle}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.38, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="hero-callout-card"
            style={{
              maxWidth: '360px',
              textAlign: 'left',
              textShadow: '0 2px 14px rgba(0,0,0,0.7)',
            }}
          >
            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.1rem, 1.7vw, 1.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                marginBottom: '6px',
                textTransform: 'none',
              }}
            >
              {slide.rightTitle}
            </h2>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.88)',
                fontSize: 'clamp(0.82rem, 1.0vw, 0.92rem)',
                lineHeight: 1.5,
                fontWeight: 400,
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {slide.rightDesc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================
          RIGHT SIDE VERTICAL PAGINATION DOTS
          ============================================================ */}
      <div
        className="hero-pagination-pill"
        style={{
          position: 'absolute',
          right: 'clamp(16px, 3vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '10px 6px',
          borderRadius: '9999px',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}
      >
        {slides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            className={`hero-dot${idx === currentSlide ? ' active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}: ${s.headingTop} ${s.headingBottom}`}
            style={{
              background: idx === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
              border: 'none',
              width: '6px',
              height: idx === currentSlide ? '18px' : '6px',
              borderRadius: '3px',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
