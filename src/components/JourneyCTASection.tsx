'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function JourneyCTASection() {
  return (
    <section className="section journey-cta-section" style={{ background: '#ffffff', padding: '0 var(--section-padding) clamp(80px, 8vw, 140px) var(--section-padding)', display: 'flex', justifyContent: 'center' }} aria-labelledby="journey-cta-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          height: '75vh',
          minHeight: '480px',
          overflow: 'hidden',
          borderRadius: '0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/story_discussion.webp"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.6
          }}
          aria-hidden="true"
        >
          <source src="/85348-590746467_medium.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for better readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)',
          zIndex: 1
        }} aria-hidden="true"></div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'clamp(15px, 1vw, 17px)',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 400,
              letterSpacing: '0.12em',
              marginBottom: '16px',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              textTransform: 'uppercase'
            }}
          >
            Start The Project
          </motion.p>

          <motion.h2
            id="journey-cta-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              color: '#ffffff',
              fontWeight: 300,
              fontFamily: 'var(--font-canela), serif',
              lineHeight: 1.15,
              marginBottom: '3rem',
              maxWidth: '920px',
              letterSpacing: '-0.025em',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              textTransform: 'none'
            }}
          >
            Begin your journey to{' '}<br />timeless architecture.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              style={{
                background: '#ffffff',
                color: '#000000',
                border: 'none',
                padding: '16px 36px',
                fontSize: 'clamp(18px, 1.15vw, 20px)',
                fontWeight: 400,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                textDecoration: 'none',
                borderRadius: '4px',
                textTransform: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.background = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#ffffff';
              }}
            >
              Contact us
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
