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
      style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}
    >
      <p style={{
        fontFamily: 'var(--font-primary)',
        fontSize: 'clamp(15px, 1vw, 17px)',
        fontWeight: 600,
        color: '#777777',
        marginBottom: '16px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
      }}>
        {label}
      </p>
      <h1 style={{
        fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        fontFamily: 'var(--font-canela), serif',
        color: '#000000',
        lineHeight: 1.15,
        letterSpacing: '-0.025em',
        textTransform: 'none',
        margin: 0,
      }}>
        {title}
      </h1>
    </motion.div>
  );
}
