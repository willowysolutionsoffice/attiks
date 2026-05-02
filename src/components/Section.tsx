'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imagePath: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export default function Section({ id, title, subtitle, description, imagePath, align = 'left', children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="section-bg">
        <Image 
          src={imagePath} 
          alt={title} 
          fill 
          priority 
          className="scale-hover"
          sizes="100vw"
        />
        <div className="overlay"></div>
      </div>

      <div className={`section-content ${align === 'center' ? 'text-center mx-auto' : ''}`}
           style={{ textAlign: align === 'center' ? 'center' : 'left' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {subtitle && (
            <p className="subtitle" style={{ fontSize: '0.9rem', letterSpacing: '0.3em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              {subtitle}
            </p>
          )}
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            {title}
          </h2>
          {description && (
            <p style={{ maxWidth: '600px', fontSize: '1.1rem', marginBottom: '2.5rem', marginInline: align === 'center' ? 'auto' : '0' }}>
              {description}
            </p>
          )}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
            <button className="btn-premium">Explore Space</button>
            <button className="btn-outline">View Details</button>
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
