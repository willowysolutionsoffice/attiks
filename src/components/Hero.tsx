'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const defaultHeroVideos = [
  {
    id: 'v-1',
    src: '/3735-173719892_medium.mp4',
    poster: '/villa_showcase.webp',
  },
  {
    id: 'v-2',
    src: '/3967-175963622_medium.mp4',
    poster: '/architecture.webp',
  },
  {
    id: 'v-3',
    src: '/85348-590746467_medium.mp4',
    poster: '/coastal_palace.webp',
  },
  {
    id: 'v-4',
    src: '/16199324_3840_2160_30fps.mp4',
    poster: '/forest.webp',
  },
];

export default function Hero({ videos = defaultHeroVideos }: { videos?: { id: string; src: string; poster?: string }[]; projects?: any }) {
  const videoList = videos && videos.length > 0 ? videos : defaultHeroVideos;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        margin: 0,
        padding: '0 clamp(24px, 5vw, 64px) clamp(48px, 8vh, 64px)',
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
            poster={activeVideo.poster}
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
          BOTTOM-LEFT: LUXURY BLACK & WHITE THEME "VIEW PROJECTS" CTA
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
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            background: 'rgba(255, 255, 255, 0.95)',
            color: '#000000',
            border: '1px solid #ffffff',
            borderRadius: '9999px',
            padding: '8px 8px 8px 24px',
            textDecoration: 'none',
            fontSize: 'clamp(18px, 1.15vw, 20px)',
            fontWeight: 600,
            letterSpacing: '0.01em',
            textTransform: 'none',
            fontFamily: 'var(--font-primary)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = '#000000';
            el.style.color = '#ffffff';
            el.style.borderColor = '#ffffff';
            el.style.transform = 'translateY(-2px) scale(1.02)';
            el.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.6)';
            const disc = el.querySelector('.cta-disc') as HTMLElement;
            if (disc) {
              disc.style.background = '#ffffff';
              disc.style.color = '#000000';
              disc.style.transform = 'translateX(2px)';
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(255, 255, 255, 0.95)';
            el.style.color = '#000000';
            el.style.borderColor = '#ffffff';
            el.style.transform = 'translateY(0) scale(1)';
            el.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
            const disc = el.querySelector('.cta-disc') as HTMLElement;
            if (disc) {
              disc.style.background = '#000000';
              disc.style.color = '#ffffff';
              disc.style.transform = 'translateX(0)';
            }
          }}
        >
          <span>View projects</span>
          <span
            className="cta-disc"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#000000',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
              lineHeight: 1,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            &rsaquo;
          </span>
        </Link>
      </motion.div>

      {/* ============================================================
          RIGHT SIDE VERTICAL PAGINATION DOTS (ALWAYS VISIBLE)
          ============================================================ */}
      <div
        className="hero-pagination-pill"
        style={{
          position: 'absolute',
          right: 'clamp(16px, 3vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
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
        {videoList.map((v, idx) => (
          <button
            key={v.id + idx}
            type="button"
            className={`hero-dot${idx === currentVideoIndex ? ' active' : ''}`}
            onClick={() => setCurrentVideoIndex(idx)}
            aria-label={`Switch to video scene ${idx + 1}`}
            style={{
              background: idx === currentVideoIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
              border: 'none',
              width: '6px',
              height: idx === currentVideoIndex ? '18px' : '6px',
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
