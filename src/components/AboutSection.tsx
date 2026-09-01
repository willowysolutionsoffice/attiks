'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="about-us"
      style={{
        position: 'relative',
        background: '#ffffff',
        padding: '100px clamp(32px, 6vw, 100px) 100px',
        width: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
      aria-labelledby="about-studio-heading"
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          maxWidth: '820px',
        }}
      >
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(18px, 1.1vw, 20px)',
            letterSpacing: '0.04em',
            textTransform: 'none',
            color: '#666666',
            margin: '0 0 18px 0',
            fontWeight: 500,
          }}
        >
          Studio
        </motion.p>

        {/* Editorial Heading */}
        <motion.h2
          id="about-studio-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#000000',
            letterSpacing: '-0.025em',
            margin: '0 0 36px 0',
            lineHeight: 1.1,
            textTransform: 'none',
          }}
        >
          Architecture rooted<br />in place &amp; climate
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            width: '48px',
            height: '1px',
            background: '#000000',
            marginBottom: '32px',
          }}
        />

        {/* Body Statement */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(18px, 1.35vw, 22px)',
            lineHeight: 1.55,
            fontWeight: 400,
            color: '#222222',
            letterSpacing: '-0.01em',
            margin: '0 0 32px 0',
          }}
        >
          <strong style={{ fontWeight: 700, color: '#000000' }}>Attiks Architecture</strong> is a Kerala-based architecture practice working
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
                fontSize: 'clamp(18px, 1.2vw, 20px)',
                lineHeight: 1.65,
                fontWeight: 400,
                color: '#555555',
                letterSpacing: '-0.005em',
                marginBottom: '28px',
              }}
            >
              Founded on the belief that architecture should serve both people and place, the
              studio approaches every project with sensitivity to local culture,
              environment, and craft. With a dedicated team of architects, designers, and engineering
              consultants, Attiks has delivered projects across Kerala and beyond.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Know More + About CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}
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
              fontSize: 'clamp(18px, 1.15vw, 20px)',
              fontWeight: 600,
              letterSpacing: '0.01em',
              textDecoration: 'underline',
              textUnderlineOffset: '5px',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.5'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
          >
            {isExpanded ? 'Show less' : 'Know more'}
          </button>

          <Link
            href="/about"
            style={{
              fontSize: 'clamp(18px, 1.15vw, 20px)',
              fontWeight: 500,
              color: '#555555',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#000000'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#555555'; }}
          >
            About the studio &rarr;
          </Link>
        </motion.div>
      </div>

      {/* Right: Watermark Triangle Motif (Half Inside Viewport) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translate(45%, -50%)',
          width: 'clamp(460px, 48vw, 760px)',
          height: 'clamp(460px, 48vw, 760px)',
          opacity: 0.08,
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/Trblack.png"
          alt=""
          fill
          sizes="(max-width: 768px) 360px, 760px"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </div>
    </section>
  );
}
