'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const defaultHeroVideos = [
  {
    id: 'v-1',
    src: '/3735-173719892_medium.mp4',
  },
  {
    id: 'v-2',
    src: '/3967-175963622_medium.mp4',
  },
  {
    id: 'v-3',
    src: '/85348-590746467_medium.mp4',
  },
  {
    id: 'v-4',
    src: '/16199324_3840_2160_30fps.mp4',
  },
];

export default function Hero({ videos = defaultHeroVideos }: { videos?: { id: string; src: string; poster?: string }[]; projects?: any }) {
  const videoList = videos && videos.length > 0 ? videos : defaultHeroVideos;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatically advance to the next video on cycle or completion
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoList.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [currentVideoIndex, videoList.length]);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoList.length);
  };

  const activeVideo = videoList[currentVideoIndex] || videoList[0];

  return (
    <section
      className="hero-container-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        margin: 0,
        padding: '0 clamp(20px, 5vw, 64px) clamp(36px, 6vh, 64px)',
        overflow: 'hidden',
        background: '#050505',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
      }}
      aria-label="Hero Architectural Video Showcase"
    >
      {/* Background Fullscreen Video / Motion Switcher */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVideo.id + currentVideoIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.92) contrast(1.05)',
            }}
          >
            <source src={activeVideo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Cinematic Vignette & Gradient Overlays */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.8) 100%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 20% 80%, rgba(0,0,0,0.5) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ============================================================
          BOTTOM-LEFT: MINIMAL "view projects >" CTA
          ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Link
          href="/projects"
          className="hero-cta-minimal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: 'clamp(20px, 1.55vw, 26px)',
            fontWeight: 350,
            fontFamily: 'var(--font-primary)',
            letterSpacing: '-0.01em',
            textTransform: 'lowercase',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.7)',
            transition: 'opacity 0.25s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.opacity = '0.75';
            const svg = el.querySelector('svg');
            if (svg) svg.style.transform = 'translateX(6px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.opacity = '1';
            const svg = el.querySelector('svg');
            if (svg) svg.style.transform = 'translateX(0)';
          }}
        >
          <span>view projects</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <line x1="4" y1="12" x2="20" y2="12" />
            <polyline points="14 6 20 12 14 18" />
          </svg>
        </Link>
      </motion.div>

      {/* ============================================================
          RIGHT SIDE VERTICAL PAGINATION PILL (HIDDEN ON SMALL SCREENS)
          ============================================================ */}
      <div
        className="hero-pagination-pill"
        style={{
          position: 'absolute',
          right: 'clamp(16px, 3vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(25, 25, 25, 0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          padding: '12px 6px',
          borderRadius: '9999px',
          zIndex: 20,
          display: isMobile ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '9px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
        }}
      >
        {videoList.map((v, idx) => (
          <button
            key={v.id + idx}
            type="button"
            className={`hero-dot${idx === currentVideoIndex ? ' active' : ''}`}
            onClick={() => setCurrentVideoIndex(idx)}
            aria-label={`Switch to video scene ${idx + 1}`}
            style={{
              background: idx === currentVideoIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
              border: 'none',
              width: '6px',
              height: idx === currentVideoIndex ? '20px' : '6px',
              borderRadius: '9999px',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-pagination-pill {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
