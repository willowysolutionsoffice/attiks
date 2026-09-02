'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative-content" style={{ background: '#000000', borderTop: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', scrollSnapAlign: 'end' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem var(--section-padding)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3.5rem', justifyContent: 'space-between' }}>

          {/* Left Column - Subscription */}
          <div style={{ flex: '1 1 350px', maxWidth: '450px' }}>
            <Image
              src="/images/logo-light.png"
              alt="Attiks Architecture Logo"
              width={160}
              height={40}
              style={{ objectFit: 'contain', height: '42px', width: 'auto', marginBottom: '1.5rem' }}
            />
            <p style={{ fontSize: 'clamp(18px, 1.1vw, 19px)', color: '#cccccc', marginBottom: '2rem', lineHeight: '1.6', fontWeight: 350 }}>
              Subscribe for priority access to our finest architectural milestones and timeless design insights.
            </p>
            <form style={{ display: 'flex', width: '100%', maxWidth: '420px' }} onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="footer-email-input" className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                Email Address
              </label>
              <input
                id="footer-email-input"
                type="email"
                placeholder="Your Email Address"
                autoComplete="email"
                style={{
                  flex: 1,
                  background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRight: 'none',
                  padding: '14px 18px',
                  color: '#ffffff',
                  fontSize: 'clamp(18px, 1.1vw, 19px)',
                  outline: 'none',
                  borderRadius: '4px 0 0 4px',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  padding: '14px 24px',
                  fontSize: 'clamp(18px, 1.1vw, 19px)',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  borderRadius: '0 4px 4px 0',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e0e0e0')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
              >
                Get Notified
              </button>
            </form>
          </div>

          <div className="footer-links-container">
            {/* Pages */}
            <div style={{ minWidth: '120px' }}>
              <h3 style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', fontWeight: 400, marginBottom: '1.5rem', color: '#ffffff', textTransform: 'none' }}>Pages</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'Home', path: '/' },
                  { name: 'About', path: '/about' },
                  { name: 'Projects', path: '/projects' },
                  { name: 'Media', path: '/blog' },
                  { name: 'Contact', path: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.path} style={{ color: '#cccccc', fontSize: 'clamp(18px, 1.1vw, 19px)', fontWeight: 400, textDecoration: 'none', transition: 'color 0.3s ease', textTransform: 'none' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#cccccc')}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div style={{ minWidth: '120px' }}>
              <h3 style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', fontWeight: 400, marginBottom: '1.5rem', color: '#ffffff', textTransform: 'none' }}>Socials</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Instagram', 'LinkedIn', 'Twitter', 'Facebook'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      style={{ color: '#cccccc', fontSize: 'clamp(18px, 1.1vw, 19px)', fontWeight: 400, textDecoration: 'none', transition: 'color 0.3s ease', textTransform: 'none' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#cccccc')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '220px', maxWidth: '320px' }}>
              <div>
                <h3 style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', fontWeight: 400, marginBottom: '0.5rem', color: '#ffffff', textTransform: 'none' }}>Phone</h3>
                <p style={{ color: '#cccccc', fontSize: 'clamp(18px, 1.1vw, 19px)', fontWeight: 400, margin: '2px 0' }}>+91 0483 2941308</p>
                <p style={{ color: '#cccccc', fontSize: 'clamp(18px, 1.1vw, 19px)', fontWeight: 400, margin: '2px 0' }}>+91 8589 022307</p>
              </div>
              <div>
                <h3 style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', fontWeight: 400, marginBottom: '0.5rem', color: '#ffffff', textTransform: 'none' }}>Email</h3>
                <p style={{ color: '#cccccc', fontSize: 'clamp(18px, 1.1vw, 19px)', fontWeight: 400, margin: '2px 0' }}>info@attiks.in</p>
                <p style={{ color: '#cccccc', fontSize: 'clamp(18px, 1.1vw, 19px)', fontWeight: 400, margin: '2px 0' }}>hello@attiks.ae</p>
              </div>
              <div>
                <h3 style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', fontWeight: 400, marginBottom: '0.5rem', color: '#ffffff', textTransform: 'none' }}>Locations</h3>
                <p style={{ color: '#cccccc', fontSize: 'clamp(18px, 1.1vw, 19px)', fontWeight: 400, lineHeight: '1.6', margin: '2px 0' }}>
                  Calicut | Bangalore | Dubai
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <div className="footer-bottom">
          <p style={{ fontSize: 'clamp(18px, 1.1vw, 19px)', margin: 0 }}>Attiks Architecture Practice</p>
          <p style={{ color: '#ffffff', fontSize: 'clamp(18px, 1.1vw, 19px)', margin: 0 }}>Visioned and Crafted by Willowy</p>
          <p style={{ fontSize: 'clamp(18px, 1.1vw, 19px)', margin: 0 }}>&copy; {currentYear} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
