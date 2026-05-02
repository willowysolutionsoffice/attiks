'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

const stories = [
  {
    title: 'Our story',
    headline: 'ONE LISTING, BIG DREAMS',
    description: 'Every great story begins somewhere. Ours began with a single property, a phone, and an unwavering commitment to doing things right. No shortcuts—just hard work, honest conversations, and walking clients through every detail like they were family.',
    image: '/story_discussion.png'
  },
  {
    title: 'Our story',
    headline: 'PEOPLE FIRST, ALWAYS',
    description: 'We never chased numbers—we built relationships. Clients came back, referred friends, and trusted us again and again. It wasn\'t about closing deals; it was about opening doors to something bigger: connection, trust, and lifestyle. Thats what give us Energy to do more.',
    image: '/story_handshake.png'
  },
  {
    title: 'Our story',
    headline: 'TRUSTED BY THE BEST',
    description: 'Today, we\'re known for delivering more than homes—we deliver experiences. Backed by a seasoned team and a sharp eye for detail, we help clients find spaces that reflect who they are and how they want to live. That\'s the kind of story.',
    image: '/team_photo.png'
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
    <section ref={containerRef} style={{ height: '300vh', background: '#000', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', display: 'flex', alignItems: 'center', padding: '0 var(--section-padding)', overflow: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '100px', alignItems: 'center' }}>
          
          {/* Left Side: Text */}
          <div style={{ height: '350px', position: 'relative' }}>
            {stories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeIndex === i ? 1 : 0,
                  y: activeIndex === i ? 0 : 20,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%',
                  pointerEvents: activeIndex === i ? 'auto' : 'none'
                }}
              >
                <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                  {story.title}
                </p>
                <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                  {story.headline}
                </h2>
                <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)', maxWidth: '500px' }}>
                  {story.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Image Container */}
          <div style={{ position: 'relative', height: '600px', width: '100%', overflow: 'hidden', borderRadius: '4px' }}>
             {stories.map((story, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: activeIndex === i ? 1 : 0,
                    scale: activeIndex === i ? 1 : 1.1,
                    filter: activeIndex === i ? 'blur(0px)' : 'blur(10px)'
                  }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                >
                  <Image 
                    src={story.image}
                    alt={story.headline}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)' }}></div>
                </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
