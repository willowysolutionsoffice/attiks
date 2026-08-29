'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;

          setScrolled(currentScrollPos > 50);

          if (currentScrollPos < 15) {
            setVisible(true);
          } else if (currentScrollPos > prevScrollPos && currentScrollPos > 80) {
            setVisible(false); // Scrolling down
          } else if (currentScrollPos < prevScrollPos) {
            setVisible(true); // Scrolling up
          }

          setPrevScrollPos(currentScrollPos);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Prevent body scroll when mobile menu is open
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

  const isSolid = !isHomePage || scrolled || menuOpen;

  return (
    <header>
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          background: isSolid ? '#000000' : 'transparent',
          transform: visible || menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 clamp(24px, 4vw, 56px)',
          boxSizing: 'border-box',
        }}
        aria-label="Main Navigation"
      >
        <div className="nav-logo">
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
            onClick={() => setMenuOpen(false)}
            aria-label="Attiks Architecture Home"
          >
            <Image
              src="/images/logo-light.png"
              alt="Attiks Architecture Logo"
              width={160}
              height={40}
              style={{ objectFit: 'contain', height: 'clamp(28px, 6vw, 36px)', width: 'auto' }}
              priority
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="nav-links mobile-hide" style={{ display: 'flex', gap: 'clamp(24px, 3.5vw, 44px)', alignItems: 'center' }}>
          <Link href="/projects" className="nav-link" style={{ fontSize: '15px', letterSpacing: '0.02em', color: '#ffffff', textDecoration: 'none' }}>
            Projects
          </Link>
          <Link href="/about" className="nav-link" style={{ fontSize: '15px', letterSpacing: '0.02em', color: '#ffffff', textDecoration: 'none' }}>
            About
          </Link>
          <Link href="/blog" className="nav-link" style={{ fontSize: '15px', letterSpacing: '0.02em', color: '#ffffff', textDecoration: 'none' }}>
            Media
          </Link>
          <Link href="/contact" className="nav-link" style={{ fontSize: '15px', letterSpacing: '0.02em', color: '#ffffff', textDecoration: 'none' }}>
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="hamburger-btn desktop-hide"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-links">
          <Link href="/projects" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Projects
          </Link>
          <Link href="/about" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/blog" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Media
          </Link>
          <Link href="/contact" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
