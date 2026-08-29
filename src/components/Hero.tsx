'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const heroSlides = [
  {
    id: 1,
    image: '/villa_showcase.webp',
    quote: 'According to Vitruvius, the architect should strive to fulfill each of these three attributes — firmness, commodity, and delight.',
    headingTop: 'Building',
    headingBottom: 'Beyond',
    rightTitle: 'Architecture can mean',
    rightDesc: 'A practice shaping contextual, enduring spaces informed by climate, material, and spatial experience.',
    ctaText: 'View projects',
    ctaHref: '/projects',
  },
  {
    id: 2,
    image: '/architecture.webp',
    quote: 'Architecture is the learned game, correct and magnificent, of forms assembled in the light.',
    headingTop: 'Crafting',
    headingBottom: 'Spaces',
    rightTitle: 'Enduring & Contextual',
    rightDesc: 'Designing residential, commercial, and cultural institutions with deep sensitivity to local culture and climate.',
    ctaText: 'View projects',
    ctaHref: '/projects',
  },
  {
    id: 3,
    image: '/coastal_palace.webp',
    quote: 'Form follows function — that has been misunderstood. Form and function should be one, joined in a spiritual union.',
    headingTop: 'Timeless',
    headingBottom: 'Living',
    rightTitle: 'Harmonious Design',
    rightDesc: 'Seamlessly blurring the boundaries between interior living and exterior natural landscapes.',
    ctaText: 'View projects',
    ctaHref: '/projects',
  },
  {
    id: 4,
    image: '/forest.webp',
    quote: 'The dialogue between built structures and untouched nature produces architecture that matures with grace.',
    headingTop: 'Rooted in',
    headingBottom: 'Nature',
    rightTitle: 'Vernacular Craft',
    rightDesc: 'Innovative ecological architecture grounded in authentic materials and modern structural precision.',
    ctaText: 'View projects',
    ctaHref: '/projects',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide cycle every 7s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '650px',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#0a0a0a',
        boxSizing: 'border-box',
      }}
      aria-label="Hero Architectural Showcase"
    >
      {/* Background Images with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }}
        >
          <Image
            src={slide.image}
            alt={`${slide.headingTop} ${slide.headingBottom} - Attiks Architecture`}
            fill
            priority={currentSlide === 0}
            fetchPriority={currentSlide === 0 ? "high" : "auto"}
            sizes="100vw"
            quality={80}
            style={{ objectFit: 'cover' }}
          />
          {/* Cinematic Gradient Overlays for High Legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.75) 100%)',
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
      </AnimatePresence>

      {/* ============================================================
          MIDDLE / TOP-LEFT QUOTE OVERLAY
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          top: '130px',
          left: 'clamp(24px, 4vw, 56px)',
          zIndex: 10,
          maxWidth: '460px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={slide.quote}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              margin: 0,
              padding: 0,
              border: 'none',
              color: 'rgba(255, 255, 255, 0.92)',
              fontSize: 'clamp(0.85rem, 1.1vw, 0.98rem)',
              lineHeight: 1.55,
              fontWeight: 400,
              letterSpacing: '0.01em',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            &ldquo;{slide.quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* ============================================================
          BOTTOM HERO CONTENT: HEADLINES + CTA & RIGHT CALLOUT
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          bottom: '56px',
          left: '0',
          width: '100%',
          padding: '0 clamp(24px, 4vw, 56px)',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '32px',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Headline + Pill CTA Button */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '750px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.headingTop + slide.headingBottom}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                style={{
                  margin: 0,
                  lineHeight: 0.95,
                  display: 'flex',
                  flexDirection: 'column',
                  textShadow: '0 4px 24px rgba(0,0,0,0.6)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(3.6rem, 7.5vw, 6.8rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.03em',
                    display: 'block',
                  }}
                >
                  {slide.headingTop}
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(3.6rem, 7.5vw, 6.8rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    display: 'block',
                    marginTop: '4px',
                  }}
                >
                  {slide.headingBottom}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          {/* Pill CTA Button */}
          <div style={{ marginTop: '28px' }}>
            <Link
              href={slide.ctaHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '16px',
                background: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '9999px',
                padding: '8px 8px 8px 24px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                fontWeight: 500,
                letterSpacing: '0.01em',
                transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0, 0, 0, 0.7)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#ffffff';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0, 0, 0, 0.45)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255, 255, 255, 0.4)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              <span>{slide.ctaText}</span>
              <span
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
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
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: '360px',
              textAlign: 'left',
              textShadow: '0 2px 14px rgba(0,0,0,0.6)',
            }}
          >
            <h2
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                marginBottom: '8px',
                textTransform: 'none',
              }}
            >
              {slide.rightTitle}
            </h2>
            <p
              style={{
                color: 'rgba(255, 255, 255, 0.88)',
                fontSize: 'clamp(0.85rem, 1.05vw, 0.95rem)',
                lineHeight: 1.55,
                fontWeight: 400,
                margin: 0,
              }}
            >
              {slide.rightDesc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================
          BOTTOM CENTER PAGINATION PILL
          ============================================================ */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '8px 18px',
          borderRadius: '9999px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        {heroSlides.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}: ${s.headingTop} ${s.headingBottom}`}
            style={{
              background: idx === currentSlide ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
              border: 'none',
              width: idx === currentSlide ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}
