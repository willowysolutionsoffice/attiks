'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const coreValues = [
  {
    num: '01',
    title: 'Design Excellence',
    description:
      'We believe in the enduring, quiet power of exceptional design. By constantly exploring fresh ideas and pushing past conventional limits, we create spaces that are structurally enduring, aesthetically compelling, and fundamentally supportive of human well-being. Excellence, to us, is an ongoing pursuit of balance between beauty and purpose.',
  },
  {
    num: '02',
    title: 'Teamwork',
    description:
      'Our greatest asset is our collective intelligence. We have cultivated a collaborative studio culture where diverse perspectives merge, ensuring that every project benefits from shared expertise. This seamless teamwork allows us to tackle complex challenges efficiently and deliver results that consistently exceed expectations.',
  },
  {
    num: '03',
    title: 'Integrity',
    description:
      'As a practice and as individuals, we hold ourselves to the highest standards of character. Trust, honesty, transparency, and reliability form the backbone of how we operate. We believe that lasting relationships with clients, partners, and communities are built on a foundation of unwavering moral clarity.',
  },
  {
    num: '04',
    title: 'Social & Environmental Responsibility',
    description:
      'We recognize that every structure we build leaves a footprint. As a socially and environmentally conscious firm, we integrate sustainability into our core process—crafting responsible projects that work in quiet, effortless harmony with their surrounding landscapes, climates, and communities.',
  },
  {
    num: '05',
    title: 'Service Quality',
    description:
      'Great architecture requires an exceptional client journey. We know that a supportive service atmosphere is just as important as the final blueprint. That is why we go the extra mile to provide attentive, reliable, and timely guidance, ensuring you feel supported and informed at every stage of the design and construction process.',
  },
];

