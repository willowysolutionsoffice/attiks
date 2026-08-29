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
    <section style={{ background: '#000', padding: '6rem var(--section-padding)', color: '#fff' }} aria-labelledby="our-team-heading">
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <motion.h2 
          id="our-team-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '3rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}
        >
          OUR TEAM
        </motion.h2>

        <div className="grid-responsive-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
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
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1.15', marginBottom: '1.25rem', overflow: 'hidden' }}>
                <Image 
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="team-member-img"
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '0.25rem', fontWeight: 600, textTransform: 'none' }}>
                {member.role}
              </p>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 600, letterSpacing: '-0.01em', textTransform: 'none' }}>
                {member.name}
              </h3>
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
