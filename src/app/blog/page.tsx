'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

const articles = [
  {
    category: 'Article',
    title: 'The Rise of Modern Minimalist Homes in Luxury Real Estate',
    image: '/interior.png'
  },
  {
    category: 'Insight',
    title: 'Why Emotional Connections Are the Key to Selling Luxury Homes',
    image: '/story_discussion.png'
  },
  {
    category: 'Article',
    title: 'Inside a $10M Modern Villa Designed for Elevated Living',
    image: '/villa_showcase.png'
  },
  {
    category: 'Article',
    title: 'Staging Secrets Every Seller of Luxury Homes Should Know',
    image: '/architecture.png'
  },
  {
    category: 'Insight',
    title: 'How Location Shapes the True Value of Prestigious Properties',
    image: '/forest.png'
  },
  {
    category: 'Insight',
    title: 'Top Luxury Market Trends to Watch in 2025 and Beyond',
    image: '/penthouse.png'
  }
];

export default function BlogPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <section style={{ padding: '160px 10% 120px', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '4rem' }}
          >
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              Blog
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              REFINED REAL ESTATE<br />INSIGHTS
            </h1>
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', marginBottom: '20px', overflow: 'hidden' }}>
                  <Image 
                    src={article.image}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </div>
                <p style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '8px', fontWeight: 600 }}>
                  {article.category}
                </p>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 500, lineHeight: '1.4', letterSpacing: '-0.01em' }}>
                  {article.title}
                </h3>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
