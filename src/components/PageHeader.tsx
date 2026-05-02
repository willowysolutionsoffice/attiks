'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  label: string;
  title: string | React.ReactNode;
}

export default function PageHeader({ label, title }: PageHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ marginBottom: '2rem', paddingLeft: '0.5%' }}
    >
      <p style={{
        fontSize: '0.75rem',
        fontWeight: 500,
        color: '#fff',
        marginBottom: '1rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        opacity: 0.8
      }}>
        {label}
      </p>
      <h1 style={{
        fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
        fontWeight: 500,
        color: '#fff',
        lineHeight: '1.0',
        letterSpacing: '-0.03em',
        textTransform: 'uppercase'
      }}>
        {title}
      </h1>
    </motion.div>
  );
}
