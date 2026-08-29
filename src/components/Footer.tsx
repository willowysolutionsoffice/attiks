'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative-content" style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#fff', scrollSnapAlign: 'end' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem var(--section-padding)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between' }}>

          {/* Left Column - Subscription */}
          <div style={{ flex: '1 1 350px', maxWidth: '450px' }}>
            <Image
              src="/images/logo-light.png"
              alt="Attiks Architecture Logo"
              width={160}
              height={40}
              style={{ objectFit: 'contain', height: '40px', width: 'auto', marginBottom: '1.5rem' }}
            />
            <p style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '2rem', lineHeight: '1.6' }}>
              Subscribe for priority access to our finest architectural milestones and timeless design insights.
            </p>
            <form style={{ display: 'flex', width: '100%' }} onSubmit={(e) => e.preventDefault()}>
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
                  border: 'none',
                  padding: '14px 16px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  padding: '14px 24px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e0e0e0')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
              >
                Get Notified
              </button>
            </form>
          </div>

          <div className="footer-links-container">
            {/* Pages */}
            <div style={{ minWidth: '100px' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase' }}>Pages</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { name: 'HOME', path: '/' },
                  { name: 'ABOUT', path: '/about' },
                  { name: 'PROJECTS', path: '/projects' },
                  { name: 'MEDIA', path: '/blog' },
                  { name: 'CONTACT', path: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.path} style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div style={{ minWidth: '100px' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase' }}>Socials</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['INSTAGRAM', 'LINKEDIN', 'TWITTER', 'FACEBOOK'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      rel="noopener noreferrer"
                      style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '220px', maxWidth: '300px' }}>
              <div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff', textTransform: 'uppercase' }}>Phone</h3>
                <p style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500 }}>+91 0483 2941308</p>
                <p style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500 }}>+91 8589 022307</p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff', textTransform: 'uppercase' }}>Email</h3>
                <p style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' }}>INFO@ATTIKS.IN</p>
                <p style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' }}>HELLO@ATTIKS.AE</p>
              </div>
              <div>
                <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff', textTransform: 'uppercase' }}>Locations</h3>
                <p style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, lineHeight: '1.6', textTransform: 'uppercase' }}>
                  Calicut | Bangalore | Dubai
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="footer-bottom">
          <p>Attiks Architecture Practice</p>
          <p style={{ color: '#fff' }}>Visioned and Crafted by Willowy</p>
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
