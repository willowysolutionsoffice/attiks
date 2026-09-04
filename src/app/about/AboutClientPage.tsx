'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import StorySection from '@/components/StorySection';
import ValuesSection from '@/components/ValuesSection';
import JourneyCTASection from '@/components/JourneyCTASection';
import Footer from '@/components/Footer';

export default function AboutClientPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#111111' }}>
      <Navbar />

      <main>
        <section
          style={{
            padding: isMobile
              ? 'clamp(100px, 12vh, 140px) 20px 40px'
              : 'clamp(120px, 11vw, 160px) clamp(24px, 5vw, 64px) clamp(50px, 6vw, 90px)',
            boxSizing: 'border-box',
          }}
          aria-labelledby="about-hero-heading"
        >
          <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
            <PageHeader 
              label="About Us"
              title={<>Crafting architecture{' '}<br />with intent</>}
            />

            {/* Studio Main Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '280px' : 'clamp(380px, 48vh, 600px)',
                borderRadius: '0px',
                overflow: 'hidden',
                marginTop: isMobile ? '24px' : 'clamp(28px, 3.5vw, 44px)',
                backgroundColor: '#151515',
              }}
            >
              <Image 
                src="/team_photo.webp"
                alt="Attiks Architecture Team and Studio"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover', borderRadius: '0px' }}
                priority
              />
            </motion.div>

            {/* Stats and Description Section (Responsive Stack on Mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                gap: isMobile ? '32px' : 'clamp(40px, 6vw, 80px)',
                marginTop: isMobile ? '32px' : 'clamp(48px, 6vw, 80px)',
                alignItems: isMobile ? 'stretch' : 'flex-start',
              }}
            >
              {/* Studio Description (100% width on mobile) */}
              <div style={{ flex: isMobile ? '1 1 100%' : '1 1 50%', order: isMobile ? 1 : 2 }}>
                <p
                  style={{
                    fontSize: isMobile ? '17px' : 'clamp(17px, 1.1vw, 19px)',
                    lineHeight: isMobile ? 1.65 : 1.75,
                    color: '#333333',
                    textTransform: 'none',
                    fontWeight: 350,
                    margin: 0,
                  }}
                >
                  At the heart of Attiks is a commitment to excellence, climate responsiveness, and timeless design. We do not just construct buildings — we curate contextual spatial experiences tailored to each client&apos;s vision. With a deep understanding of local materiality and modern structural precision, we bring a collaborative, world-class approach to every commission.
                </p>
              </div>

              {/* 3 Metric Stats (Horizontal 3-Column on mobile) */}
              <div
                style={{
                  flex: isMobile ? '1 1 100%' : '1 1 45%',
                  order: isMobile ? 2 : 1,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: isMobile ? '14px' : 'clamp(24px, 3.5vw, 48px)',
                  paddingTop: isMobile ? '8px' : '0',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: isMobile ? '1.85rem' : 'clamp(2.2rem, 3vw, 2.9rem)',
                      fontWeight: 400,
                      marginBottom: '4px',
                      color: '#000000',
                      textTransform: 'none',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    50+
                  </h2>
                  <p style={{ fontSize: isMobile ? '13.5px' : 'clamp(14px, 0.95vw, 16px)', color: '#666666', textTransform: 'none', fontWeight: 400, margin: 0, lineHeight: 1.35 }}>
                    Masterpieces delivered
                  </p>
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: isMobile ? '1.85rem' : 'clamp(2.2rem, 3vw, 2.9rem)',
                      fontWeight: 400,
                      marginBottom: '4px',
                      color: '#000000',
                      textTransform: 'none',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    12+
                  </h2>
                  <p style={{ fontSize: isMobile ? '13.5px' : 'clamp(14px, 0.95vw, 16px)', color: '#666666', textTransform: 'none', fontWeight: 400, margin: 0, lineHeight: 1.35 }}>
                    Years of practice
                  </p>
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: isMobile ? '1.85rem' : 'clamp(2.2rem, 3vw, 2.9rem)',
                      fontWeight: 400,
                      marginBottom: '4px',
                      color: '#000000',
                      textTransform: 'none',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    98%
                  </h2>
                  <p style={{ fontSize: isMobile ? '13.5px' : 'clamp(14px, 0.95vw, 16px)', color: '#666666', textTransform: 'none', fontWeight: 400, margin: 0, lineHeight: 1.35 }}>
                    Client satisfaction
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <StorySection />
        <ValuesSection />
        <JourneyCTASection />
      </main>

      <Footer />
    </div>
  );
}
