'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const values = [
  {
    title: 'Integrity in every detail',
    description: 'We lead with honesty, transparency, and trust in everything we do for you.',
    image: '/value_integrity.webp'
  },
  {
    title: 'Design with purpose',
    description: 'Every space we represent is intentional, elegant, and made to inspire.',
    image: '/value_design.webp'
  },
  {
    title: 'People before property',
    description: 'Our clients come first — always. Relationships shape everything we build.',
    image: '/value_people.webp'
  }
];

export default function ValuesSection() {
  return (
    <section style={{ padding: '120px var(--section-padding)', background: '#000' }} aria-labelledby="our-values-heading">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px' }}
        >
          <h2 id="our-values-heading" style={{ fontSize: '1.2rem', letterSpacing: '0.3em', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
            OUR VALUES
          </h2>
        </motion.div>

        <div className="grid-responsive-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="value-card"
            >
              <Image 
                src={value.image}
                alt={`${value.title} - Value`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="scale-hover"
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 30%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '40px 30px'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '12px', letterSpacing: '-0.01em', textTransform: 'none' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.6)', textTransform: 'none', maxWidth: '300px' }}>
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
