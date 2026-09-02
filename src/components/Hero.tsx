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
          BOTTOM-LEFT: MINIMAL LUXURY "VIEW PROJECT" CTA
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
            gap: '14px',
            background: 'rgba(10, 10, 10, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            borderRadius: '9999px',
            padding: '6px 6px 6px 20px',
            textDecoration: 'none',
            fontSize: '15.5px',
            fontWeight: 400,
            letterSpacing: '0.01em',
            textTransform: 'none',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = '#000000';
            el.style.borderColor = 'rgba(255, 255, 255, 0.45)';
            el.style.transform = 'translateY(-2px) scale(1.02)';
            el.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.7)';
            const disc = el.querySelector('.cta-disc') as HTMLElement;
            if (disc) {
              disc.style.transform = 'translateX(2px)';
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(10, 10, 10, 0.82)';
            el.style.borderColor = 'rgba(255, 255, 255, 0.22)';
            el.style.transform = 'translateY(0) scale(1)';
            el.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)';
            const disc = el.querySelector('.cta-disc') as HTMLElement;
            if (disc) {
              disc.style.transform = 'translateX(0)';
            }
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>View project</span>
          <span
            className="cta-disc"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#ffffff',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: 1,
              flexShrink: 0,
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            &rsaquo;
          </span>
        </Link>
      </motion.div>

      {/* ============================================================
          RIGHT SIDE VERTICAL PAGINATION (HIDDEN ON MOBILE SCREENS)
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