export default function ValuesSection() {
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  return (
    <section
      id="manifesto-section"
      style={{
        background: '#ffffff',
        color: '#111111',
        width: '100%',
        padding: 'clamp(80px, 8vw, 140px) var(--section-padding)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      aria-label="Vision, Mission & Core Values"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* ============================================================
            01 / VISION — Asymmetric Layout (Label Left, Statement Right)
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="manifesto-grid-left"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 1fr) 2.6fr',
            gap: 'clamp(32px, 5vw, 80px)',
            paddingBottom: 'clamp(64px, 7vw, 100px)',
            alignItems: 'start',
          }}
        >
          {/* Section Indicator */}
          <div style={{ paddingTop: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(15px, 1vw, 17px)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#777777',
                display: 'inline-block',
              }}
            >
              01 / Vision
            </span>
          </div>

          {/* Vision Statement & Narration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3.5vw, 36px)' }}>
            <h2
              className="font-display"
              style={{
                fontFamily: 'var(--font-canela), serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                lineHeight: 1.15,
                color: '#000000',
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              &ldquo;Designing spaces that elevate the everyday human experience.&rdquo;
            </h2>

            <div
              style={{
                maxWidth: '680px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: '#333333',
                fontSize: 'clamp(18px, 1.15vw, 20px)',
                lineHeight: 1.75,
                fontWeight: 350,
              }}
            >
              <p style={{ margin: 0 }}>
                Architecture is fundamentally about people. We view the deployment of design creativity as a collective, highly responsible craft capable of profoundly shaping how we live.
              </p>
              <p style={{ margin: 0 }}>
                Our team is committed to exploring new boundaries to create environments that do not just occupy space, but actively enrich and elevate your quality of living.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Thin Divider Between Vision and Mission */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(0, 0, 0, 0.08)',
            marginBottom: 'clamp(64px, 7vw, 100px)',
          }}
        />

        {/* ============================================================
            02 / MISSION — Reversed Asymmetric Layout (Statement Left, Label Right)
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="manifesto-grid-right"
          style={{
            display: 'grid',
            gridTemplateColumns: '2.6fr minmax(180px, 1fr)',
            gap: 'clamp(32px, 5vw, 80px)',
            paddingBottom: 'clamp(64px, 7vw, 100px)',
            alignItems: 'start',
          }}
        >
          {/* Mission Statement & Narration (Left) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3.5vw, 36px)' }}>
            <h2
              className="font-display"
              style={{
                fontFamily: 'var(--font-canela), serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                lineHeight: 1.15,
                color: '#000000',
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              &ldquo;Shaping living standards worldwide through thoughtful, impactful design interventions.&rdquo;
            </h2>

            <div
              style={{
                maxWidth: '680px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: '#333333',
                fontSize: 'clamp(18px, 1.15vw, 20px)',
                lineHeight: 1.75,
                fontWeight: 350,
              }}
            >
              <p style={{ margin: 0 }}>
                Driven by a deep curiosity and an acute awareness of our surroundings, we translate everyday observations into meaningful architectural solutions for clients across the globe.
              </p>
              <p style={{ margin: 0 }}>
                We work closely with you to understand your vision, transforming your personal aspirations and dreams into physical realities—spaces that are not only striking to look at, but live comfortably in your memory for years to come.
              </p>
            </div>
          </div>

          {/* Section Indicator (Right) */}
          <div style={{ paddingTop: '8px', textAlign: 'right' }} className="manifesto-label-right">
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(15px, 1vw, 17px)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#777777',
                display: 'inline-block',
              }}
            >
              02 / Mission
            </span>
          </div>
        </motion.div>

        {/* Thin Divider Between Mission and Core Values */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(0, 0, 0, 0.08)',
            marginBottom: 'clamp(64px, 7vw, 100px)',
          }}
        />

        {/* ============================================================
            03 / CORE VALUES — Minimal Vertical Architectural Index
            ============================================================ */}
        <div style={{ width: '100%' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-40px' }}
            style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(15px, 1vw, 17px)',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#777777',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              03 / Core Values
            </span>
            <h2
              className="font-display"
              style={{
                fontFamily: 'var(--font-canela), serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                color: '#000000',
                letterSpacing: '-0.025em',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              The principles behind every space we create.
            </h2>
          </motion.div>

          {/* Architectural Index Rows */}
          <div
            style={{
              width: '100%',
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            }}
          >
            {coreValues.map((val, idx) => {
              const isHovered = activeHoverIndex === idx;

              return (
                <motion.div
                  key={val.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setActiveHoverIndex(idx)}
                  onMouseLeave={() => setActiveHoverIndex(null)}
                  onClick={() => setActiveHoverIndex(isHovered ? null : idx)}
                  style={{
                    position: 'relative',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    padding: 'clamp(28px, 3.5vw, 44px) 0',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="value-index-row"
                >
                  {/* Subtle Expanding Accent Rule on Hover */}
                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: '#000000',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Main Horizontal Content Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '24px',
                      width: '100%',
                    }}
                  >
                    {/* Left: Number + Title + Description */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'clamp(24px, 4vw, 56px)',
                        flex: 1,
                      }}
                    >
                      {/* Architectural Number */}
                      <span
                        style={{
                          fontFamily: 'var(--font-primary)',
                          fontSize: 'clamp(18px, 1.25vw, 22px)',
                          fontWeight: 500,
                          color: isHovered ? '#000000' : '#888888',
                          letterSpacing: '0.04em',
                          minWidth: '32px',
                          paddingTop: '2px',
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {val.num}
                      </span>

                      {/* Title + Expandable Description */}
                      <div style={{ flex: 1, maxWidth: '960px' }}>
                        <motion.h3
                          animate={{ x: isHovered ? 8 : 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: 'clamp(1.4rem, 2.2vw, 2.2rem)',
                            fontWeight: 500,
                            color: '#000000',
                            letterSpacing: '-0.02em',
                            margin: 0,
                            lineHeight: 1.2,
                            textTransform: 'none',
                          }}
                        >
                          {val.title}
                        </motion.h3>

                        {/* Smooth Editorial Description Reveal */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: 6 }}
                              animate={{ opacity: 1, height: 'auto', y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -4 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              style={{ overflow: 'hidden' }}
                              className="desktop-description-container"
                            >
                              <p
                                style={{
                                  fontSize: 'clamp(18px, 1.2vw, 20px)',
                                  lineHeight: 1.7,
                                  color: '#444444',
                                  fontWeight: 350,
                                  marginTop: '20px',
                                  marginBottom: '4px',
                                  maxWidth: '780px',
                                }}
                              >
                                {val.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Static Description Visible On Touch/Mobile */}
                        <div className="mobile-description-block">
                          <p
                            style={{
                              fontSize: '18px',
                              lineHeight: 1.65,
                              color: '#555555',
                              fontWeight: 350,
                              marginTop: '14px',
                              marginBottom: 0,
                            }}
                          >
                            {val.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Architectural Arrow Icon */}
                    <div style={{ paddingTop: '4px', paddingRight: '8px' }}>
                      <motion.div
                        animate={{
                          x: isHovered ? 4 : 0,
                          y: isHovered ? -4 : 0,
                          rotate: isHovered ? 45 : 0,
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: 'inline-flex', alignItems: 'center' }}
                      >
                        <ArrowUpRight
                          size={28}
                          strokeWidth={1.5}
                          style={{
                            color: isHovered ? '#000000' : '#888888',
                            transition: 'color 0.3s ease',
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx>{`
        .mobile-description-block {
          display: none;
        }

        @media (max-width: 900px) {
          .manifesto-grid-left {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .manifesto-grid-right {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            display: flex !important;
            flex-direction: column-reverse !important;
          }
          .manifesto-label-right {
            text-align: left !important;
          }
          .desktop-description-container {
            display: none !important;
          }
          .mobile-description-block {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
