'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Ethan Rhodes',
    role: 'Co-founder',
    image: '/images/image1.png'
  },
  {
    name: 'Lia Carter',
    role: 'Lead realtor',
    image: '/images/image2.png'
  },
  {
    name: 'Noah West',
    role: 'Investment Specialist',
    image: '/images/image3.png'
  },
  {
    name: 'Ava Sinclair',
    role: 'Client Relations',
    image: '/images/image4.png'
  }
];

export default function TeamSection() {
  return (
    <section style={{ background: '#000', padding: '6rem var(--section-padding)', color: '#fff' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '3rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}
        >
          OUR TEAM
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
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
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1.15', marginBottom: '1.25rem', overflow: 'hidden' }}>
                <Image 
                  src={member.image}
                  alt={member.name}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onError={(e) => {
                    // Fallback to founder.png if image is missing
                    e.currentTarget.src = '/founder.png';
                  }}
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '0.25rem', fontWeight: 600 }}>
                {member.role}
              </p>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 600, letterSpacing: '-0.01em' }}>
                {member.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
