'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <Image
            src="/images/logo-at.png"
            alt="Attixs Architecture Logo"
            width={160}
            height={50}
            style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
            priority
          />
        </Link>
      </div>
      <div className="nav-links">
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/projects" className="nav-link">Projects</Link>
        <Link href="/blog" className="nav-link">Blog</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
}
