'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const galleryImages = [
  { src: '/architecture.webp', alt: 'Greenfield Tech Park, Kochi', title: 'Greenfield Tech Park', location: 'Kochi, Kerala' },
  { src: '/coastal_palace.webp', alt: 'Coastal Villa, Varkala', title: 'Coastal Villa', location: 'Varkala, Kerala' },
  { src: '/comm_modern.webp', alt: 'Kerala Arts Center, Thrissur', title: 'Kerala Arts Center', location: 'Thrissur, Kerala' },
  { src: '/comm_beach.webp', alt: 'Bayshore Resort, Kovalam', title: 'Bayshore Resort', location: 'Kovalam, Kerala' },
  { src: '/forest.webp', alt: 'Wayanad Forest Retreat', title: 'Forest Retreat', location: 'Wayanad, Kerala' },
  { src: '/penthouse.webp', alt: 'Skyline Penthouse, Kochi', title: 'Skyline Penthouse', location: 'Kochi, Kerala' },
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
        width: '52px',
        height: '52px',
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
        width="18"
        height="18"
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

function GalleryCard({ img }: { img: typeof galleryImages[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10.5',
        overflow: 'hidden',
        background: '#f0f0f0',
        cursor: 'pointer',
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{
          objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Hover Title Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '24px',
              boxSizing: 'border-box',
            }}
          >
            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {img.location}
            </p>
            <h3
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                margin: 0,
                textTransform: 'none',
              }}
            >
              {img.title}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AboutGallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const currentImages = [
    galleryImages[currentIndex % galleryImages.length],
    galleryImages[(currentIndex + 1) % galleryImages.length],
  ];

  return (
    <section
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '60px clamp(24px, 4vw, 56px) 80px',
        minHeight: '85vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
      aria-label="Gallery Showcase"
    >
      {/* Dual Images Grid */}
      <div
        style={{
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
        }}
      >
        <AnimatePresence mode="wait">
          <div
            key={currentIndex}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              width: '100%',
              boxSizing: 'border-box',
            }}
            className="gallery-grid"
          >
            {currentImages.map((img, idx) => (
              <motion.div
                key={`${currentIndex}-${idx}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <GalleryCard img={img} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Bottom Controls Row: Arrow Left | Count | Arrow Right | View All */}
        <div
          className="gallery-controls-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '28px',
            paddingTop: '0',
          }}
        >
          {/* Arrow Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ArrowBtn onClick={handlePrev} direction="prev" label="Previous projects" />
            <span style={{ fontSize: '0.82rem', color: '#888', letterSpacing: '0.06em', minWidth: '56px', textAlign: 'center' }}>
              {String(currentIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
            </span>
            <ArrowBtn onClick={handleNext} direction="next" label="Next projects" />
          </div>

          {/* View All Projects */}
          <Link
            href="/projects"
            style={{
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#000000',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              borderBottom: '1px solid #000000',
              paddingBottom: '2px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.5'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
          >
            View all projects &rarr;
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
          .gallery-controls-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 20px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
