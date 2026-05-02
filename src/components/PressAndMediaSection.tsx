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
  return (
    <section className="section" style={{ background: '#000', padding: '6rem 10%' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ fontSize: '2rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}
          >
            PRESS & MEDIA
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ 
              background: 'transparent', 
              color: '#fff', 
              border: '1px solid rgba(255,255,255,0.3)', 
              padding: '10px 24px', 
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#fff';
            }}
          >
            View all
          </motion.button>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
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
  );
}
