'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const communities = [
  { name: 'Downtown District', image: '/comm_downtown.png' },
  { name: 'Modern Residence', image: '/comm_modern.png' },
  { name: 'Historic City', image: '/comm_historic.png' },
  { name: 'Beach Front District', image: '/comm_beach.png' },
];

export default function CommunityCarousel() {
  // Use multiple sets to ensure the screen is always filled without gaps
  const extendedCommunities = [...communities, ...communities, ...communities, ...communities];

  return (
    <section className="section" style={{ height: '100vh', background: '#000', padding: '5% 0', display: 'flex', flexDirection: 'column', scrollSnapAlign: 'start' }}>
      <div style={{ textAlign: 'center', marginBottom: '5vh' }}>
        <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.3em', fontWeight: 600 }}>OUR COMMUNITIES</h2>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <motion.div
          animate={{
            x: [0, '-25%']
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 80,
              ease: 'linear'
            }
          }}
          style={{
            display: 'flex',
            width: 'max-content',
            gap: '20px',
            padding: '0 10px'
          }}
        >
          {extendedCommunities.map((community, i) => (
            <div
              key={i}
              style={{
                width: '400px',
                height: '60vh',
                position: 'relative',
                flexShrink: 0,
                overflow: 'hidden',
                borderRadius: '4px'
              }}
            >
              <Image
                src={community.image}
                alt={community.name}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '20px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.1em' }}>{community.name}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
