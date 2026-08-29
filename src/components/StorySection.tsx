'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

const stories = [
  {
    title: 'Our story',
    headline: 'ONE LISTING, BIG DREAMS',
    description: 'Every great story begins somewhere. Ours began with a single property, a phone, and an unwavering commitment to doing things right. No shortcuts—just hard work, honest conversations, and walking clients through every detail like they were family.',
    image: '/story_discussion.webp'
  },
  {
    title: 'Our story',
    headline: 'PEOPLE FIRST, ALWAYS',
    description: 'We never chased numbers—we built relationships. Clients came back, referred friends, and trusted us again and again. It wasn\'t about closing deals; it was about opening doors to something bigger: connection, trust, and lifestyle. Thats what give us Energy to do more.',
    image: '/story_handshake.webp'
  },
  {
    title: 'Our story',
    headline: 'TRUSTED BY THE BEST',
    description: 'Today, we\'re known for delivering more than homes—we deliver experiences. Backed by a seasoned team and a sharp eye for detail, we help clients find spaces that reflect who they are and how they want to live. That\'s the kind of story.',
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
      <section ref={containerRef} className="mobile-hide" style={{ height: '300vh', background: '#000', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', display: 'flex', alignItems: 'center', padding: '0 clamp(24px, 4vw, 56px)', boxSizing: 'border-box', overflow: 'hidden' }}>
          <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: 'clamp(40px, 6vw, 100px)', alignItems: 'center' }}>
            
            {/* Left Side: Text & Progress */}
            <div style={{ minHeight: '380px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              {/* Story Step Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                {stories.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '3px',
                      width: activeIndex === i ? '32px' : '16px',
                      background: activeIndex === i ? '#ffffff' : 'rgba(255,255,255,0.25)',
                      borderRadius: '2px',
                      transition: 'all 0.4s ease',
                    }}
                  />
                ))}
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginLeft: '8px', fontWeight: 600 }}>
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
                    top: '60px', 
                    left: 0, 
                    width: '100%',
                    pointerEvents: activeIndex === i ? 'auto' : 'none'
                  }}
                >
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.7)', marginBottom: '1.2rem', textTransform: 'uppercase' }}>
                    {story.title}
                  </p>
                  <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', fontWeight: 800, color: '#fff', marginBottom: '1.8rem', lineHeight: 1.12, letterSpacing: '-0.02em' }}>
                    {story.headline}
                  </h2>
                  <p style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', lineHeight: '1.7', color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: 0 }}>
                    {story.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Side: Image Container */}
            <div style={{ position: 'relative', height: 'clamp(420px, 56vh, 580px)', width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
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
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)' }}></div>
                  </motion.div>
               ))}
            </div>

          </div>
        </div>
      </section>

      {/* Mobile Stacked Layout (Visible on mobile only) */}
      <div className="desktop-hide" style={{ background: '#000', padding: '80px clamp(24px, 4vw, 56px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {stories.map((story, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                  {story.title} &bull; 0{i + 1}
                </p>
                <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1.25rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                  {story.headline}
                </h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                  {story.description}
                </p>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: '8px' }}>
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
