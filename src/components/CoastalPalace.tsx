'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CoastalPalace() {
  return (
    <section className="section-sticky" style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        className="section-bg"
        style={{
          height: '100%',
          top: '0'
        }}
      >
        <Image
          src="/coastal_palace.png"
          alt="The Coastal Palace"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        {/* Warmer overlay */}
        <div className="overlay" style={{ background: 'linear-gradient(rgba(40, 20, 0, 0.4), rgba(20, 10, 0, 0.7))', opacity: 0.5 }}></div>
      </div>

      <div className="section-content text-center" style={{ zIndex: 10, textAlign: 'center', margin: '0 auto' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', marginBottom: '0.5rem', fontWeight: 700, color: '#fff' }}>
            THE COASTAL PALACE
          </h2>
          <p style={{ fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '3rem', opacity: 0.8, color: '#f8d5b5' }}>
            88 Ocean Drive, Malibu, CA
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link
              href="/about"
              className="btn-premium"
              style={{ padding: '15px 40px', background: '#fff', color: '#000', display: 'inline-block', textDecoration: 'none' }}
            >
              Learn more
            </Link>
            <Link
              href="/projects"
              className="btn-outline"
              style={{ padding: '15px 40px', borderColor: '#f8d5b5', color: '#f8d5b5', display: 'inline-block', textDecoration: 'none' }}
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
