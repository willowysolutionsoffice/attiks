'use client';

import { useState } from 'react';
import Image from 'next/image';
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
        padding: 'clamp(60px, 7vw, 120px) var(--section-padding)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
      aria-label="Vision, Mission & Core Values"
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* ============================================================
            VISION — Editorial 2-Column with Architectural Imagery
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="vision-mission-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 'clamp(36px, 5vw, 80px)',
            paddingBottom: 'clamp(64px, 7vw, 100px)',
            alignItems: 'center',
          }}
        >
          {/* Vision Statement & Narration (Left) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(18px, 1.1vw, 20px)',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#777777',
                display: 'inline-block',
              }}
            >
              Vision
            </span>

            <h2
              className="font-display"
              style={{
                fontFamily: 'var(--font-canela), serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                lineHeight: 1.18,
                color: '#000000',
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              &ldquo;Designing spaces that elevate the everyday human experience.&rdquo;
            </h2>

            <div
              style={{
                maxWidth: '600px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                color: '#444444',
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

          {/* Vision Image (Right) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(360px, 48vh, 500px)',
              overflow: 'hidden',
              borderRadius: '4px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Image
              src="/philosophy.webp"
              alt="Attiks Architectural Vision"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
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
            MISSION — Reversed 2-Column with Architectural Imagery
            ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="vision-mission-grid mission-reverse"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: 'clamp(36px, 5vw, 80px)',
            paddingBottom: 'clamp(64px, 7vw, 100px)',
            alignItems: 'center',
          }}
        >
          {/* Mission Image (Left on desktop) */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(360px, 48vh, 500px)',
              overflow: 'hidden',
              borderRadius: '4px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.06)',
            }}
          >
            <Image
              src="/value_design.webp"
              alt="Attiks Architectural Mission"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Mission Statement & Narration (Right on desktop) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <span
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(18px, 1.1vw, 20px)',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#777777',
                display: 'inline-block',
              }}
            >
              Mission
            </span>

            <h2
              className="font-display"
              style={{
                fontFamily: 'var(--font-canela), serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
                lineHeight: 1.18,
                color: '#000000',
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              &ldquo;Shaping living standards worldwide through thoughtful design interventions.&rdquo;
            </h2>

            <div
              style={{
                maxWidth: '600px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                color: '#444444',
                fontSize: 'clamp(18px, 1.15vw, 20px)',
                lineHeight: 1.75,
                fontWeight: 350,
              }}
            >
              <p style={{ margin: 0 }}>
                Driven by a deep curiosity and an acute awareness of our surroundings, we translate everyday observations into meaningful architectural solutions for clients across the globe.
              </p>
              <p style={{ margin: 0 }}>
                We work closely with you to understand your vision, transforming your personal aspirations into physical realities—spaces that live comfortably in your memory for years to come.
              </p>
            </div>
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
            CORE VALUES — Minimal Vertical Architectural Index
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
                fontSize: 'clamp(18px, 1.1vw, 20px)',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#777777',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Core Values
            </span>
            <h2
              className="font-display"
              style={{
                fontFamily: 'var(--font-canela), serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
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
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: '-20px' }}
                  onMouseEnter={() => setActiveHoverIndex(idx)}
                  onMouseLeave={() => setActiveHoverIndex(null)}
                  style={{
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    padding: 'clamp(28px, 3.5vw, 44px) 0',
                    cursor: 'pointer',
                    transition: 'background-color 0.35s ease, padding 0.35s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      gap: 'clamp(20px, 4vw, 48px)',
                    }}
                  >
                    {/* Left: Number & Title */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 'clamp(24px, 4vw, 64px)',
                        flex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-primary)',
                          fontSize: 'clamp(18px, 1.1vw, 20px)',
                          fontWeight: 400,
                          color: isHovered ? '#000000' : '#888888',
                          letterSpacing: '0.05em',
                          transition: 'color 0.3s ease',
                          minWidth: '24px',
                        }}
                      >
                        {val.num}
                      </span>

                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            fontFamily: 'var(--font-primary)',
                            fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)',
                            fontWeight: 400,
                            color: isHovered ? '#000000' : '#222222',
                            margin: 0,
                            letterSpacing: '-0.02em',
                            transition: 'color 0.3s ease',
                            textTransform: 'none',
                          }}
                        >
                          {val.title}
                        </h3>

                        {/* Expandable Accordion Description on Hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              style={{ overflow: 'hidden' }}
                              className="desktop-description-container"
                            >
                              <p
                                style={{
                                  fontSize: 'clamp(18px, 1.15vw, 20px)',
                                  lineHeight: 1.75,
                                  color: '#555555',
                                  fontWeight: 350,
                                  maxWidth: '780px',
                                  margin: 0,
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
                              marginTop: '12px',
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
                          size={26}
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
          .vision-mission-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .mission-reverse {
            display: flex !important;
            flex-direction: column-reverse !important;
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
