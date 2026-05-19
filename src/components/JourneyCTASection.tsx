'use client';

import { motion } from 'framer-motion';

export default function JourneyCTASection() {
  return (
    <section className="section" style={{ background: '#000', padding: '0 var(--section-padding) 6rem var(--section-padding)', display: 'flex', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          height: '75vh',
          minHeight: '550px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        {/* Background Video */}
        {/* We use a placeholder image as a poster, and point source to a dummy mp4. 
            Once you have the 5-second video, you can place it in the public folder 
            and update the src attribute below. */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/story_discussion.png"
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
        >
          <source src="/luxury_bg_video.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay for better readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1
        }}></div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 500, marginBottom: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
          >
            Start the Projct
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ fontSize: '4rem', color: '#fff', fontWeight: 600, lineHeight: '1.1', marginBottom: '3rem', maxWidth: '900px', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            BEGIN YOUR JOURNEY TO<br />TIMELESS LUXURY.
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              background: '#fff',
              color: '#000',
              border: 'none',
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#fff';
            }}
          >
            Experience luxury
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
