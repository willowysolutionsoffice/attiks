'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about-us" className="section" style={{ height: '100vh', background: '#000', padding: '0 var(--section-padding)', scrollSnapAlign: 'start' }}>
      <div style={{ display: 'flex', width: '100%', height: '100%' }}>

        {/* Left Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 2
        }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>Our Story</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 'bold', marginBottom: '1.5rem', textTransform: 'none' }}>
              MEET JACOB NOLAN
            </h2>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.8',
              maxWidth: '500px',
              marginBottom: '2.5rem',
              color: 'rgba(255,255,255,0.8)'
            }}>
              With a passion for architecture, design, and refined living, Jacob Nolan envisioned a
              real estate experience rooted in trust, taste, and timeless value. Every property
              reflects a commitment to excellence, crafted to exceed the expectations of today&apos;s
              luxury buyer.
            </p>
            <button className="btn-premium" style={{ borderRadius: '2px', padding: '12px 32px' }}>
              About us
            </button>
          </motion.div>
        </div>

        {/* Right Image */}
        <div style={{ flex: 1, position: 'relative', padding: '120px 0 120px 60px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            viewport={{ once: true }}
            style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}
          >
            <Image
              src="/founder.png"
              alt="Jacob Nolan"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
              priority
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
