'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';

export default function ContactPage() {
  return (
    <main style={{ background: '#000', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Main Content */}
      <section style={{ padding: '160px var(--section-padding) 120px', flex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ marginBottom: '80px' }}>
            <PageHeader 
              label="Contact"
              title={<>LET&apos;S SHAPE YOUR<br />VISION TOGETHER</>}
            />
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', marginTop: '2rem', lineHeight: '1.7', fontWeight: 300 }}>
              Whether you are looking to acquire a masterpiece or list a legacy, our team is here to provide discreet, expert guidance at every step.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'stretch' }}>
            {/* Map Section */}
            <div style={{ width: '100%', background: '#111', position: 'relative', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
              <iframe 
                src="https://www.google.com/maps/d/embed?mid=1AGNpIWX6rbzzsTDXTef1uOw5ItpvBRRW&ehbc=2E312F" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }} onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="First Name" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Last Name" style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
                  </div>
                </div>
                <input type="email" placeholder="Email Address" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
                <input type="tel" placeholder="Phone Number" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.9rem', outline: 'none' }} />
                <textarea placeholder="Tell us about your project" rows={4} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', padding: '12px 0', color: '#fff', fontSize: '0.9rem', outline: 'none', resize: 'none' }}></textarea>
                
                <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '1rem', height: '55px' }}>
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Addresses Section */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '60px', 
            marginTop: '120px', 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            paddingTop: '80px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Calicut</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 300, lineHeight: '1.8' }}>
                #1/523, Krishna Building<br />
                NH 66, Azhinhilam PO<br />
                Calicut - 673632<br />
                <span style={{ color: '#fff', fontWeight: 500, display: 'block', marginTop: '10px' }}>+91 0483 2941308</span>
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bangalore</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 300, lineHeight: '1.8' }}>
                No.1DC-121, 1st D Cross<br />
                2nd Main, Kasturinagar<br />
                Bangalore – 560 043<br />
                <span style={{ color: '#fff', fontWeight: 500, display: 'block', marginTop: '10px' }}>+91 8589 011307</span>
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dubai</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 300, lineHeight: '1.8' }}>
                Aspect Tower 906<br />
                Business Bay, Dubai<br />
                UAE<br />
                <span style={{ color: '#fff', fontWeight: 500, display: 'block', marginTop: '10px' }}>hello@attiks.ae</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
