'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PropertyShowcase() {
  return (
    <section className="section-sticky" style={{ height: '100vh' }}>
      <div className="section-bg" style={{ overflow: 'hidden' }}>
        <Image
          src="/villa_showcase.png"
          alt="The Urban Villa"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="overlay" style={{ background: 'rgba(0,0,0,0.5)', opacity: 0.5 }}></div>
      </div>

      <div
        className="section-content text-center"
        style={{
          zIndex: 10,
          textAlign: 'center',
          margin: '0 auto',
        }}
      >
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '0.5rem', fontWeight: 700 }}>
            THE URBAN VILLA
          </h2>
          <p style={{ fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '3rem', opacity: 0.7 }}>
            123 Main Street, Suite 200, Austin, TX 78701
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link
              href="/about"
              className="btn-premium"
              style={{ padding: '15px 40px', display: 'inline-block', textDecoration: 'none' }}
            >
              Learn more
            </Link>
            <Link
              href="/projects"
              className="btn-outline"
              style={{ padding: '15px 40px', display: 'inline-block', textDecoration: 'none' }}
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
