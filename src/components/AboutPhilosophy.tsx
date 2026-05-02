'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPhilosophy() {
  return (
    <section className="section" style={{ height: '100vh', background: '#000', padding: '0 5%', scrollSnapAlign: 'start' }}>
      <div style={{ 
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        gap: '10%'
      }}>
        
        {/* Left Image Box */}
        <div style={{ flex: 1.2, position: 'relative', height: '60%', borderRadius: '4px', overflow: 'hidden' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <Image 
              src="/philosophy.png" 
              alt="Jacob Nolan with clients" 
              fill 
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>

        {/* Right Content */}
        <div style={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8', 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 300
            }}>
              As the founder and face behind the brand, Jacob believes every home should reflect 
              individuality, elegance, and purpose. His approach is deeply personal—built on 
              listening, understanding, and delivering with precision. From sourcing rare properties 
              to shaping unforgettable buying experiences, he brings a curator’s eye and a 
              strategist’s mindset to every detail. It’s this balance of creativity and clarity 
              that has earned him the trust of clients ranging from first-time buyers to seasoned 
              investors across the globe.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
