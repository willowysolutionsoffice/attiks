'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Ethan Rhodes',
    role: 'Co-founder & Principal Architect',
    image: '/images/image1.webp'
  },
  {
    name: 'Lia Carter',
    role: 'Lead Spatial Designer',
    image: '/images/image2.webp'
  },
  {
    name: 'Noah West',
    role: 'Structural Consultant',
    image: '/images/image3.webp'
  },
  {
    name: 'Ava Sinclair',
    role: 'Client Relations & Curation',
    image: '/images/image4.webp'
  }
];

export default function TeamSection() {
  return (
    <section style={{ background: '#ffffff', padding: 'clamp(80px, 8vw, 140px) var(--section-padding)', color: '#111111' }} aria-labelledby="our-team-heading">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <p style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 'clamp(15px, 1vw, 17px)',
          letterSpacing: '0.12em',
          color: '#777777',
          marginBottom: '16px',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          04 / Studio Team
        </p>
        <motion.h2 
          id="our-team-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
            fontWeight: 300,
            fontFamily: 'var(--font-canela), serif',
            fontStyle: 'italic',
            color: '#000000',
            marginBottom: 'clamp(40px, 5vw, 64px)',
            letterSpacing: '-0.025em',
            textTransform: 'none',
            lineHeight: 1.15,
            margin: '0 0 clamp(40px, 5vw, 64px) 0',
          }}
        >
          The minds and hands behind the craft.
        </motion.h2>

        <div className="grid-responsive-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(20px, 2.5vw, 32px)' }}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ cursor: 'pointer' }}
              className="team-card-wrapper"
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1.15', marginBottom: '1.25rem', overflow: 'hidden', borderRadius: '4px' }}>
                <Image 
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="team-member-img"
                />
              </div>
              <h3 style={{ fontSize: 'clamp(1.3rem, 1.6vw, 1.6rem)', color: '#000000', fontWeight: 600, letterSpacing: '-0.01em', textTransform: 'none', marginBottom: '6px', lineHeight: 1.25 }}>
                {member.name}
              </h3>
              <p style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', color: '#666666', fontWeight: 400, textTransform: 'none', margin: 0, lineHeight: 1.5 }}>
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .team-card-wrapper:hover :global(.team-member-img) {
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
