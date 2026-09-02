'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="about-us"
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: 'clamp(140px, 14vh, 210px) clamp(32px, 6vw, 100px) clamp(90px, 9vh, 130px)',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
      aria-label="About Studio Statement"
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '840px',
        }}
      >
        {/* Main Body Statement */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(18px, 1.35vw, 22px)',
            lineHeight: 1.55,
            fontWeight: 400,
            color: '#222222',
            letterSpacing: '-0.01em',
            margin: '0 0 28px 0',
          }}
        >
          <strong style={{ fontWeight: 600, color: '#000000' }}>Attiks Architecture</strong> is a Kerala-based architecture practice working
          across residential, commercial, institutional, hospitality, and
          large-scale developments. The practice creates contextual, enduring
          architecture shaped by climate, material, and the experience of space.
        </motion.p>

        {/* Expandable Detail */}
        <AnimatePresence>
          {isExpanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                overflow: 'hidden',
                fontSize: 'clamp(17px, 1.2vw, 20px)',
                lineHeight: 1.65,
                fontWeight: 400,
                color: '#555555',
                letterSpacing: '-0.005em',
                marginBottom: '24px',
              }}
            >
              Founded on the belief that architecture should serve both people and place, the
              studio approaches every project with sensitivity to local culture,
              environment, and craft. With a dedicated team of architects, designers, and engineering
              consultants, Attiks has delivered projects across Kerala and beyond.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Minimal "know more" Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              color: '#000000',
              cursor: 'pointer',
              fontSize: 'clamp(18px, 1.2vw, 20px)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              textTransform: 'lowercase',
              fontFamily: 'var(--font-primary)',
              transition: 'opacity 0.2s ease',
              textAlign: 'left',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.6'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            {isExpanded ? 'show less' : 'know more'}
          </button>
        </motion.div>
      </div>

      {/* Right: Watermark Triangle Motif */}
      <div
        className="about-watermark-bg"
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translate(35%, -50%)',
          width: 'clamp(380px, 46vw, 760px)',
          height: 'clamp(380px, 46vw, 760px)',
          opacity: 0.08,
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/Trblack.png"
          alt=""
          fill
          sizes="(max-width: 768px) 300px, 760px"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </div>
    </section>
  );
}
