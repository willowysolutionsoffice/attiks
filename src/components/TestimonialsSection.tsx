'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    image: '/testimonial_dining_room.png',
    quote: 'From our first showing to closing, the service was impeccable. Every detail felt personalized, and the team truly understood what luxury means.',
    name: 'Olivia Bennett',
    role: 'Homebuyer'
  },
  {
    image: '/living_room.png',
    quote: 'The level of professionalism and the deep understanding of our unique needs set them apart from any other agency we have worked with.',
    name: 'James Carter',
    role: 'Investor'
  },
  {
    image: '/villa_showcase.png',
    quote: 'An absolutely seamless process. They didn\'t just find us a house, they found us the perfect sanctuary that matched our lifestyle flawlessly.',
    name: 'Sophia Patel',
    role: 'Homebuyer'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="section" style={{ height: '100vh', background: '#000', padding: '0 var(--section-padding)', display: 'flex', alignItems: 'center', scrollSnapAlign: 'start' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ marginBottom: '60px' }}
        >
          <h2 style={{ fontSize: '1rem', letterSpacing: '0.4em', fontWeight: 700, color: '#fff' }}>TESTIMONIALS</h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '120px', alignItems: 'center' }}>
          {/* Image Part */}
          <div style={{ position: 'relative', height: '550px', borderRadius: '0', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              >
                <Image 
                  src={current.image}
                  alt={current.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Content Part */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
            {/* Stars */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="white" color="white" />
              ))}
            </div>

            {/* Content changing with animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
              >
                {/* Quote */}
                <p style={{ fontSize: '1.25rem', lineHeight: '1.5', color: '#fff', fontWeight: 400, maxWidth: '450px' }}>
                  {current.quote}
                </p>

                {/* Author */}
                <div style={{ marginTop: '10px' }}>
                  <p style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>{current.name}</p>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: '1px', position: 'absolute', bottom: '-100px', right: '0' }}>
               <button 
                 onClick={prevTestimonial}
                 style={{ 
                 background: '#fff', 
                 border: 'none', 
                 width: '45px', 
                 height: '45px', 
                 cursor: 'pointer', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 transition: 'background 0.3s ease'
               }}
               onMouseEnter={(e) => (e.currentTarget.style.background = '#e0e0e0')}
               onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
               >
                  <ChevronLeft size={20} color="#000" strokeWidth={1.5} />
               </button>
               <button 
                 onClick={nextTestimonial}
                 style={{ 
                 background: '#fff', 
                 border: 'none', 
                 width: '45px', 
                 height: '45px', 
                 cursor: 'pointer', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 transition: 'background 0.3s ease',
                 marginLeft: '8px'
               }}
               onMouseEnter={(e) => (e.currentTarget.style.background = '#e0e0e0')}
               onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
               >
                  <ChevronRight size={20} color="#000" strokeWidth={1.5} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
