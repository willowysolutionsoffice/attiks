'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const values = [
  {
    title: 'Integrity in every detail',
    description: 'We lead with honesty, transparency, and trust in everything we do for you.',
    image: '/value_integrity.png'
  },
  {
    title: 'Design with purpose',
    description: 'Every space we represent is intentional, elegant, and made to inspire.',
    image: '/value_design.png'
  },
  {
    title: 'People before property',
    description: 'Our clients come first — always. Relationships shape everything we build.',
    image: '/value_people.png'
  }
];

export default function ValuesSection() {
  return (
    <section style={{ padding: '120px 10%', background: '#000' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.3em', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
            OUR VALUES
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              style={{ position: 'relative', height: '600px', overflow: 'hidden', cursor: 'pointer' }}
            >
              <Image 
                src={value.image}
                alt={value.title}
                fill
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
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', marginBottom: '12px', letterSpacing: '-0.01em' }}>
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
