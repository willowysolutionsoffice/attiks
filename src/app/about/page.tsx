'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import StorySection from '@/components/StorySection';
import ValuesSection from '@/components/ValuesSection';
import TeamSection from '@/components/TeamSection';
import JourneyCTASection from '@/components/JourneyCTASection';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      <main>
        <section style={{ padding: '160px var(--section-padding) 80px' }} aria-labelledby="about-hero-heading">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <PageHeader 
              label="About us"
              title={<>CRAFTING ARCHITECTURE<br />WITH INTENT</>}
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="about-hero-image-container"
            >
              <Image 
                src="/team_photo.webp"
                alt="Attiks Architecture Team and Studio"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </motion.div>

            {/* Stats and Description Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid-responsive-2"
              style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '100px', marginTop: '100px', alignItems: 'start' }}
            >
              {/* Stats */}
              <div className="stats-container" style={{ display: 'flex', gap: '60px' }}>
                <div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', color: '#fff', textTransform: 'none' }}>50+</h2>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'none', fontWeight: 400 }}>Masterpieces Delivered</p>
                </div>
                <div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', color: '#fff', textTransform: 'none' }}>12+</h2>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'none', fontWeight: 400 }}>Years of Practice</p>
                </div>
                <div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', color: '#fff', textTransform: 'none' }}>98%</h2>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', textTransform: 'none', fontWeight: 400 }}>Client Satisfaction</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', textTransform: 'none', fontWeight: 400 }}>
                  At the heart of Attiks is a commitment to excellence, climate responsiveness, and timeless design. We do not just construct buildings — we curate contextual spatial experiences tailored to each client&apos;s vision. With a deep understanding of local materiality and modern structural precision, we bring a collaborative, world-class approach to every commission.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <StorySection />
        <ValuesSection />
        <TeamSection />
        <JourneyCTASection />
      </main>

      <Footer />
    </div>
  );
}
