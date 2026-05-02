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
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <Navbar />

      <section style={{ padding: '160px 2.5% 80px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <PageHeader 
            label="About us"
            title={<>CRAFTING LUXURY<br />WITH INTENT</>}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ position: 'relative', width: '100%', height: '650px', overflow: 'hidden' }}
          >
            <Image 
              src="/team_photo.png"
              alt="Attixs Architecture Team"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </motion.div>

          {/* Stats and Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '100px', marginTop: '100px', alignItems: 'start' }}
          >
            {/* Stats */}
            <div style={{ display: 'flex', gap: '60px' }}>
              <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>$250M+</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textTransform: 'none', fontWeight: 400 }}>Luxury Property Sales</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>12+</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textTransform: 'none', fontWeight: 400 }}>Years of Experience</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>98%</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', textTransform: 'none', fontWeight: 400 }}>Client Satisfaction</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.85)', textTransform: 'none', fontWeight: 400 }}>
                At the heart of our brand is a commitment to excellence, discretion, and timeless design. We don't just sell properties — we curate experiences tailored to each client's vision of luxury living. With a deep understanding of high-end markets and a passion for architectural beauty, we bring a personalized, world-class approach to every transaction.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <StorySection />

      <ValuesSection />

      <TeamSection />

      <JourneyCTASection />

      <Footer />
    </main>
  );
}
