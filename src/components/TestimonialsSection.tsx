'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function TestimonialsSection() {
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ position: 'relative', height: '550px', borderRadius: '0', overflow: 'hidden' }}
          >
            <Image 
              src="/testimonial_dining_room.png"
              alt="Luxury Dining Room"
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>

          {/* Content Part */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}
          >
            {/* Stars */}
            <div style={{ display: 'flex', gap: '5px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="white" color="white" />
              ))}
            </div>

            {/* Quote */}
            <p style={{ fontSize: '1.25rem', lineHeight: '1.5', color: '#fff', fontWeight: 400, maxWidth: '450px' }}>
              From our first showing to closing, the service was impeccable. Every detail felt personalized, and the team truly understood what luxury means.
            </p>

            {/* Author */}
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600, marginBottom: '4px' }}>Olivia Bennett</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>Homebuyer</p>
            </div>

            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: '1px', position: 'absolute', bottom: '-100px', right: '0' }}>
               <button style={{ 
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
               <button style={{ 
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
