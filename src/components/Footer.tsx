'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative-content" style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#fff', scrollSnapAlign: 'end' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 5%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between' }}>

          {/* Left Column - Subscription */}
          <div style={{ flex: '1 1 350px', maxWidth: '450px' }}>
            <Image
              src="/images/logo-at.png"
              alt="Attixs Architecture Logo"
              width={160}
              height={50}
              style={{ objectFit: 'contain', height: '40px', width: 'auto', marginBottom: '1.5rem' }}
            />
            <p style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '2rem', lineHeight: '1.6' }}>
              Subscribe for priority access to our finest listings and<br />timeless real estate wisdom.
            </p>
            <div style={{ display: 'flex', width: '100%' }}>
              <input
                type="email"
                placeholder="Your Email Address"
                style={{
                  flex: 1,
                  background: '#1a1a1a',
                  border: 'none',
                  padding: '14px 16px',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button style={{
                background: '#fff',
                color: '#000',
                border: 'none',
                padding: '14px 24px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
              >
                Get Notified
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', flex: '1 1 500px', justifyContent: 'flex-end' }}>
            {/* Pages */}
            <div style={{ minWidth: '100px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>Pages</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['HOME', 'ABOUT', 'PROPERTIES', 'BLOG', 'CONTACT'].map((item) => (
                  <li key={item}>
                    <a href="#" style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#ccc'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div style={{ minWidth: '100px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff' }}>Socials</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['INSTAGRAM', 'LINKEDIN', 'TWITTER', 'FACEBOOK'].map((item) => (
                  <li key={item}>
                    <a href="#" style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#ccc'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: '180px', maxWidth: '220px' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>Phone</h4>
                <p style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500 }}>+1 (201)8455396</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>Email</h4>
                <p style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase' }}>JACOB@ROYAL.COM</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>Address</h4>
                <p style={{ color: '#ccc', fontSize: '0.75rem', fontWeight: 500, lineHeight: '1.6', textTransform: 'uppercase' }}>
                  3831 EDGEWOOD AVENUE, FRESNO,<br />CALIFORNIA, 93721
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1.5rem 5%',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.75rem',
          color: '#888',
          fontWeight: 500
        }}>
          <p>Images : Unsplash, Pexels</p>
          <p style={{ color: '#fff' }}>Visioned and Crafted by Willowy</p>
          <p>© All right reserved</p>
        </div>
      </div>
    </footer>
  );
}
