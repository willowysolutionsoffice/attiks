'use client';

import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import StorySection from '@/components/StorySection';
import ValuesSection from '@/components/ValuesSection';
import JourneyCTASection from '@/components/JourneyCTASection';
import Footer from '@/components/Footer';

export default function AboutClientPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#111111' }}>
      <Navbar />

      <main>
        <section style={{ padding: 'clamp(140px, 11vw, 170px) var(--section-padding) clamp(60px, 6vw, 100px)' }} aria-labelledby="about-hero-heading">
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <PageHeader 
              label="00 / About Us"
              title={<>Crafting architecture<br />with intent</>}
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
                style={{ objectFit: 'cover', borderRadius: '4px' }}
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
              style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'clamp(40px, 6vw, 80px)', marginTop: 'clamp(60px, 7vw, 100px)', alignItems: 'start' }}
            >
              {/* Stats */}
              <div className="stats-container" style={{ display: 'flex', gap: 'clamp(32px, 5vw, 64px)' }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3rem)', fontWeight: 600, marginBottom: '8px', color: '#000000', textTransform: 'none', lineHeight: 1.15, letterSpacing: '-0.02em' }}>50+</h2>
                  <p style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', color: '#666666', textTransform: 'none', fontWeight: 400, margin: 0, lineHeight: 1.5 }}>Masterpieces delivered</p>
                </div>
                <div>
                  <h2 style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3rem)', fontWeight: 600, marginBottom: '8px', color: '#000000', textTransform: 'none', lineHeight: 1.15, letterSpacing: '-0.02em' }}>12+</h2>
                  <p style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', color: '#666666', textTransform: 'none', fontWeight: 400, margin: 0, lineHeight: 1.5 }}>Years of practice</p>
                </div>
                <div>
                  <h2 style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3rem)', fontWeight: 600, marginBottom: '8px', color: '#000000', textTransform: 'none', lineHeight: 1.15, letterSpacing: '-0.02em' }}>98%</h2>
                  <p style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', color: '#666666', textTransform: 'none', fontWeight: 400, margin: 0, lineHeight: 1.5 }}>Client satisfaction</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', lineHeight: 1.75, color: '#333333', textTransform: 'none', fontWeight: 350, margin: 0 }}>
                  At the heart of Attiks is a commitment to excellence, climate responsiveness, and timeless design. We do not just construct buildings — we curate contextual spatial experiences tailored to each client&apos;s vision. With a deep understanding of local materiality and modern structural precision, we bring a collaborative, world-class approach to every commission.
                </p>
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
