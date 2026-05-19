'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ForestRetreat() {
  return (
    <section className="section" style={{ height: '100vh', scrollSnapAlign: 'start', overflow: 'hidden' }}>
      <div className="section-bg" style={{ filter: 'none' }}>
        <Image
          src="/forest.png"
          alt="The Forest Retreat"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="overlay" style={{ background: 'linear-gradient(rgba(10, 30, 10, 0.4), rgba(5, 15, 5, 0.8))' }}></div>
      </div>

      <div className="section-content text-center" style={{ zIndex: 10, textAlign: 'center', margin: '0 auto' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', marginBottom: '0.5rem', fontWeight: 700 }}>
            THE FOREST RETREAT
          </h2>
          <p style={{ fontSize: '1rem', letterSpacing: '0.2em', marginBottom: '3rem', opacity: 0.8, color: '#dcfce7' }}>
            Highlands Road, Aspen, CO
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
              style={{ padding: '15px 40px', borderColor: '#dcfce7', color: '#dcfce7', display: 'inline-block', textDecoration: 'none' }}
            >
              View all
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
