'use client';

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
    image: '/living_room.png'
  },
  {
    category: 'Article',
    title: 'Inside a $10M Modern Villa Designed for Elevated Living',
    image: '/villa_showcase.png'
  }
];

export default function PressAndMediaSection() {
  const extendedArticles = [...articles, ...articles, ...articles, ...articles];

  return (
    <section className="section" style={{ background: '#000', padding: '6rem var(--section-padding)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ fontSize: '1.2rem', letterSpacing: '0.3em', fontWeight: 600, color: '#fff' }}
          >
            NEWS & BLOGS
          </motion.h2>
        </div>

        {/* Grid */}
        {/* Sliding Carousel */}
        <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <motion.div
            animate={{
              x: [0, '-25%']
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 60,
                ease: 'linear'
              }
            }}
            style={{
              display: 'flex',
              width: 'max-content',
              gap: '30px',
              padding: '0 15px'
            }}
          >
            {extendedArticles.map((article, index) => (
              <div
                key={index}
                style={{ cursor: 'pointer', width: '400px', flexShrink: 0 }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', marginBottom: '20px', overflow: 'hidden', borderRadius: '4px' }}>
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
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
