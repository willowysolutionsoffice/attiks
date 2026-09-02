'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
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
    if (latest < 0.35) {
      setActiveIndex(0);
    } else if (latest < 0.7) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  const activeStory = stories[activeIndex];

  return (
    <>
      {/* Desktop Sticky Scroll Section (Reduced scroll buffering for smooth flow) */}
      <section ref={containerRef} className="mobile-hide" style={{ height: '200vh', background: '#ffffff', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', display: 'flex', alignItems: 'center', padding: '0 var(--section-padding)', boxSizing: 'border-box', overflow: 'hidden' }}>
          <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: 'clamp(40px, 6vw, 100px)', alignItems: 'center' }}>
            
            {/* Left Side: Text Content with Clean Transitions */}
            <div style={{ minHeight: '360px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Minimal Progress Bars (No Clunky Numbers) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
                {stories.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to story ${i + 1}`}
                    style={{
                      height: '3px',
                      width: activeIndex === i ? '32px' : '14px',
                      background: activeIndex === i ? '#000000' : '#e0deda',
                      borderRadius: '2px',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'all 0.35s ease',
                    }}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(18px, 1.1vw, 20px)', fontWeight: 400, letterSpacing: '0.12em', color: '#777777', marginBottom: '14px', textTransform: 'uppercase' }}>
                    {activeStory.title}
                  </p>
                  <h2 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 300, fontFamily: 'var(--font-canela), serif', fontStyle: 'italic', color: '#000000', marginBottom: '20px', lineHeight: 1.15, letterSpacing: '-0.02em', textTransform: 'none', margin: '0 0 20px 0' }}>
                    {activeStory.headline}
                  </h2>
                  <p style={{ fontSize: 'clamp(18px, 1.15vw, 20px)', lineHeight: 1.75, color: '#444444', maxWidth: '540px', margin: 0, fontWeight: 350 }}>
                    {activeStory.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: Image Container with Smooth Crossfade */}
            <div style={{ position: 'relative', height: 'clamp(400px, 52vh, 540px)', width: '100%', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 16px 40px rgba(0,0,0,0.05)' }}>
              {stories.map((story, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: activeIndex === i ? 1 : 0,
                    scale: activeIndex === i ? 1 : 1.03,
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Mobile Clean Stacked Layout */}
      <div className="desktop-hide" style={{ background: '#ffffff', padding: '50px 20px 60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', maxWidth: '1400px', margin: '0 auto' }}>
          {stories.map((story, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-primary)', fontSize: 'clamp(18px, 1.1vw, 20px)', fontWeight: 400, letterSpacing: '0.12em', color: '#777777', marginBottom: '10px', textTransform: 'uppercase' }}>
                  {story.title}
                </p>
                <h2 style={{ fontSize: '1.85rem', fontWeight: 300, fontFamily: 'var(--font-canela), serif', fontStyle: 'italic', color: '#000000', marginBottom: '14px', lineHeight: 1.2, letterSpacing: '-0.02em', textTransform: 'none', margin: '0 0 14px 0' }}>
                  {story.headline}
                </h2>
                <p style={{ fontSize: '18px', lineHeight: 1.65, color: '#444444', margin: 0, fontWeight: 350 }}>
                  {story.description}
                </p>
              </div>
              <div style={{ position: 'relative', height: '260px', width: '100%', overflow: 'hidden', borderRadius: '4px' }}>
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
