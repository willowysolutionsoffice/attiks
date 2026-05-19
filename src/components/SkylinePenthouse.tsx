'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function SkylinePenthouse() {
  return (
    <section className="section-sticky" style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="section-bg" style={{ width: '100%', left: '0' }}>
        <Image
          src="/penthouse.png"
          alt="Skyline Penthouse"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="overlay" style={{ background: 'linear-gradient(rgba(0, 10, 30, 0.5), rgba(0, 5, 10, 0.8))', opacity: 0.5 }}></div>
      </div>

      <div className="section-content text-center" style={{ zIndex: 10, textAlign: 'center', margin: '0 auto' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '0.5rem', fontWeight: 700 }}>
            THE SKYLINE PENTHOUSE
          </h2>
          <p style={{ fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '3rem', opacity: 0.7, color: '#a5b4fc' }}>
            500 Park Avenue, New York, NY
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
              style={{ padding: '15px 40px', borderColor: '#a5b4fc', color: '#a5b4fc', display: 'inline-block', textDecoration: 'none' }}
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
