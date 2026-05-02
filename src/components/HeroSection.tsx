'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="section-sticky" style={{ height: '100vh' }}>
      {/* Background */}
      <div className="section-bg" style={{ overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%' }}>
          <Image
            src="/living_room.png"
            alt="Luxury Interior"
            fill
            priority
            quality={100}
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        {/* Dark Gradient Overlay (Left darker, right lighter) */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
            zIndex: 2
          }}
        />
      </div>

      <div className="section-content" style={{ zIndex: 10 }}>
        <div>
          <p style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.4em', 
            marginBottom: '1rem',
            opacity: 0.8
          }}>
            Elite luxury
          </p>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
            fontWeight: '800', 
            lineHeight: '1.0',
            marginBottom: '2.5rem',
            maxWidth: '800px'
          }}>
            LIVE WHERE <br /> LUXURY RESIDES
          </h1>
          <button className="btn-premium" style={{ padding: '18px 48px', fontSize: '1rem' }}>
            Schedule a tour
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <div style={{
          width: '24px',
          height: '40px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '12px',
          position: 'relative'
        }}>
          <div
            style={{
              width: '4px',
              height: '8px',
              background: 'white',
              borderRadius: '2px',
              position: 'absolute',
              top: '8px',
              left: '50%',
              marginLeft: '-2px'
            }}
          />
        </div>
        <span style={{ fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Scroll</span>
      </div>

      {/* Thumbnail Previews */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '5%',
        zIndex: 10,
        display: 'flex',
        gap: '15px'
      }}>
        {['/hero.png', '/interior.png', '/architecture.png'].map((src, i) => (
          <div
            key={i}
            className="scale-hover"
            style={{
              width: '80px',
              height: '80px',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
          >
            <Image src={src} alt="Thumbnail" fill style={{ objectFit: 'cover', opacity: 0.6 }} />
          </div>
        ))}
      </div>
    </section>
  );
}
