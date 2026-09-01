'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

const stories = [
  {
    title: 'Our Story',
    headline: 'One listing, big dreams',
    description: 'Every great story begins somewhere. Ours began with a single property, a phone, and an unwavering commitment to doing things right. No shortcuts—just hard work, honest conversations, and walking clients through every detail like they were family.',
    image: '/story_discussion.webp'
  },
  {
    title: 'Our Story',
    headline: 'People first, always',
    description: 'We never chased numbers—we built relationships. Clients came back, referred friends, and trusted us again and again. It wasn\'t about closing deals; it was about opening doors to something bigger: connection, trust, and lifestyle.',
    image: '/story_handshake.webp'
  },
  {
    title: 'Our Story',
    headline: 'Trusted by the best',
    description: 'Today, we\'re known for delivering more than homes—we deliver experiences. Backed by a seasoned team and a sharp eye for detail, we help clients find spaces that reflect who they are and how they want to live.',
    image: '/team_photo.webp'
  }
];

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveIndex(0);
    } else if (latest < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  return (
    <>
      <section ref={containerRef} className="mobile-hide" style={{ height: '300vh', background: '#ffffff', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', display: 'flex', alignItems: 'center', padding: '0 var(--section-padding)', boxSizing: 'border-box', overflow: 'hidden' }}>
          <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: 'clamp(40px, 6vw, 100px)', alignItems: 'center' }}>
            
            {/* Left Side: Text & Progress */}
            <div style={{ minHeight: '380px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              {/* Story Step Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
                {stories.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '3px',
                      width: activeIndex === i ? '36px' : '16px',
                      background: activeIndex === i ? '#000000' : 'rgba(0,0,0,0.15)',
                      borderRadius: '2px',
                      transition: 'all 0.4s ease',
                    }}
                  />
                ))}
                <span style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(15px, 1vw, 17px)', color: '#777777', marginLeft: '12px', fontWeight: 600 }}>
                  0{activeIndex + 1} / 0{stories.length}
                </span>
              </div>

              {stories.map((story, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ 
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 16,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ 
                    position: 'absolute', 
                    top: '64px', 
                    left: 0, 
                    width: '100%',
                    pointerEvents: activeIndex === i ? 'auto' : 'none'
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(15px, 1vw, 17px)', fontWeight: 600, letterSpacing: '0.12em', color: '#777777', marginBottom: '16px', textTransform: 'uppercase' }}>
                    {story.title}
                  </p>
                  <h2 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)', fontWeight: 300, fontFamily: 'var(--font-canela), serif', fontStyle: 'italic', color: '#000000', marginBottom: '24px', lineHeight: 1.15, letterSpacing: '-0.025em', textTransform: 'none', margin: '0 0 24px 0' }}>
                    {story.headline}
                  </h2>
                  <p style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', lineHeight: 1.75, color: '#333333', maxWidth: '560px', margin: 0, fontWeight: 350 }}>
                    {story.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Side: Image Container */}
            <div style={{ position: 'relative', height: 'clamp(420px, 56vh, 580px)', width: '100%', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
               {stories.map((story, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: activeIndex === i ? 1 : 0,
                      scale: activeIndex === i ? 1 : 1.05,
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  >
                    <Image 
                      src={story.image}
                      alt={story.headline}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                      priority={i === 0}
                    />
                  </motion.div>
               ))}
            </div>

          </div>
        </div>
      </section>

      {/* Mobile Stacked Layout (Visible on mobile only) */}
      <div className="desktop-hide" style={{ background: '#ffffff', padding: 'clamp(60px, 8vw, 100px) var(--section-padding)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', maxWidth: '1400px', margin: '0 auto' }}>
          {stories.map((story, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(15px, 1vw, 17px)', fontWeight: 600, letterSpacing: '0.12em', color: '#777777', marginBottom: '12px', textTransform: 'uppercase' }}>
                  {story.title} &bull; 0{i + 1}
                </p>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 300, fontFamily: 'var(--font-canela), serif', fontStyle: 'italic', color: '#000000', marginBottom: '16px', lineHeight: 1.15, letterSpacing: '-0.02em', textTransform: 'none', margin: '0 0 16px 0' }}>
                  {story.headline}
                </h2>
                <p style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', lineHeight: 1.75, color: '#333333', margin: 0, fontWeight: 350 }}>
                  {story.description}
                </p>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: '4px' }}>
                <Image 
                  src={story.image}
                  alt={story.headline}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
