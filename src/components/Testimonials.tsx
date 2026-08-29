'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/data/projects';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto cycle testimonials every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[current];

  return (
    <section
      style={{
        position: 'relative',
        background: '#ffffff',
        minHeight: '80vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px clamp(24px, 4vw, 56px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      aria-label="Client Testimonials"
    >
      {/* Main Centered Content */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Title in editorial serif italic */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="font-display"
          style={{
            fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#000000',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
            textTransform: 'none',
          }}
        >
          Client Testimonials
        </motion.h2>

        {/* Double quotation mark icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ marginBottom: '32px' }}
          aria-hidden="true"
        >
          <svg
            width="38"
            height="30"
            viewBox="0 0 38 30"
            fill="#000000"
            style={{ display: 'block' }}
          >
            <path d="M0 18C0 8.05 6.08 1.82 13.55 0L15.36 4.5C10.38 5.85 8.13 9 8.13 12.6H15.36V30H0V18ZM22.64 18C22.64 8.05 28.72 1.82 36.19 0L38 4.5C33.02 5.85 30.77 9 30.77 12.6H38V30H22.64V18Z" />
          </svg>
        </motion.div>

        {/* Quote text & author with AnimatePresence */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  padding: 0,
                  border: 'none',
                  fontSize: 'clamp(1.18rem, 1.7vw, 1.52rem)',
                  lineHeight: 1.38,
                  fontWeight: 400,
                  color: '#111111',
                  letterSpacing: '-0.015em',
                  marginBottom: '32px',
                  maxWidth: '820px',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <cite
                style={{
                  fontStyle: 'normal',
                  fontSize: 'clamp(1.05rem, 1.3vw, 1.22rem)',
                  fontWeight: 500,
                  color: '#111111',
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                {t.author}, <span style={{ color: '#666666' }}>{t.designation}</span>
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '28px' }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              style={{
                width: idx === current ? '16px' : '6px',
                height: '4px',
                borderRadius: '2px',
                background: idx === current ? '#000000' : 'rgba(0,0,0,0.25)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
