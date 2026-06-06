'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled || menuOpen ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>
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
        
        {/* Desktop Links */}
        <div className="nav-links mobile-hide">
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/projects" className="nav-link">Projects</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="hamburger-btn desktop-hide" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ color: scrolled || menuOpen ? '#000' : '#fff' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <Link href="/about" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/projects" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/blog" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/contact" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </>
  );
}

